import { useContext } from 'react'
import { StateContext } from '../../context/state'
import { formatDate } from '../../utils/utils'

const Comment_component = ({ data, type }: { data: any[], type: string }) => {
    const { role } = useContext(StateContext)
    return <div className={`w-[98%] ${role === 0 ? "xl:w-[49.5%]" : "xl:w-[32%]"} h-auto min-h-[400px] bg-zinc-900 rounded-md flex flex-wrap items-center my-1 p-2`}
        style={{
            backgroundImage: `url(https://i.pinimg.com/736x/b3/85/78/b38578854caa86d9af41a092e13a93c1.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}
    >
        <h1 className="w-full text-[30px] text-center font-bold font-mono">Comment {type}</h1>
        <div className="w-full h-[300px] flex flex-wrap justify-center  items-center">
            <div className="w-full h-[50px] flex items-center justify-center text-[20px] font-bold font-mono">
                <div className="w-[10%]">Id</div>
                <div className="w-[15%]">Name</div>
                <div className="w-3/5">Comment</div>
                {role === 0 && <div className="w-[15%]">Date</div>}
            </div>
            {data && data.map((item: any) =>
                <div className="w-full h-[50px] flex items-center justify-center text-[20px] font-bold font-mono" key={`Comment-post-${item.id}`}>
                    <div className="w-[10%]">#{item.id}</div>
                    <div className="w-[15%]">{item.nameUser}</div>
                    <div className="w-3/5">{item.commentValue}</div>
                    {role === 0 && <div className="w-[15%]">{formatDate(item.created_date)}</div>}
                </div>
            )}
        </div>
    </div>
}

export default Comment_component