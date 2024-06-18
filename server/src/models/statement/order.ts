import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";
import { db } from "models/connect";

export default class OrderStatement {
  public getAllOrder = async () => {};
  public getOrderByUser = async (idUser: string) => {
    return await db
      .selectFrom("ord as t")
      .select([
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
        "orderStatus"
      ])
      .where("idUser", "=", `${idUser}`)
      .execute();
  };
  public getPurchaseOrderByUser = async(idUser:string) => {
    return await db
    .selectFrom("order_Detail as od")
    .select(["od.idOrder","od.idProduct","od.countProduct","p.price","od.discount"])
    .leftJoin("order","od.idOrder","order.idOrder")
    .leftJoin("products as p","od.idProduct","p.idProduct")
    .where("order.idUser","=",idUser)
    .where("order.orderStatus","=","success")
    .execute()
  }
  public getTransportDetail = async (idOrder:string) => {
    return await db
    .selectFrom("order_Detail")
    .selectAll()
    .where("idOrder","=",idOrder)
    .execute()
  };
}
