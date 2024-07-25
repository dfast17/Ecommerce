import { StatusValueType } from "../types/types"

export const pagination = (itemsInPage: number, dataLength: number) => {
    return Math.ceil(dataLength / itemsInPage)
}
export const percentDiscount = (discount: number, price: number) => {
    return price - ((price * discount) / 100)
}
export const formatDate = (date: string) => {
    return date.split("T")[0].split("-").reverse().join("/")
}
export const statusNextValue: StatusValueType[] = [
    {
        current: "pending",
        next: "prepare",
    },
    {
        current: "prepare",
        next: "shipping",
    }
]
export const ShipperNextValue: StatusValueType[] = [
    {
        current: "shipping",
        next: "delivery",
    },
    {
        current: "delivery",
        next: "success",
    },
    {
        current: "delivery",
        next: "failed",
    }
]
