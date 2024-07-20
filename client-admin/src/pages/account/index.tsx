import Staff from "./staff"
import User from "./user"
import Address from "./address"
import { StateContext } from "../../context/state"
import { useContext } from "react"
import { Button } from "@nextui-org/react"

const Account = () => {
  const { isDark } = useContext(StateContext)
  return <div className={`user w-full h-auto min-h-[95.6vh] flex flex-wrap justify-around items-center ${isDark ? "bg-[#3d3d3d] text-white" : "bg-[#F5F5F5] text-zinc-900"}`}>
    {/* <div className="w-full text-zinc-900 flex items-center justify-start px-2 font-han text-[35px] font-bold">
      <Button color="primary" radius="sm" size="sm">Create a new Staff Account</Button>
    </div> */}
    <Staff />
    <User />
    <Address />
  </div>
}

export default Account