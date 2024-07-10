import { StateContext } from '../../context/stateContext';
import { useContext, useEffect, useState } from 'react'
import Home_layout_01 from '../../components/home/home_layout_01';

const Laptop = (): JSX.Element => {
    const { product } = useContext(StateContext);
    const [data, setData] = useState<any[] | null>(null);
    useEffect(() => {
        product && setData(product.filter((f: any) => f.type === "laptop")[0].data.filter((f: any) => f.view > 10))
    }, [product]);
    return <Home_layout_01 data={data} k="h-laptop" title="Laptop" link={"/product"} banner='https://i.pinimg.com/564x/68/2f/3e/682f3ebdbb461ed6c5a01aec59a1b39b.jpg' />
}

export default Laptop