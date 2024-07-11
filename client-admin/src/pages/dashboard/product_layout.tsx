import { Product_sold_type, Product_view_type } from "../../types/layout_type"
const Product_layout = ({ data, type_layout, background }: { data: Product_view_type[] | Product_sold_type[], type_layout: "view" | "sold", background: string }): JSX.Element => {
    return <div className={`w-[98%] xl:w-[49.5%] h-[360px] text-white rounded-md flex flex-wrap justify-around contents-start  my-1 p-2`}>
        <div className="relative w-full lg:w-[29%] h-[60px] lg:h-full flex items-center justify-center rounded-md"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div className="overlay absolute top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-950 bg-opacity-60 rounded-md cursor-pointer z-0"></div>
            <div className="relative w-full h-auto flex items-center justify-center text-[35px] text-center font-bold font-tech-shark text-white z-10">
                PRODUCT {type_layout.toLocaleUpperCase()}
            </div>
        </div>
        <div className="w-full lg:w-[70%] h-[300px] lg:h-full grid grid-cols-4 gap-2">
            {data?.map((p: Product_view_type | Product_sold_type, index: number) =>
                <div className={`relative ${index === 0 || index === 3 ? 'col-span-4 row-span-2' : 'col-span-2 row-span-2'} 
          h-auto bg-zinc-200 min-h-[30px] flex items-center justify-center rounded-md`} key={`View-${p.nameProduct}`}>
                    <div className="overlay absolute z-0 top-0 left-0 flex justify-center items-center rounded-md w-full h-full"
                        style={{
                            backgroundImage: `url(https://i.pinimg.com/564x/ff/9a/91/ff9a91ed70169345c603fe4f24cb8180.jpg)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    >
                        <span className="font-bold text-white text-[30px] truncate">{p.nameProduct}</span>
                    </div>
                    <div className="relative w-[98%] h-[90%] z-10 flex flex-wrap bg-zinc-50 bg-opacity-20 backdrop-blur-[1px] rounded-md">
                        <div className="w-2/4 h-full">
                            <img src={p.imgProduct} className="w-full h-[95%] object-contain" />
                        </div>
                        <div className="w-2/4 h-full flex flex-wrap content-start justify-around text-[20px] font-bold font-mono truncate text-center">
                            <span className="w-full text-start text-[20px] font-bold font-mono">{p[type_layout]}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
        {/*  {statistical.product && statistical.product[0]?.view.map((p: any) => <div className="w-full h-auto min-h-[30px] flex justify-around items-center" key={`View-${p.nameProduct}`}>
      <div className="w-1/4 text-[20px] font-bold font-mono truncate">
        <span className="truncate">{p.nameProduct}</span>
      </div>
      <div className="w-1/4"><img src={p.imgProduct} className="w-full h-[50px] object-contain" /></div>
      <span className="text-[20px] font-bold font-mono">{p.price}$</span>
      <span className="text-[20px] font-bold font-mono">{p.view}</span>
    </div>)} */}
    </div>
}

export default Product_layout