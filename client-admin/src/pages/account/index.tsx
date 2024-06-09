import CurrentUser from "./current"
import Staff from "./staff"
import User from "./user"
import Address from "./address"

const Account = () => {
  return <div className="user w-full h-auto flex flex-wrap justify-around items-center">
    <CurrentUser />
    <Staff />
    <User />
    <Address />
  </div>
}

export default Account