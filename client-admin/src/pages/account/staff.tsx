import { Avatar, Button, Chip } from "@nextui-org/react"
import { userStore } from "../../store/user"
import { StaffType } from "../../types/types"
import { StateContext } from "../../context/state"
import { useContext } from "react"
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineUpdate } from "react-icons/md";
const Staff = () => {
    const { isDark } = useContext(StateContext)
    const { staff } = userStore()
    return <div className="staff w-[95%] md:w-2/5 h-auto min-h-[250px] flex flex-col pt-1 rounded-md">
        <div className="title w-full h-[50px] flex justify-between items-center px-2">
            <span className={`text-[25px] font-bold ${isDark ? "text-white" : "text-zinc-950"}`}>Staff</span>
            <Button color="primary" radius="sm" size="sm">Create a new Staff Account</Button>
        </div>
        <div className="staff-content w-full grid grid-cols-2 gap-y-2 gap-x-4 px-2">
            {staff && staff.map((s: StaffType) => <div key={s.idStaff} className="rounded-md bg-zinc-50 h-[150px] grid grid-cols-3 shadow-md cursor-pointer hover:scale-105 transition-all">
                <div className="avatar h-full flex flex-wrap content-center items-center justify-center col-span-1">
                    <Avatar className="" src={s.avatar} size="lg" radius="sm" color="primary" />
                    <p className="text-zinc-950 font-bold">#{s.idStaff}</p>
                </div>
                <div className="relative detail h-full col-span-2 text-zinc-950 flex flex-col justify-start items-start py-1">
                    <div className="w-full flex justify-end px-1">
                        <Chip radius="sm" variant="bordered" color={s.action === "active" ? "success" : "danger"}>{s.action}</Chip>
                    </div>
                    <p className="font-bold">{s.name}</p>
                    <p className="text-zinc-700">{s.email}</p>
                    <p className="text-zinc-700">{s.position_name}</p>
                    <p className="text-zinc-700 flex">
                        <CiCalendarDate className="mr-2 text-[20px]" />
                        {s.created_at!.split("T")[0].split("-").reverse().join("/")}</p>
                    <p className="text-zinc-700 flex">
                        <MdOutlineUpdate className="mr-2 text-[20px]" />
                        {s.updated_at!.split("T")[0].split("-").reverse().join("/")}</p>
                </div>
            </div>)}
        </div>

    </div>
}

export default Staff