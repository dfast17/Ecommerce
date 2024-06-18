import { StateContext } from "../../context/stateContext"
import { useContext, useState } from "react"
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { pagination } from "../../utils/utils"
import { MdCancelPresentation } from "react-icons/md";
const Order = () => {
    const { order } = useContext(StateContext)
    const [activePage, setActivePage] = useState<number>(1)
    return <div className="user-purchase w-full h-auto flex flex-wrap justify-center items-center p-1">
        <div className="product w-full h-auto flex flex-wrap justify-around content-start">
            <div className="w-full text-zinc-900 flex items-center justify-center font-han text-[40px] font-bold">Order</div>
            <Table aria-label="TableOrder"
                className="text-zinc-900 w-full"
                classNames={{ wrapper: ['bg-transparent !shadow-none'], th: ['bg-[#242424] text-zinc-50 text-[18px]'] }}>
                <TableHeader>
                    <TableColumn>Id</TableColumn>
                    <TableColumn>Product Name</TableColumn>
                    <TableColumn>Image product</TableColumn>
                    <TableColumn>Total</TableColumn>
                    <TableColumn>Payment Status</TableColumn>
                    <TableColumn>Order Status</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>#order_test_2024_05_06</TableCell>
                        <TableCell>Product Name test 1</TableCell>
                        <TableCell>
                            <img width={'130px'} height={'100px'} src="https://trungtran.vn/images/news/2023/11/original/laptop-gaming-35-trieu-4_1700724205.png" />
                        </TableCell>
                        <TableCell>$2000</TableCell>
                        <TableCell>paid</TableCell>
                        <TableCell>pending</TableCell>
                        <TableCell>
                            <Tooltip radius="sm" content="Cancel Order" classNames={{ content: "text-zinc-950" }}>
                                <Button size="sm" isIconOnly color="danger">
                                    <MdCancelPresentation className="text-xl" />
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {order && order.length !== 0 && <Pagination isCompact size="lg" showControls page={activePage}
                total={pagination(2, order.length)} initialPage={1} onChange={(e) => { setActivePage(e) }} />}
        </div>
    </div>
}

export default Order