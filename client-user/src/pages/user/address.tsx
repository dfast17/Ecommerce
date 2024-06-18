import { Button, Code, Modal, useDisclosure } from "@nextui-org/react";
import { userStore } from "../../store/user";
import { GetToken } from "../../utils/token";
import { userAddress } from "../../api/user";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditLocationAlt } from "react-icons/md";
import ModalAddress from "./modal/address";

const Address = () => {
  const { user, remove_address, updated_type_address } = userStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleChangeAddress = async (type: "update" | "remove", data: { listId?: number[]; typeAddress?: string }) => {
    const token = await GetToken();
    const dataChange = {
      type: type,
      dataOperation: data,
    };
    token &&
      userAddress(token, dataChange).then((res) => {
        if (res.status === 200) {
          type === "remove" ? remove_address(data.listId!) : updated_type_address(data);
        }
      });
  };
  return <div className="w-full">
    <Button onPress={onOpen} className="w-[220px] text-[18px] bg-[#0E1422] text-[#FFFFFF]" radius="sm">Add Address</Button>
    <div className="address w-full h-full text-zinc-900 mt-10">
      {user &&
        user[0]?.address.map((a: any) => (
          <div className="address-detail w-[90%] my-2 !text-zic-100 flex" key={a.idAddress}>
            <Code
              radius="sm"
              style={{ color: "white" }}
              className={`flex items-center text-wrap ${a.type === "default" ? "bg-blue-500" : "bg-[#0E1422]"
                } w-4/5 min-h-[45px] text-[18px] cursor-pointer`}
            >
              {a.detail}
            </Code>
            <Button
              size="sm"
              radius="sm"
              className={`w-[120px] h-[45px] text-[18px] flex items-center  text-center ${a.type === "extra" ? "bg-[#0E1422]" : "bg-blue-500"
                } text-zinc-100 mx-1 cursor-pointer`}
              onClick={() => {
                handleChangeAddress("update", {
                  listId: [a.idAddress],
                  typeAddress: a.type === "default" ? "extra" : "default",
                });
              }}
            >
              {a.type}
            </Button>
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              className="h-[45px] text-[18px] bg-blue-500"
            >
              <MdEditLocationAlt className="text-white"/>
            </Button>
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              color="danger"
              className="h-[45px] text-[18px] mx-1"
              onClick={() => handleChangeAddress("remove", { listId: [a.idAddress] })}
            >
              <FaRegTrashAlt />
            </Button>
          </div>
        ))}
    </div>
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      backdrop="opaque"
      placement="center"
    >
      <ModalAddress />
    </Modal>
  </div>
};

export default Address;
