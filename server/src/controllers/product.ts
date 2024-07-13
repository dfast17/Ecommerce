import type { Request, Response } from "express";
import LogsStatement from "models/statement/logs";
import ProductStatement from "models/statement/product";
import Statement, { type ConditionType } from "models/statement/statement"
import type { LogsType, ProductType, RequestCustom, TypeDetail } from "types/types";
import { responseData, responseMessage, responseMessageData } from "utils/response";
import { convertData, convertMultiData, handleFindData, logData } from "utils/utils";
const products = new ProductStatement();
const statement = new Statement()
const logs = new LogsStatement()
export default class ProductController {
  public getAllType = async (req: Request, res: Response) => {
    try {
      const result = await products.findAllType();
      const sortData = result.map((r: any) => {
        return {
          ...r,
          detail: r.detail.sort((a: any, b: any) => a.displayorder - b.displayorder)
        }
      })
      responseData(res, 200, sortData);
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  }
  public getAll = async (req: Request, res: Response) => {
    handleFindData(res, products.findAll());
  };
  public getByType = async (req: Request, res: Response) => {
    const typeName = req.params["nameType"];
    const colType = await products.getColumnByType(typeName);
    const colDetail = colType.map((c: TypeDetail) => c.name);
    const shortKey = typeName.slice(0, 3);
    handleFindData(res, products.findByType(typeName, shortKey, colDetail));
  };
  public getDetail = async (req: Request, res: Response) => {
    const type = req.params["type"];
    const idProduct = req.params["idProduct"];
    const colType = await products.getColumnByType(type);
    const colDetail = colType.map((c: TypeDetail) => c.name);
    try {
      const result = <ProductType[]>await products.findDetail(Number(idProduct), type, colDetail);
      const parseResult = result.map((e: any) => {
        let subImg = e.img;
        let formatResult = {
          ...e,
          imgProduct: subImg.every((c: any) => Object.values(c).every((value) => value === null))
            ? [{ img: e.imgProduct, type: "default" }]
            : [{ img: e.imgProduct, type: "default" }, ...subImg],

        };
        delete formatResult.img;
        return formatResult;
      });
      responseData(res, 200, parseResult);
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public getNew = async (req: Request, res: Response) => {
    handleFindData(res, products.findByCondition("new"));
  };
  public getView = async (req: Request, res: Response) => {
    handleFindData(res, products.findByCondition("view"));
  };
  public search = async (req: Request, res: Response) => {
    const keyword = req.params["key"];
    handleFindData(res, products.findByKey(keyword));
  };
  public getAllSaleEvent = async (req: Request, res: Response) => {
    handleFindData(res, products.findAllSaleEvent());
  };
  public getSale = async (req: Request, res: Response) => {
    const currentDate = new Date().toISOString().split('T')[0]
    handleFindData(res, products.findSale(currentDate));
  }
  public getSaleDetail = async (req: Request, res: Response) => {
    const idSale = req.params["idSale"];
    handleFindData(res, products.findSaleDetail(Number(idSale)));
  };
  public insertProduct = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const data = req.body;
    const product = convertData(data.product)
    const detail = convertData(data.detail)
    const logsData = logData(req.idUser, 'Add new product')
    try {
      const insertProduct = await statement.insertData('products', product);
      const convertDetail = [...detail, { nameCol: 'idProduct', value: Number(insertProduct.insertId) }]
      const insertDetail = await statement.insertData(data.tableName, convertDetail)
      const resultLog = await logs.create(logsData)
      insertProduct && insertDetail ?
        responseMessageData(res, 201, 'Add new product is success', { id: Number(insertProduct.insertId) })
        : responseMessage(res, 500, "Server errors");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public updateProduct = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const data = req.body;
    const detail = convertData(data.data_update)
    const conditionValue = data.condition
    const condition: ConditionType = {
      conditionName: conditionValue.name,
      conditionMethod: "=",
      value: conditionValue.value
    }
    const logsData = logData(req.idUser, 'Update product')
    try {
      const updateDetail = await statement.updateDataByCondition(data.tableName, detail, condition);
      const resultLog = await logs.create(logsData)
      updateDetail
        ? responseMessage(res, 200, 'Update product is success')
        : responseMessage(res, 500, "Server errors");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public insertSaleEvent = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const data = req.body;
    const sale = convertData([data.sale]);

    const logsData = logData(req.idUser, 'Add new sale event')
    try {
      const insertSale = await statement.insertData('sale', sale)
      const dataDetail = data.detail.map((e: any) => {
        return { ...e, idSale: Number(insertSale.insertId) }
      })
      const saleDetail = convertMultiData(dataDetail)
      const insertDetail = await statement.insertDataMulti('saleDetail', saleDetail)
      console.log("success 2")
      const resultLog = await logs.create(logsData)
      insertSale && insertDetail ?
        responseMessageData(res, 201, 'Add new sale event is success', { id: Number(insertSale.insertId) })
        : responseMessage(res, 500, "Server errors");
    }
    catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  }
  /* {
    idSale ?: number,
    idDetail?: number,
    sale?: [{data}],
    detail?: [{data}]
  } */
  public updateSaleEvent = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const data = req.body;
    const idSale = data.idSale;
    const sale = data.sale && convertData(data.sale)
    const saleDetail = data.detail && convertData(data.detail)

    const condition: ConditionType = {
      conditionName: "idSale",
      conditionMethod: "=",
      value: idSale
    }
    const conditionDetail: ConditionType = {
      conditionName: "id",
      conditionMethod: "=",
      value: data.idDetail
    }

    const logsData = logData(req.idUser, 'Update sale event')
    try {
      const resultLog = await logs.create(logsData)
      const updateSale = data.sale && await statement.updateDataByCondition('sale', sale, condition);
      const updateDetail = data.detail && await statement.updateDataByCondition('saleDetail', saleDetail, conditionDetail);

      (updateSale || updateDetail) ?
        responseMessage(res, 200, 'Update product is success')
        : responseMessage(res, 500, "Server errors");
    }
    catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  }
  public deleteSaleEvent = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const data = req.body;
    const idSale = data.idSale;
    const condition: ConditionType = {
      conditionName: "idSale",
      conditionMethod: "=",
      value: idSale
    }
    const logsData = logData(req.idUser, 'Delete sale event')
    try {
      const resultLog = await logs.create(logsData)
      const deleteDetail = await statement.removeData('saleDetail', condition);
      const deleteSale = await statement.removeData('sale', condition);
      (deleteSale || deleteDetail) ?
        responseMessage(res, 200, 'Delete sale event is success')
        : responseMessage(res, 500, "Server errors");
    }
    catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  }
  public deleteItemSaleEvent = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const data = req.body;
    const idDetail = data.idDetail;
    const condition: ConditionType = {
      conditionName: "id",
      conditionMethod: "=",
      value: idDetail
    }
    const logsData = logData(req.idUser, 'Delete item sale event')
    try {
      const resultLog = await logs.create(logsData)
      const deleteDetail = await statement.removeData('saleDetail', condition);
      (deleteDetail) ?
        responseMessage(res, 200, 'Delete sale event is success')
        : responseMessage(res, 500, "Server errors");
    }
    catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  }
  public getColByType = async (req: Request, res: Response) => {
    const type = req.params['nameType']
    handleFindData(res, products.getColumnByType(type))
  }

}
