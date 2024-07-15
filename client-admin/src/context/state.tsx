import { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";
import Cookies from "js-cookie";
import { Product_sold_type, Product_view_type } from "../types/layout_type";
import { CategoryPostType, PostType } from "../types/types";
interface statisticalType {
    product: [{ total: number, view: Product_view_type[], sold: Product_sold_type[] }] | null,
    user: any[] | null,
    revenue: any[] | null
}

export const StateContext = createContext<any>({});
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [isDark, setIsDark] = useState<boolean>(false)
    const [statistical, setStatistical] = useState<statisticalType>({ product: null, user: null, revenue: null })
    const [role, setRole] = useState<number | null>(null)
    const [post, setPost] = useState<PostType[] | null>(null)
    const [typePost, setTypePost] = useState<CategoryPostType[] | null>(null)
    const [sale, setSale] = useState<any>(null)
    useEffect(() => {
        document.body.classList.remove(!isDark ? 'dark' : 'light')
        document.body.classList.add(isDark ? 'dark' : 'light')
    }, [isDark])
    useEffect(() => {
        const isDark = JSON.parse(getLocalStorage('isDark') || 'false')
        const adminLog = Cookies.get('a-Log')
        setIsDark(isDark)
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
            typePost, setTypePost
        }}>
            {children}
        </StateContext.Provider>
    )
}