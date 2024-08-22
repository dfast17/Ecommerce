import Staff from "./staff"
import User from "./user"
import { StateContext } from "../../context/state"
import { useContext } from "react"
import { GetToken } from "../../utils/token"
import { updateStatus } from "../../api/user"
import { userStore } from "../../store/user"
import { useNavigate } from "react-router-dom"

const Account = () => {
  const { role, isDark } = useContext(StateContext)
  const { user, staff, setUser, setStaff } = userStore()
  const navigate = useNavigate()
  const handleChangeStatus = async (type: "users" | "staff", id: string, action: "active" | "block") => {
    const token = await GetToken()
    token && updateStatus(token, { action, id }).
      then(res => {
        alert(res.message)
        if (res.status === 200) {
          type === "users" && user && setUser(user.map((u: any) => u.idUser === id ? { ...u, action: action } : u))
          type === "staff" && staff && setStaff(staff.map((s: any) => s.idStaff === id ? { ...s, action: action } : s))
        }
      })
      .catch(err => console.log(err))
  }
  if (role !== 0) {
    return navigate('/')
  }
  return <div className={`user w-full h-auto min-h-[95.6vh] flex flex-wrap justify-evenly content-start 
  ${isDark ? "bg-[#3d3d3d] text-white" : "bg-[#F5F5F5] text-zinc-900"}`}>
    {role === 0 && <>
      <Staff handleChangeStatus={handleChangeStatus} />
      <User handleChangeStatus={handleChangeStatus} />
    </>}
  </div>

}

export default Account