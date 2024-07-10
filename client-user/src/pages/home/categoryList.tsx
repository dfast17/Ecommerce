import { StateContext } from "../../context/stateContext"
import { useContext } from "react"
import { CategoryType } from '../../types/type';
import { useNavigate } from "react-router-dom";

const CategoryList = (): JSX.Element => {
    const { type } = useContext(StateContext)
    const navigate = useNavigate()
    return <div className="relative w-[90%] h-auto min-h-[100px] flex flex-wrap justify-around items-center p-1 my-2">
        <div className="h-title w-full h-[40px] flex justify-center items-center font-bold font-tech-shark text-[35px]
        bg-clip-text 
        text-transparent bg-[linear-gradient(to_right,theme(colors.cyan.500),theme(colors.blue.500),theme(colors.teal.500),theme(colors.teal.500),theme(colors.blue.400),theme(colors.cyan.500),theme(colors.indigo.500))]
        my-4">Category</div>
        {type && type.map((t: CategoryType) => <div className="w-[200px] h-[100px] relative hover:scale-110 transition-all" onClick={() => navigate(`/search/${t.nameType}`)} key={t.idType}>
            <div className='h-full flex items-center justify-center'
                style={{
                    background: 'white',
                    clipPath: t.idType % 2 !== 0 ? 'polygon(20% 0%, 100% 0px, 100% 60%, 80% 100%, 0px 100%, 0px 40%)' : 'polygon(80% 0%, 0% 0px, 0% 60%, 20% 100%, 100% 100%, 100% 40%)'
                    ,
                }}
            ></div>
            <div className='absolute top-0 left-0 w-full h-full cursor-pointer flex items-center justify-center font-bold font-tech-shark text-[20px] px-3 border border-solid borderr-zinc-50'
                style={{
                    backgroundImage: 'url(https://i.pinimg.com/564x/7e/80/52/7e805269cf7be40bb2ff0fcd61f458a5.jpg)',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    clipPath: t.idType % 2 !== 0 ? 'polygon(21% 1%, 99.5% 1px, 99.5% 59%, 79% 99%, 1px 99%, 1px 41%)' : 'polygon(79% 1%, 0.5% 1px, 0.5% 59%, 21% 99%, 99% 99%, 99% 41%)'
                }}
            >
                {t.nameType}
            </div>
        </div>)}
    </div>
}

export default CategoryList