import { Button, Input } from "@nextui-org/react"
import { userStore } from "../../store/user"
import Purchase from "./purchase"

const Account = () => {
    const {user} = userStore()
    return user && <div className='account w-full h-auto flex flex-wrap justify-around items-center'>
        <div className="info-detail w-[35%] text-zinc-900 flex flex-col items-center">
            <Input className="my-4" type="text" variant="bordered" radius="sm" label="Name" value={user[0]?.nameUser} isReadOnly />
            <Input className="my-4" type="text" variant="bordered" radius="sm" label="Phone" value={user[0]?.phone} isReadOnly />
            <Input className="my-4" type="text" variant="bordered" radius="sm" label="Email" value={user[0]?.email} isReadOnly />
            <Button radius="sm" className="w-[186px] text-zinc-100 text-[20px] bg-[#0E1422]">Edit</Button>
        </div>
        <div className="purchase w-[65%]">
            <Purchase />
        </div>
    </div>
}

export default Account