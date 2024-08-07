import { ProductFilterType, ProductType } from 'types/type';
import { useEffect, useState } from 'react'
import Product_Layout_01 from '../../components/product/layout_01';
import { Button, Pagination } from '@nextui-org/react';
import { pagination } from '../../utils/utils';
import FilterBrand from './layout/filterBrand';
import FilterPrice from './layout/filterPrice';
import { SortedData } from '../../utils/handle';
import { useParams } from 'react-router-dom';
import { useFetchDataByKey } from '../../hooks/useFetchData';
import Empty_Data from '../../components/error/empty';

const SearchProduct = () => {
    const param = useParams()
    const { data } = useFetchDataByKey('product', 'productGetByKey', param.key);
    const listBrand = data && Array.from(new Set(
        data.data.map((d: ProductType) => d.brand)
    ))
    const [currentData, setCurrentData] = useState<ProductType[] | null>(null);
    const [activePage, setActivePage] = useState<number>(1)
    const [filter, setFilter] = useState<ProductFilterType>({ brand: [], price: "", detail: [] })
    useEffect(() => { data && setCurrentData(data.data) }, [data])
    useEffect(() => {
        const FilterData = async () => {
            setActivePage(1)
            const productData = data?.data
            const resultBrand = filter.brand.length !== 0 ? productData.filter((f: any) => filter.brand.includes(f.brand)) : productData
            setCurrentData(resultBrand)
        }
        FilterData()
    }, [filter])
    SortedData(currentData, filter.price, setCurrentData, setActivePage)
    return data && data.data.length !== 0 ? <div className='product w-full h-auto flex flex-col items-center justify-center overflow-hidden'>
        <div className='filter w-[90%] flex flex-wrap my-4 text-zinc-900'>
            {data && <FilterBrand listBrand={listBrand} setFilter={setFilter} filterData={filter} />}
            <FilterPrice setFilter={setFilter} filterData={filter} />
            <Button size='sm' radius='sm' color='danger' className='mx-1' onClick={() => { setFilter({ brand: [], price: "", detail: [] }) }}>CLEAR</Button>
        </div>
        <div className='product-layout w-[90%] h-auto min-h-[760px]  grid grid-cols-1 ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {currentData && currentData.slice((12 * activePage) - 12, 12 * activePage).map((d: ProductType) =>
                <Product_Layout_01 data={d} key={`search-${d.idProduct}`} />)}
        </div>
        {currentData && <Pagination isCompact size="lg" showControls page={activePage} total={pagination(12, currentData.length)} initialPage={1} onChange={(e) => { setActivePage(e) }} />}
    </div> : <Empty_Data />
}

export default SearchProduct