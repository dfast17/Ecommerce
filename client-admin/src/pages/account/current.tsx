import { userStore } from "../../store/user"
import { StaffType } from "../../types/types"
import { Avatar, Badge, Button, DateInput, Input } from "@nextui-org/react"
import { CalendarDate, parseDate } from "@internationalized/date";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
const CurrentUser = () => {
  const { currentUser } = userStore()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  return <div className="current-user w-full h-auto flex">
    <div className="info-user w-full h-auto pt-1">
      {currentUser && currentUser.map((c: StaffType) => <div className="w-full h-auto flex flex-wrap justify-around items-center" key={`current-user-${c.idStaff}`}>
        <Badge size="lg" classNames={{ badge: "flex justify-center items-center w-7 h-6 rounded-md cursor-pointer" }} content={<FaRegEdit />} color="primary" placement="bottom-right">
          <Avatar src={c.avatar} size="lg" radius="sm" color="primary" />
        </Badge>
        <Input isReadOnly={isEdit} radius="sm" className="w-[98%] mb-1 mt-4" type="text" value={c.name} placeholder="Name" />
        <Input isReadOnly={isEdit} radius="sm" className="w-[48%] my-1" type="text" value={c.email} placeholder="Email" />
        <Input isReadOnly={isEdit} radius="sm" className="w-[48%] my-1" type="text" value={c.phone} placeholder="Phone" />
        <Input isReadOnly={isEdit} radius="sm" className="w-[48%] my-1" type="text" value={c.address} placeholder="Address" />
        <DateInput
          isReadOnly={isEdit}
          className="w-[48%]"
          radius="sm"
          value={parseDate(c.birthday!)}
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
        <Button onClick={() => setIsEdit(!isEdit)} color="primary" size="sm" className="my-1" radius="sm">
          <IoSettingsOutline className="text-[20px] text-zinc-50" />
          Edit
        </Button>
      </div>
      )}
    </div>

  </div>
}

export default CurrentUser