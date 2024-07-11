import { useContext, useEffect } from "react"
import { StateContext } from "../../context/state"
import { Code } from "@nextui-org/react"
import FluentEmojiLaptop from "../../components/icon/laptop"
import { MarketeqUser7, SolarUserPlusOutline } from "../../components/icon/user"
import Product_layout from "./product_layout"

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
  const { isDark, statistical } = useContext(StateContext)
  useEffect(() => {
    //xem dữ liệu trả về tại dev tool trên web
    statistical && console.log(statistical)
  }, [statistical])
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

    {/* Làm các phần dưới đây */}
    {statistical.product && <>
      <Product_layout data={statistical.product[0].sold} type_layout="sold" background="https://i.pinimg.com/564x/a4/3c/32/a43c3282bd4efa67469b163ae1827fa0.jpg" />
      <Product_layout data={statistical.product[0].view} type_layout="view" background="https://i.pinimg.com/236x/b4/80/00/b48000f645bec9d31f3ef4b98a10388c.jpg" />
    </>}
    {/*Phần này của Nhâm Ngọ, làm ui theo dạng chart cột  keyword cho phần này : bar chart in react  */}
    <div className="w-[98%] xl:w-[49.5%] h-auto min-h-[400px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      <h1 className="text-[30px] font-bold font-mono">Chart Revenue</h1>
    </div>
    {/* cái này chưa cần làm */}
    <div className="w-[98%] xl:w-[49.5%] h-auto min-h-[400px] bg-zinc-900 rounded-md flex items-center my-1 p-2">
      <h1 className="text-[30px] font-bold font-mono">Chart Order success and order fail</h1>
    </div>

  </div>
}

export default Statistical