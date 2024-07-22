import { useContext, useEffect } from "react"
import { StateContext } from "../../context/state"
import { Code } from "@nextui-org/react"
import FluentEmojiLaptop from "../../components/icon/laptop"
import { MarketeqUser7, SolarUserPlusOutline } from "../../components/icon/user"
import Product_layout from "./product_layout"
import { formatDate } from "../../utils/utils"
import Comment_component from "../../components/home/comment"
import { LogsType } from "../../types/types"

const UI = ({ title, value, width, Icon }: { title: string, value: string, width?: string, Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element }) => {
  const { isDark } = useContext(StateContext)
  return <div className={`w-full md:w-[49%] ${width ? `xl:${width}` : "xl:w-[20%]"} h-[150px] 
   ${isDark ? "" : "shadow-md"} text-white rounded-md flex flex-wrap contents-start justify-evenly my-1 p-2`}
    style={{
      backgroundImage: `url(https://i.pinimg.com/736x/b3/85/78/b38578854caa86d9af41a092e13a93c1.jpg)`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}
  >
    <div className="w-2/4 flex flex-col justify-around items-center">
      <h1 className="text-[30px] font-bold font-mono">{value}</h1>

      <h2 className="text-[25px] text-zinc-500 font-bold font-mono">{title}</h2>
    </div>
    <div className="w-2/4 h-full flex justify-center items-center">
      <Icon />
    </div>
  </div>
}

const Statistical = () => {
  const { log, role, isDark, statistical } = useContext(StateContext)
  return <div className="dashboard-statistical w-full h-auto min-h-[100px] flex flex-wrap justify-around items-center pt-2 px-2 mb-2">
    <div className={`w-full md:w-[49%] xl:w-[35%] h-[150px] ${isDark ? "" : "shadow-md"} text-white rounded-md flex items-center my-1 p-2`}
      style={{
        backgroundImage: `url(https://i.pinimg.com/736x/b3/85/78/b38578854caa86d9af41a092e13a93c1.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {statistical.product && <>
        <div className="img w-[30%] h-full flex items-center justify-center">
          <img src={statistical.product[0].sold[0].imgProduct} className="w-full h-4/5 object-contain" />
        </div>
        <div className="info w-[70%] h-full flex flex-wrap items-center justify-evenly cursor-pointer">
          <h1 className="w-full text-[30px] text-center font-bold font-mono">Feature Product</h1>
          <h1 className="w-full text-[25px] font-bold font-mono">{statistical.product[0].sold[0].nameProduct}</h1>
          <Code size="md" radius="sm" className="w-[100px] flex items-center justify-center bg-zinc-700 text-zinc-50">${statistical.product[0].sold[0].price}</Code>
          <Code size="md" radius="sm" className="w-[100px] flex items-center justify-center bg-zinc-700 text-zinc-50">Sold: {statistical.product[0].sold[0].total_count}</Code>
        </div>
      </>}
    </div>
    {statistical.product && <UI title="Product" value={statistical.product[0].total} Icon={FluentEmojiLaptop} />}
    {statistical.user && <>
      <UI title="Total User" value={statistical.user[0].total_user} Icon={MarketeqUser7} />
      <UI title="New User" value={statistical.user[0].current_month.count} Icon={SolarUserPlusOutline} />
    </>}

    {statistical.product && <>
      <Product_layout data={statistical.product[0].sold} type_layout="sold" background="https://i.pinimg.com/564x/a4/3c/32/a43c3282bd4efa67469b163ae1827fa0.jpg" />
      <Product_layout data={statistical.product[0].view} type_layout="view" background="https://i.pinimg.com/236x/b4/80/00/b48000f645bec9d31f3ef4b98a10388c.jpg" />
    </>}
    <Comment_component data={statistical.commentPost} type="Post" />
    <Comment_component data={statistical.commentProduct} type="Product" />

    <div className={`w-[98%] ${role === 0 ? "xl:w-3/5" : "xl:w-[32%]"} h-auto min-h-[400px] bg-zinc-900 rounded-md flex flex-wrap items-center my-1 p-2`}
      style={{
        backgroundImage: `url(https://i.pinimg.com/736x/b3/85/78/b38578854caa86d9af41a092e13a93c1.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h1 className="w-full text-[30px] text-center font-bold font-mono">New Order</h1>
      <div className="w-full h-[300px] flex flex-wrap justify-center  items-center">
        <div className="w-full h-[50px] flex items-center justify-center text-[20px] font-bold font-mono">
          <div className="w-2/5">Id Order</div>
          <div className="w-[15%]">Created at</div>
          {role === 0 && <div className="w-[15%]">Payment method</div>}
          <div className="w-[15%]">Payment status</div>
          <div className="w-[15%]">Order status</div>
        </div>
        {statistical.order && statistical.order.map((item: any) =>
          <div className="w-full h-[50px] flex items-center justify-center text-[20px] font-bold font-mono" key={`Order-${item.idOrder}`}>
            <div className="w-2/5">#{item.idOrder}</div>
            <div className="w-[15%]">{item.created_at}</div>
            {role === 0 && <div className="w-[15%]">{item.method}</div>}
            <div className="w-[15%]">{item.paymentStatus}</div>
            <div className="w-[15%]">{item.orderStatus}</div>
          </div>
        )}
      </div>
    </div>
    {role === 0 && <div className="w-[98%] xl:w-[39%] h-auto min-h-[400px] bg-zinc-900 rounded-md flex flex-wrap items-center my-1 p-2">
      <h1 className="w-full text-center text-[30px] font-bold font-mono">Log Manager</h1>
      <div className="w-full h-[300px] flex flex-wrap justify-start content-around overflow-y-scroll px-3">
        {log && log.map((l: LogsType) =>
          <div className="w-full flex flex-wrap justify-center" key={l._id}>
            <div className="w-3/5 h-[50px] flex items-center justify-start text-[20px] font-bold font-mono truncate">{l.idUser}:{l.content}</div>
            <div className="w-2/5 h-[50px] flex items-center justify-end text-[20px] font-bold font-mono">{l.timestamp}</div>
          </div>
        )}
      </div>
    </div>}

  </div>
}

export default Statistical