import { productStore } from "../../store/product"
import { CategoryProductType } from "../../types/types"

const Category = () => {
    const { category } = productStore()
    return <div className="w-full h-auto flex flex-wrap justify-around items-center my-4">
        {category && category.map((c: CategoryProductType) => <div className="w-[200px] h-[100px] relative hover:scale-110 transition-all" key={c.idType}>
            <div className='h-full flex items-center justify-center'
                style={{
                    background: 'white',
                    clipPath: 'polygon(80% 0%, 0% 0px, 0% 60%, 20% 100%, 100% 100%, 100% 40%)'
                    ,
                }}
            ></div>
            <div className='absolute top-0 left-0 w-full h-full cursor-pointer flex items-center justify-center font-bold font-tech-shark text-[20px] px-3 border border-solid borderr-zinc-50'
                style={{
                    backgroundImage: 'url(https://i.pinimg.com/564x/7e/80/52/7e805269cf7be40bb2ff0fcd61f458a5.jpg)',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    clipPath: 'polygon(79% 1%, 0.5% 1px, 0.5% 59%, 21% 99%, 99% 99%, 99% 41%)'
                }}
            >
                {c.nameType.toLocaleUpperCase()}
            </div>
        </div>)}
    </div>
}

export default Category