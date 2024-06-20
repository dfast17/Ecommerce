import { db } from "models/connect";

export default class OrderStatement {
  public getAllOrder = async () => {};
  public getOrderByUser = async (idUser: string) => {
    return await db
      .selectFrom("order_Detail as od")
      .select(["od.idOrdDetail","od.idOrder","od.idProduct","p.nameProduct","p.imgProduct","od.countProduct","p.price","od.discount","order.orderStatus","order.paymentStatus"])
      .leftJoin("order","od.idOrder","order.idOrder")
      .leftJoin("products as p","od.idProduct","p.idProduct")
      .where("order.idUser","=",idUser)
      .where("order.orderStatus","!=","success")
      .where("order.orderStatus","!=","fail")
      .execute()
  };
  public getPurchaseOrderByUser = async(idUser:string) => {
    return await db
    .selectFrom("order_Detail as od")
    .select(["od.idOrder","od.idProduct","p.nameProduct","p.imgProduct","od.countProduct","p.price","od.discount"])
    .leftJoin("order","od.idOrder","order.idOrder")
    .leftJoin("products as p","od.idProduct","p.idProduct")
    .where("order.idUser","=",idUser)
    .where("order.orderStatus","=","success")
    .execute()
  }
  public getTransportDetail = async (idOrder:string) => {
    return await db
    .selectFrom("order_Detail as od")
    .select(["od.idOrder","od.idProduct","p.nameProduct","p.imgProduct","od.countProduct","p.price","od.discount"])
    .leftJoin("products as p","od.idProduct","p.idProduct")
    .where("idOrder","=",idOrder)
    .execute()
  };
}
