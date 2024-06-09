import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";
import { db } from "models/connect";

export default class OrderStatement {
  public getAllOrder = async () => {};
  public getOrderByUser = async (idUser: string) => {
    return await db
      .selectFrom("ord as t")
      .select<any>((eb: any) => [
        "t.idOrder",
        "idShipper",
        "idUser",
        "fullName",
        "phone",
        "address",
        "method",
        "costs",
        "edd",
        "paymentStatus",
        "orderStatus",
        jsonArrayFrom(
          eb
            .selectFrom("ordDetail as td")
            .select((c:any) => [
                "idOrdDetail", "td.idProduct", "countProduct", "discount",
                "p.nameProduct","p.price","p.imgProduct"
            ])
            .innerJoin("products as p","p.idProduct","td.idProduct")
            .whereRef("td.idOrder", "=", "t.idOrder")
        ).as("detail")
      ])
      .where("idUser", "=", `${idUser}`)
      .execute();
  };
  public getPurchaseOrderByUser = async(idUser:string) => {

    return await db.selectFrom("ordsDetail as osd")
    .select(["osd.id","osd.idOrder","osd.idProduct","p.nameProduct","p.imgProduct","p.price","osd.countProduct","osd.discount"])
    .innerJoin("ords","ords.idBill","osd.idOrder")
    .leftJoin("products as p","p.idProduct","osd.idProduct")
    .where("ords.idUser","=",idUser)
    .execute()
  }
  public getTransportDetail = async (idOrder:string) => {

  };
}
