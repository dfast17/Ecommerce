import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import { productStore } from "../../store/product"
import { useEffect, useState } from "react"
import { ProductType } from "../../types/types"
import { FcCheckmark } from "react-icons/fc";
interface ProductOrderType {
    idProduct: number,
    nameProduct: string,
    imgProduct: string,
    count: number,
    discount: number,
    price: number
}
const ModalOrder = () => {
    const { product } = productStore()
    const [delivery, setDelivery] = useState<string>("")
    const [productList, setProductList] = useState<any>([])
    const handleSlectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /* const checkId = productList.filter((p: number) => p === Number(e.target.value)) */

        setProductList(Array.from(e.target.value.split(",")));
    };
    useEffect(() => {
        console.log(productList)
    }, [productList])
    return <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Store create new order</ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-2">
                    <Input label="Full name" />
                    <Input label="Phone" />

                    <Select
                        label="Delivery method"
                        color="primary"
                        onChange={e => setDelivery(e.target.value)}
                        size="lg"
                        className="w-[100%]"
                    >
                        <SelectItem key="store">Pick up in store</SelectItem>
                        <SelectItem key="home">Home delivery</SelectItem>
                    </Select>

                    {delivery === "home" && <Input label="Address" />}
                    {product && <Select
                        label="Product"
                        color="primary"
                        selectionMode="multiple"
                        selectedKeys={productList}
                        onChange={e => handleSlectProduct(e)}
                        size="lg"
                        className="w-[100%] col-span-1"
                    >
                        {product.map((p: ProductType) => <SelectItem key={p.idProduct}
                            startContent={<img className="size-10 object-contain" src={p.imgProduct} alt={p.imgProduct} />}
                        /* endContent={
                            productList.filter((f: number) => f === p.idProduct).length > 0 && <span className="text-[15px]"><FcCheckmark /></span>
                        } */
                        >{p.nameProduct}</SelectItem>)}
                    </Select>}
                    <div className="product-list col-span-2 h-auto min-h-[100px]">
                        {
                            product && product.filter((f: ProductType) => productList.includes(f.idProduct.toString())).map((p: ProductType) => <div className="flex gap-2 items-center">{p.nameProduct}</div>)
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                        Create Order
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>
}

export default ModalOrder