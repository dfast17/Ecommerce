import { userStore } from "../../store/user"
import { StaffType } from "../../types/types"
import { Avatar, Badge, Button, DateInput, Input, ModalBody, ModalContent } from "@nextui-org/react"
import { CalendarDate, parseDate } from "@internationalized/date";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
const CurrentUser = () => {
  const { currentUser } = userStore()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  return <ModalContent>
    {(onClose) =>
      <>
        <ModalBody>
          <div className="info-user w-full h-auto pt-1">
            {currentUser && currentUser.map((c: StaffType) => <div className="w-full h-auto flex flex-wrap justify-around items-center" key={`current-user-${c.idStaff}`}>
              <Badge size="lg" classNames={{ badge: "flex justify-center items-center w-7 h-6 rounded-md cursor-pointer" }} content={<FaRegEdit />} color="primary" placement="bottom-right">
                <Avatar src={c.avatar} size="lg" radius="sm" color="primary" />
              </Badge>
              <Input isReadOnly={!isEdit} radius="sm" className="w-[98%] mb-1 mt-4" type="text" defaultValue={c.name} placeholder="Name" />
              <Input isReadOnly={!isEdit} radius="sm" className="w-[48%] my-1" type="text" defaultValue={c.email} placeholder="Email" />
              <Input isReadOnly={!isEdit} radius="sm" className="w-[48%] my-1" type="text" defaultValue={c.phone} placeholder="Phone" />
              <Input isReadOnly={!isEdit} radius="sm" className="w-[48%] my-1" type="text" defaultValue={c.address} placeholder="Address" />
              <DateInput
                isReadOnly={!isEdit}
                className="w-[48%]"
                radius="sm"
                defaultValue={parseDate(c.birthday!)}
                placeholderValue={new CalendarDate(1995, 11, 6)}
              />
              {!isEdit && <Button onClick={() => setIsEdit(!isEdit)} color="primary" size="sm" className="my-1" radius="sm">
                <IoSettingsOutline className="text-[20px] text-zinc-50" />
                Edit
              </Button>}
              {isEdit &&
                <div className="flex justify-around items-center">
                  <Button color="success" size="sm" className="m-1 text-white" radius="sm">
                    Update
                  </Button>
                  <Button onClick={() => setIsEdit(!isEdit)} color="danger" size="sm" className="m-1 text-white" radius="sm">
                    Cancel
                  </Button>
                </div>
              }
            </div>
            )}
          </div>
        </ModalBody>
      </>
    }
  </ModalContent>
}

export default CurrentUser