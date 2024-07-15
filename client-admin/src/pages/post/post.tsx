import { useContext } from "react"
import { StateContext } from "../../context/state"
import { PostType } from "../../types/types"
import { Code } from "@nextui-org/react"
import { formatDate } from "../../utils/utils"

const Post_data = () => {
    const { post } = useContext(StateContext)
    return <div className="w-full h-auto flex flex-wrap justify-center items-center">
        <h1 className="w-full text-blue-500 text-[30px] text-center font-bold my-4">Posts</h1>
        <div className="w-[95%] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
            {post?.map((e: PostType) => <div className="relative h-auto min-h-[300px] flex flex-wrap items-center justify-center rounded-md bg-zinc-950 m-1" key={e.idPost}
                style={{ backgroundImage: `url(${e.thumbnails})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}
            >
                <div className="overlay absolute top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-950 bg-opacity-60 rounded-md cursor-pointer z-0"></div>
                <div className="relative w-full h-auto flex items-center justify-center text-[35px] text-center font-bold font-tech-shark text-white cursor-pointer z-10">
                    {e.title}
                </div>
                <div className="w-full flex flex-wrap justify-evenly items-center z-10">
                    <Code className="min-w-[120px] my-1 w-2/5 h-[40px] flex items-center justify-center text-[20px] text-zinc-950 rounded-md bg-gradient-to-r from-cyan-100 bg-cyan-500">
                        {e.poster}
                    </Code>
                    <Code size="sm" className="min-w-[120px] my-1 w-2/5 h-[40px] flex items-center justify-center text-[20px] text-zinc-950 rounded-md bg-gradient-to-r from-cyan-100 bg-cyan-500">
                        {formatDate(e.dateAdded)}
                    </Code>
                </div>
            </div>)}
        </div>

    </div>
}

export default Post_data