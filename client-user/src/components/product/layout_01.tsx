import { Card, Button, CardBody } from "@nextui-org/react"
import { StateContext } from "../../context/stateContext"
import { useContext } from "react"
import { Fade } from "react-awesome-reveal"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ProductType } from "types/type";
import { CartContext } from "../../context/cartContext";
import { percentDiscount } from "../../utils/utils";
const Product_Layout_01 = ({ data,name }: { data: ProductType,name:string }) => {
    /* const { type } = useContext(StateContext) */
    const { addItemCart } = useContext(CartContext)
    const navigate = useNavigate()
    const navigateDetail = () => {
        navigate(`/product/detail/${data.nameType}/${data.idProduct}/${data.nameProduct.split(" ").join("-")}`)
    }
    return <Fade triggerOnce fraction={0.6} className="w-[15%] h-auto min-w-[200px] my-1 mx-4 overflow-hidden "  delay={1}>
        <Card className="w-full h-auto min-h-[150px] rounded-md border border-solid border-transparent hover:border-cyan-500 transition-all"
            style={{
                backgroundImage: 'url(https://i.pinimg.com/564x/9b/a1/31/9ba131f9534f5023bf00fc2b2851a2ce.jpg)',
                backgroundRepeat:'no-repeat',
                backgroundSize:'105% 105%',
                backgroundPosition:'center',
            }}
        >
            <CardBody className="relative w-full h-auto flex flex-col items-center justify-center cursor-pointer">
                {/* <div className="absolute top-0 right-1 w-auto min-w-[80px] text-center font-bold my-1 z-10 bg-zinc-700 rounded-md text-white px-1">
                    $ {data.discount !== 0 
                    ? <><span className="text-red-600 font-semibold line-through">{data.price}</span> {percentDiscount(data.discount!,Number(data.price))}</>
                    : data.price}
                </div> */}
                {data.discount !== 0 && <div className="absolute w-[50px] h-[25px] flex items-center justify-center text-white rounded-md bg-red-500 top-1 left-1">
                    -{data?.discount}%
                </div>}
                <div className="absolute w-[50px] h-[25px] flex items-center justify-center text-white rounded-md bg-cyan-500 top-1 right-1">
                    <AiOutlineShoppingCart className="text-[20px]"/>
                </div>
                <div className="w-3/5 h-[150px] flex items-center justify-center" onClick={navigateDetail}>
                    <img className="w-full h-auto object-contain" 
                    loading="eager" 
                    src={`${data.imgProduct}`} alt={`images-${data?.nameProduct}`}/>
                </div>
                <div className="product-info flex flex-wrap justify-center overflow-hidden py-1 rounded-lg w-[calc(100%_-_8px)]">
                    <div
                    onClick={navigateDetail}
                    className="w-[90%] h-[25px] flex items-center justify-start text-white font-bold text-[18px] truncate cursor-pointer"
                    >
                        <span className="truncate">{data?.nameProduct}</span>
                    </div>
                    {/* <div className="product-type w-[90%] flex flex-wrap justify-center lg:justify-between items-center my-1">
                        <Button size="sm" className="w-[90%] sm:w-4/5 lg:w-[49%] xl:w-[45%] bg-[#2963F9] text-[20px] my-1 lg:my-0 text-white truncate">{data?.brand.toUpperCase()}</Button>
                        <Button size="sm" className="w-[90%] sm:w-4/5 lg:w-[49%] xl:w-[45%] bg-[#2963F9] text-[20px] my-1 lg:my-0 text-white truncate">{data?.nameType.toUpperCase()}</Button>
                    </div> */}
                    <div className="w-[90%] h-[25px] flex items-center justify-start text-white font-bold text-[18px] truncate">
                    $ {data.discount !== 0 
                    ? <><span className="text-red-600 font-semibold line-through">{data.price}</span> {percentDiscount(data.discount!,Number(data.price))}</>
                    : data.price}
                    </div>
                    {/* <div className="product-btn w-[90%] flex flex-wrap justify-around">
                        <Button size="sm" className="w-full xl:w-3/4 font-semibold rounded-md bg-[#0a2461] text-zinc-50" onClick={() => addItemCart(data)}>
                            <AiOutlineShoppingCart className="text-[15px]"/>Add to cart
                        </Button>
                    </div> */}
                    
                </div>
            </CardBody>
        </Card>
    </Fade>
}

export default Product_Layout_01