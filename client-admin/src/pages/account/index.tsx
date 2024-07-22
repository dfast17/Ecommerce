import Staff from "./staff"
import User from "./user"
import { StateContext } from "../../context/state"
import { useContext } from "react"

const Account = () => {
  const { isDark } = useContext(StateContext)
  return <div className={`user w-full h-auto min-h-[95.6vh] flex flex-wrap justify-evenly content-start 
  ${isDark ? "bg-[#3d3d3d] text-white" : "bg-[#F5F5F5] text-zinc-900"}`}>
    <Staff />
    <User />
  </div>
}

export default Account