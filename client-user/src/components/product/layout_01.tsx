import { Card, CardBody } from "@nextui-org/react"
import { useContext } from "react"
import { Fade } from "react-awesome-reveal"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ProductType } from "types/type";
import { CartContext } from "../../context/cartContext";
import { percentDiscount } from "../../utils/utils";
const Product_Layout_01 = ({ data }: { data: ProductType }) => {
    const { addItemCart } = useContext(CartContext)
    const navigate = useNavigate()
    const navigateDetail = () => {
        navigate(`/product/detail/${data.nameType}/${data.idProduct}/${data.nameProduct.split(" ").join("-")}`)
    }
    return <Fade triggerOnce fraction={0.6} className="h-auto max-h-[244px] my-1 mx-4 overflow-hidden shadow-lg" delay={1}>
        <Card className="w-full h-full rounded-md border border-solid border-transparent hover:border-cyan-500 transition-all"
        >
            <CardBody className="relative w-full h-auto flex flex-col items-center justify-center cursor-pointer">
                {data.discount !== 0 && <div className="absolute w-[50px] h-[25px] flex items-center justify-center text-white rounded-md bg-red-500 top-1 left-1">
                    -{data?.discount}%
                </div>}
                <div onClick={() => addItemCart(data)} className="absolute w-[50px] h-[25px] flex items-center justify-center text-white rounded-md bg-cyan-500 top-1 right-1">
                    <AiOutlineShoppingCart className="text-[20px]" />
                </div>
                <div className="w-3/5 h-[150px] flex items-center justify-center" onClick={navigateDetail}>
                    <img className="w-full h-auto object-contain"
                        loading="eager"
                        src={`${data.imgProduct}`} alt={`images-${data?.nameProduct}`} />
                </div>
                <div className="product-info flex flex-wrap justify-center overflow-hidden py-1 rounded-lg w-[calc(100%_-_8px)]">
                    <div
                        onClick={navigateDetail}
                        className="w-[90%] h-[25px] flex items-center justify-start text-zinc-950 font-bold text-[18px] truncate cursor-pointer"
                    >
                        <span className="truncate">{data?.nameProduct}</span>
                    </div>
                    <div className="w-[90%] h-[25px] flex items-center justify-start text-zinc-950 font-bold text-[18px] truncate">
                        $ {data.discount !== 0
                            ? <><span className="text-red-600 font-semibold line-through">{data.price}</span> {percentDiscount(data.discount!, Number(data.price))}</>
                            : data.price}
                    </div>

                </div>
            </CardBody>
        </Card>
    </Fade>
}

export default Product_Layout_01