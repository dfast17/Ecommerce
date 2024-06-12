import {  useState } from "react"
import Order from "./order";
import { userStore } from "../../store/user";
import Account from "./account";
import Address from "./address";
import Password from "./password";

import { CiUser,CiShoppingCart  } from "react-icons/ci";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";

const User = () => {
  const { user} = userStore()
  const [activeComponent,setActiveComponent] = useState("Account")
  const componentList = [
    {
      displayName: "Account",
      component: Account,
      icon:CiUser
    },
    {
      displayName: "Order",
      component: Order,
      icon:CiShoppingCart
    },
    {
      displayName: "Address",
      component: Address,
      icon:MdOutlineLocalShipping
    },
    {
      displayName: "Password",
      component: Password,
      icon:TfiKey
    }
  ]
/*   const handleChangeAddress = async (type: "update" | "remove", data: { listId?: number[], typeAddress?: string }) => {
    const token = await GetToken()
    const dataChange = {
      type: type,
      dataOperation: data
    }
    token && userAddress(token, dataChange)
      .then(res => {
        if (res.status === 200) {
          type === "remove" ? remove_address(data.listId!) : updated_type_address(data)
        }
      })
  } */
  return user && <div className="user w-full h-auto min-h-screen p-2 flex items-center">
    <div className="user w-full h-auto min-h-[500px] flex flex-wrap justify-around items-center">
      <div className="w-1/5 h-[500px] border-r border-r-solid border-zinc-900 py-10">
        {componentList.map((c:any) => <div 
        onClick={() => setActiveComponent(c.displayName)}
        className={`w-[250px] h-[40px] p-4 flex items-center font-bold text-[20px] rounded-md  my-1
        ${activeComponent === c.displayName ? 'bg-[#0E1422] text-zinc-100' : 'text-zinc-500'} 
        hover:bg-[#0E1422] hover:text-zinc-100 transition-all cursor-pointer`}>
          <c.icon className="mr-2"/> {c.displayName}
        </div>)}
      </div>
      <div className="w-[70%] h-auto min-h-[500px]">
          {componentList.filter((c:any) => c.displayName === activeComponent).map((c:any) => <c.component />)}
      </div>
    </div>
  </div>
}

export default User