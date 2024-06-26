import logo from "../assets/Logomark.png"
import CartIcon from "../components/icon/cart";
import UserIcon from "../components/icon/user";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react"
import { useLocation, useNavigate } from "react-router-dom"
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import {GiLaptop} from "react-icons/gi";
import { FaRegNewspaper} from "react-icons/fa";
/* import {IoIosNotifications} from "react-icons/io"; */
import {MdOutlineContactPhone} from "react-icons/md";
import { useContext, useState } from "react";
import { StateContext } from "../context/stateContext";
import { CartContext } from "../context/cartContext";
import { CartType } from "../types/type";
import Product_layout_02 from "../components/product/layout_02";
import { GetToken, RemoveToken } from "../utils/token";
import { removeLocalStorage } from "../utils/localStorage";
import { authLogout } from "../api/auth";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, setIsLogin,setListCheckOut } = useContext(StateContext)
  const { cart } = useContext(CartContext)
  const [inputSearch, setInputSearch] = useState<string>("");
  const listNav = [
    {
      id: 1,
      name: 'HOME',
      url: '/',
      icon: AiOutlineHome
    },
    {
      id: 2,
      name: 'PRODUCT',
      url: '/product',
      icon: GiLaptop
    },
    {
      id: 3,
      name: 'POST',
      url: '/post',
      icon: FaRegNewspaper
    },
    {
      id: 4,
      name: 'CONTACT',
      url: '/contact',
      icon: MdOutlineContactPhone
    }
  ]
  const handleLogout = async () => {
    const token = await GetToken()
    token && authLogout(token)
      .then(res => {
        if (res.status === 200) {
          setListCheckOut([])
          RemoveToken('aTk')
          RemoveToken('rTk')
          removeLocalStorage('isLogs')
          setIsLogin(false)
          navigate('/auth')
        }
      })
  }
  const handleSearch = () => {
    inputSearch !== "" && navigate(`/search/${inputSearch}`)
  }
  return <header className={`bg-white sticky top-0 w-[99vw] h-[10vh] flex flex-wrap justify-between sm:justify-around content-around transition-all rounded-md z-50 px-5`}>
    <div className="logo lg:w-1/5 h-3/4 flex items-center justify-start">
      <img src={logo} width={50} height={30} alt="logo" className="mx-4" />
      <h1 className=" text-[15px] lg:text-[20px] xl:text-[30px] font-bold text-[#242424]">TECH STORE</h1>
    </div>
    <nav className={`w-[40%] h-3/4 flex justify-around items-center transition-all rounded-lg`}>
      {listNav.map((n: any) => <div
        key={`header-${n.id}`}
        onClick={() => { navigate(n.url) }}
        className={`nav-content w-1/5 h-4/5 flex flex-col items-center content-center justify-evenly  text-zinc-900 hover:font-semibold transition-all rounded-md cursor-pointer
          
        `}
      >
        <span className="block lg:hidden">{<n.icon />}</span>
        <span className={`nav-text hidden lg:block
        font-bold
        transition-all 
        bg-clip-text 
        ${location.pathname === n.url ?
        `text-[22px] text-transparent bg-[linear-gradient(to_right,theme(colors.cyan.500),theme(colors.blue.500),theme(colors.teal.500),theme(colors.teal.500),theme(colors.blue.400),theme(colors.cyan.500),theme(colors.indigo.500))]`: " text-zinc-950" }
        text-[20px]
        `}>{n.name}</span>
        <div className={`border-nav ${location.pathname === n.url ? "!opacity-100" : "opacity-0"} w-full h-[2px] bg-gradient-to-r from-cyan-900 to-cyan-500`}></div>
      </div>)}
    </nav>
    {/* Search */}
    <nav className={`w-[35%] h-2/5 md:h-3/4 flex justify-around items-center transition-all rounded-lg`}>
      <Input
        onChange={(e) => setInputSearch(e.target.value)}
        onKeyDown={(e: any) => { if (e.key === "Enter") { handleSearch() } }}
        type="search"
        radius="sm"
        variant="bordered"
        className="w-4/5 placeholder-zinc-900 text-zinc-950"
        placeholder="Search products" 
        startContent={
          <Button onClick={handleSearch} aria-label="button search" radius="sm" className="bg-transparent" isIconOnly>
            <BiSearchAlt2 className="text-[25px] text-zinc-950" />
          </Button>
        }
        />
    </nav>
    <nav className={`w-[5%] h-2/5 md:h-3/4 flex justify-evenly items-center transition-all rounded-lg`}>
      {!isLogin && <Button radius="sm" onClick={() => { navigate('/auth') }} className="bg-red-600 text-zinc-50 font-semibold text-[20px]">Login</Button>}
      {isLogin && <Dropdown placement="top-end" offset={20} className="relative bg-zinc-700">
        <DropdownTrigger className="fixed">
          <Button radius="sm" isIconOnly className="bg-transparent relative !hidden sm:!flex justify-center" aria-label="button-cart">
            <CartIcon/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu closeOnSelect={true} className="w-[500px] h-auto min-h-[100px] max-h-[450px]">
          {cart && cart.slice(0, 4).map((c: CartType) => <DropdownItem key={c.idCart}>
            <Product_layout_02 data={c} isButton={true} />
          </DropdownItem>)}
          {cart && cart.length !== 0 && <DropdownItem className="flex justify-center items-center" variant="light">
            <Button className="mx-auto" onClick={() => { navigate('/cart') }}>Detail</Button>
          </DropdownItem>}
        </DropdownMenu>
      </Dropdown>
      }
      {/* {isLogin && <Button radius="sm" isIconOnly aria-label="button-notification">
        <IoIosNotifications className="w-4/5 h-3/5" />
      </Button>} */}
      {isLogin && <Dropdown placement="top-end" offset={20} className="bg-zinc-700">
        <DropdownTrigger>
          <Button radius="sm" isIconOnly aria-label="button-user" className="bg-transparent">
            <UserIcon/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu closeOnSelect={true}>
          <DropdownItem onClick={() => { navigate('/user'); }}>User</DropdownItem>
          <DropdownItem variant="light">
            <Button size="sm" radius="sm" color="danger" onClick={handleLogout}>Logout</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      }
    </nav>
  </header>
}

export default Header