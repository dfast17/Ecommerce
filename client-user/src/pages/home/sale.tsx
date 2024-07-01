import { StateContext } from "../../context/stateContext"
import { useContext } from "react"
import Home_layout_01 from "../../components/home/home_layout_01"
import { formatDate } from "../../utils/utils"

const SaleEvent = () => {
    const { sale } = useContext(StateContext)
    return sale && sale.length !==0 && <Home_layout_01 data={sale[0].detail.slice(0,10)} k="h-sale" title="Sale Event" subTitle={`${formatDate(sale[0].start_date)} - ${formatDate(sale[0].end_date)}`} link={"/sale"}/>
}

export default SaleEvent