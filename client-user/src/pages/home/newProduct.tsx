
import { StateContext } from '../../context/stateContext';
import { useContext, useEffect, useState } from 'react'
import { ProductType } from 'types/type';
import Home_layout_01 from '../../components/home/home_layout_01';
const NewProduct = () => {
    const { newProduct } = useContext(StateContext);
    const [data, setData] = useState<ProductType[] | null>(null);
    useEffect(() => {
        newProduct && setData(newProduct)
    }, [newProduct]);

    return <Home_layout_01 data={data} k="h-new" title="New Product" link={"/product"}/>
}

export default NewProduct