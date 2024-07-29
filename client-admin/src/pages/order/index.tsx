import { useContext, useState } from "react"
import { StateContext } from "../../context/state"
import { Button, Modal, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, useDisclosure } from "@nextui-org/react"
import { OrderType, ShipperType, StatusValueType } from "../../types/types"
//Import Icon
import { FcViewDetails } from "react-icons/fc";
import { RxDragHandleDots2 } from "react-icons/rx";
import { FaUser, FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineDuplicate } from "react-icons/hi";
//
import { GetToken } from "../../utils/token";
import { getOrderById, updateStatusOrder } from "../../api/order";
import { ShipperNextValue, statusNextValue } from "../../utils/utils";
import ModalOrder from "./order.modal";
interface OrderStatusType {
  value: string,
  label: string
}

const Order = () => {
  const { shipper, position, order, setOrder, isDark } = useContext(StateContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setId] = useState<string>("")
  const [detail, setDetail] = useState<any[] | null>(null)
  const [info, setInfo] = useState<any>([])
  const [currentStatus, setCurrentStatus] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [nextStatus, setNextStatus] = useState<string | null>(null)
  const [idShip, setIdShip] = useState<string>("")
  const [note, setNote] = useState<string>("")
  const [btnSubmit, setBtnSubmit] = useState<boolean>(false)

  const orderStatus: OrderStatusType[] = [
    {
      value: "pending",
      label: "Pending"
    },
    {
      value: "prepare",
      label: "Prepare"
    },
    {
      value: "shipping",
      label: "Shipping"
    },
    {
      value: "delivery",
      label: "Delivery"
    },
    {
      value: "success",
      label: "Success"
    },
    {
      value: "failed",
      label: "Failed"
    }
  ]
  const handleDetail = async (id: string) => {
    setIsEdit(false)
    setBtnSubmit(false)
    setId(id)
    const status = order.filter((ord: OrderType) => ord.idOrder === id)[0].orderStatus
    setCurrentStatus(orderStatus.filter((ord: OrderStatusType) => ord.value === status)[0].value)
    setInfo(order.filter((ord: OrderType) => ord.idOrder === id).map((ord: OrderType) => ({
      fullName: ord.fullName,
      phone: ord.phone,
      address: ord.address,
    })))
    const token = await GetToken()
    token && getOrderById(token, id)
      .then(res => {
        res.status === 200 ? setDetail(res.data) : null
      })
      .catch(err => console.log(err))

  }
  const handleChangeStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    const dataFilter = position === 'shipper' ? ShipperNextValue : statusNextValue
    const dataChange = dataFilter.filter((f: StatusValueType) => f.next === nextValue).map((s: StatusValueType) => s.current === currentStatus)[0]
    setNextStatus(nextValue)
    setBtnSubmit(dataChange)
  }
  const handleUpdateStatus = async () => {
    let isFetch = false
    nextStatus === "shipping" && !idShip && (alert("Select shipper"), isFetch = false)
    nextStatus === "failed" && !note && (alert("Enter note"), isFetch = false)
    const token = await GetToken()
    let dataUpdate: { orderStatus: string, [x: string]: string } = {
      orderStatus: nextStatus!
    }
    if (nextStatus === "shipping") {
      dataUpdate.idShipper = idShip;
      isFetch = true
    }
    if (nextStatus === "failed") {
      dataUpdate.note = note
      isFetch = true
    }
    isFetch && token && nextStatus && id && updateStatusOrder(token, { id: id, data_update: [dataUpdate] })
      .then(res => {
        alert(res.message)
        if (res.status === 200) {
          setBtnSubmit(false)
          setCurrentStatus(nextStatus)
          setNextStatus(null)
          setIdShip("")
          setOrder(order.map((ord: OrderType) => ord.idOrder === id ? { ...ord, ...dataUpdate } : ord))
        }
      })
      .catch(err => console.log(err))
  }

  return <div className={`w-full h-auto min-h-[95.6vh] grid grid-cols-3 gap-1 ${isDark ? "bg-[#3d3d3d] text-white" : "bg-[#F5F5F5] text-zinc-950"} p-2`}>
    <div className="order-data h-full col-span-2">
      <div className="w-full h-[80px] col-span-3 row-span-1 flex items-center justify-start">
        {position !== "shipper" && <Button onClick={onOpen} color="primary" radius="sm" size="sm">Create Order</Button>}
      </div>
      <Table classNames={{ th: ["bg-zinc-950 text-white text-[16px]"], wrapper: "bg-transparent !shadow-none", tr: ["!my-2"], td: ["!h-[60px]"] }}
        aria-label="Table Order Manager">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DATE CREATED</TableColumn>
          <TableColumn>PAYMENT</TableColumn>
          <TableColumn>PAYMENT-STATUS</TableColumn>
          <TableColumn>ORDER-STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {order && order.map((o: OrderType) =>
            <TableRow key={`order-${o.idOrder}`}>
              <TableCell>#{o.idOrder}</TableCell>
              <TableCell>{o.fullName}</TableCell>
              <TableCell>{o.created_at!.split("T")[0].split("-").reverse().join("/")}</TableCell>
              <TableCell>{o.method}</TableCell>
              <TableCell>{o.paymentStatus}</TableCell>
              <TableCell>{o.orderStatus}</TableCell>
              <TableCell className="flex justify-around">
                <Button isIconOnly size="sm" className="bg-transparent" onClick={() => handleDetail(o.idOrder)}><FcViewDetails className="w-5 h-5" /></Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
    <div className={`order-detail-data h-full col-span-1 pt-14 flex flex-wrap justify-center content-start ${detail ? "scale-100" : "scale-0"} transition-all`}>
      <div className="detail-top-bar w-4/5 h-[40px] flex justify-between bg-zinc-950 rounded-t-md">
        <div className="w-4/5 h-full flex items-center text-white">
          <RxDragHandleDots2 className="w-5 h-5 mr-2" />
          Order #{id}
        </div>
        <div onClick={() => { setDetail(null); setBtnSubmit(false) }} className="w-[30px] h-full flex items-center justify-center text-white cursor-pointer">
          <IoMdClose className="w-5 h-5" />
        </div>
      </div>
      <div className="detail-body w-4/5 h-auto min-h-[400px] bg-white">
        <div className="order-info w-full h-auto flex flex-col justify-start">
          {info && info.map((i: any) => <div className="w-full h-auto flex flex-wrap justify-center content-start p-1">
            <div className="w-[99%] h-auto my-1">
              <div className="w-full h-full flex items-center justify-start text-zinc-950 text-[15px] font-bold">
                <FaUser className="w-5 h-5 text-zinc-700 mr-2" /> {i.fullName}
              </div>
            </div>
            <div className="w-[99%] h-auto my-1">
              <div className="w-full h-full flex items-center justify-start text-zinc-950 text-[15px] font-bold">
                <FaPhoneAlt className="w-5 h-5 text-zinc-700 mr-2" /> {i.phone}
              </div>
            </div>
            <div className="w-[99%] h-auto my-1">

              <div className="w-full h-full flex items-center justify-start text-zinc-950 text-[15px] font-bold">
                <FaLocationDot className="w-5 h-5 text-zinc-700 mr-2" /> {i.address}
              </div>
            </div>
          </div>)}
          <div className="items w-full h-auto flex flex-col mt-2 px-2">
            <div className="w-full text-zinc-950 font-bold ">Order Items</div>
            <div className="w-full h-auto min-h-[230px] flex flex-col border-b border-t border-solid border-zinc-300">
              {detail && detail.map((d: any) => <div className="relative w-full h-auto flex flex-wrap justify-center content-start p-1">
                {d.discount !== 0 && <div className="absolute w-[60px] h-[20px] top-1 right-1 text-white bg-red-600 rounded-sm flex justify-center items-center">-{d.discount}%</div>}
                <div className="images w-[60px] h-[60px] flex items-center justify-center">
                  <img src={d.imgProduct} className="w-full h-full object-contain" />
                </div>
                <div className="content w-[80%] h-auto min-h-[50px] text-zinc-900">
                  <div className="product-name w-full h-auto">
                    {d.nameProduct}
                  </div>
                  <div className="price w-full h-auto">
                    {d.countProduct} x $ {d.discount !== 0 && <span className="line-through text-red-500">{d.price}</span>} {d.price - (d.price * d.discount / 100)}
                  </div>
                </div>
              </div>)}
            </div>
            <div className="w-full h-auto flex flex-wrap justify-between items-center p-1 text-zinc-950">
              <span>Total</span>
              <span>${detail && detail.map((d: any) => (d.price - (d.price * d.discount / 100)) * d.countProduct).reduce((a: any, b: any) => a + b, 0)}</span>
            </div>
            <div className="w-full h-auto flex flex-wrap justify-between items-center p-1 text-zinc-950">
              <span>Shipping status</span>
              <span className="flex items-center">
                {currentStatus} <FaRegEdit onClick={() => setIsEdit(!isEdit)} className="ml-2 cursor-pointer text-green-500" />
              </span>
            </div>
          </div>
          {isEdit && <div className="w-full h-[auto min-h-[50px] flex flex-wrap items-center justify-between px-2">
            {currentStatus && <Select
              onChange={(e: any) => { handleChangeStatus(e) }}
              classNames={{ mainWrapper: 'h-[30px]', trigger: '!h-[30px] !min-h-[30px]', popoverContent: isDark ? 'text-white' : 'text-black' }}
              className="w-1/4 "
              defaultSelectedKeys={[currentStatus]}
              size="sm" radius="sm">
              {orderStatus.map((o: OrderStatusType) =>
                <SelectItem className={`${isDark ? "text-white" : "text-black"}}`} key={o.value}>{o.label}</SelectItem>
              )}
            </Select>}
            {nextStatus === "shipping" && <Select
              onChange={(e: any) => { setIdShip(e.target.value) }}
              className="w-2/5 mx-1"
              size="sm" radius="sm"
              classNames={{ mainWrapper: 'h-[30px]', trigger: '!h-[30px] !min-h-[30px]', popoverContent: isDark ? 'text-white' : 'text-black' }}>
              {shipper && shipper.map((s: ShipperType) => <SelectItem key={s.idStaff}>{s.name}</SelectItem>)}
            </Select>}
            <div className="w-[35%] h-[50px] flex items-center justify-end">
              {btnSubmit && <Button onClick={handleUpdateStatus} size="sm" color="success" className="w-3/5 h-[30px] text-[15px] text-white mx-1">Update</Button>}
              {!btnSubmit && <Button size="sm" color="success" className="w-3/5 h-[30px] bg-transparent mx-1"></Button>}
              <Button isIconOnly size="sm" color="danger" className="" onClick={() => { setIsEdit(false); setBtnSubmit(false); }}>
                <IoMdClose className="w-3/5 h-3/5" />
              </Button>
            </div>
            {nextStatus === "failed" && <Textarea
              label="Note"
              radius="sm"
              onChange={(e: any) => { setNote(e.target.value) }}
              placeholder="Enter your note"
              className="w-full h-[60px] mb-4"
            />}
          </div>}
        </div>
      </div>
      <div className="detail-bottom-bar w-4/5 h-[40px] flex items-center justify-between bg-zinc-950 text-white rounded-b-md p-1">
        <div className="w-[30%] h-full flex justify-center items-center border-r border-solid border-zinc-300 cursor-pointer">
          <CiExport className="mr-1" />
          <span>Export</span>
        </div>
        <div className="w-[30%] h-full flex justify-center items-center border-r border-solid border-zinc-300 cursor-pointer">
          <IoPrintOutline className="mr-1" />
          <span>Print</span>
        </div>
        <div className="w-[30%] h-full flex justify-center items-center border-r border-solid border-zinc-300 cursor-pointer">
          <HiOutlineDuplicate className="mr-1" />
          <span>Duplicate</span>
        </div>
        <div className="w-[10%] h-full flex justify-center items-center cursor-pointer">
          <BsThreeDots />
        </div>
      </div>
    </div>
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalOrder />
    </Modal>
  </div >
}

export default Order