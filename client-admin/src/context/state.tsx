import { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";
import Cookies from "js-cookie";
import { Product_sold_type, Product_view_type } from "../types/layout_type";
import { CategoryPostType, LogsType, OrderType, PostType, ShipperType } from "../types/types";
interface statisticalType {
    product: [{ total: number, view: Product_view_type[], sold: Product_sold_type[] }] | null,
    user: any[] | null,
    revenue: any[] | null,
    order: any[] | null,
    commentPost: any[] | null,
    commentProduct: any[] | null
}

export const StateContext = createContext<any>({});
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [isDark, setIsDark] = useState<boolean>(false)
    const [statistical, setStatistical] = useState<statisticalType>({ product: null, user: null, revenue: null, order: null, commentPost: null, commentProduct: null })
    const [role, setRole] = useState<number | null>(null)
    const [position, setPosition] = useState<string | null>(null)
    const [post, setPost] = useState<PostType[] | null>(null)
    const [typePost, setTypePost] = useState<CategoryPostType[] | null>(null)
    const [sale, setSale] = useState<any>(null)
    const [order, setOrder] = useState<OrderType[] | null>(null)
    const [shipper, setShipper] = useState<ShipperType[] | null>()
    const [log, setLog] = useState<LogsType[] | null>(null)
    useEffect(() => {
        document.body.classList.remove(!isDark ? 'dark' : 'light')
        document.body.classList.add(isDark ? 'dark' : 'light')
    }, [isDark])
    useEffect(() => {
        const isDark = JSON.parse(getLocalStorage('isDark') || 'false')
        const adminLog = Cookies.get('a-Log')
        const role = Cookies.get('role')
        setIsDark(isDark)
        setRole(role ? Number(role) : null)
        setIsLogin(adminLog ? true : false)
    }, [])
    return (
        <StateContext.Provider value={{
            isLoading, setIsLoading,
            isLogin, setIsLogin,
            isDark, setIsDark,
            statistical, setStatistical,
            sale, setSale,
            role, setRole,
            post, setPost,
            typePost, setTypePost,
            order, setOrder,
            position, setPosition,
            shipper, setShipper,
            log, setLog
        }}>
            {children}
        </StateContext.Provider>
    )
}