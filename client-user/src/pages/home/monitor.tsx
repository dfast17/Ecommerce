import { StateContext } from '../../context/stateContext';
import { useContext, useEffect, useState } from 'react'
import Home_layout_01 from '../../components/home/home_layout_01';

const Monitor = () => {
    const { product } = useContext(StateContext);
    const [data, setData] = useState<any[] | null>(null);
    useEffect(() => {
        product && setData(product.filter((f: any) => f.type === "monitor")[0].data.filter((f: any) => f.view > 0))
    }, [product]);
    return <Home_layout_01 data={data} k="h-monitor" title="Monitor" link={"/product"}/>
}

export default Monitor