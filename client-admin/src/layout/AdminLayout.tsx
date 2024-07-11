import { ReactNode, useContext, useState } from "react";
import { TfiDashboard } from "react-icons/tfi";
import {
  FaLaptopCode,
  FaUserCog,
  FaLuggageCart,
  FaMoon,
  FaSun,
  FaAngleLeft,
  FaAngleRight
} from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import {
  MdOutlineDiscount,
  MdOutlineLightMode,
} from "react-icons/md";
import { IconType } from "react-icons";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { Button, Switch } from "@nextui-org/react";
import { StateContext } from "../context/state";
import { RemoveToken } from "../utils/token";
import Logo from "../assets/Logomark.png"
import classNames from "classnames";

interface NavContent {
  idNav: number;
  content: string;
  icon: IconType;
  url: string;
}

const navArr: NavContent[] = [
  {
    idNav: 1,
    content: "Dashboard",
    icon: TfiDashboard,
    url: "/"
    url: "/",
    delay: "0",
  },
  {
    idNav: 2,
    content: "Product",
    icon: FaLaptopCode,
    url: "/product"
    url: "/product",
    delay: "5",
  },
  {
    idNav: 3,
    content: "Account",
    icon: FaUserCog,
    url: "/account"
    url: "/account",
    delay: "10",
  },
  {
    idNav: 4,
    content: "Post/Blog",
    icon: BsFillPostcardFill,
    url: "/post"
    url: "/post",
    delay: "15",
  },
  {
    idNav: 5,
    content: "Order",
    icon: FaLuggageCart,
    url: "/order"
    url: "/order",
    delay: "20",
  },
  {
    idNav: 6,
    content: "Event",
    icon: MdOutlineDiscount,
    url: "/event"
  }
    url: "/event",
    delay: "25",
  },
  {
    idNav: 7,
    content: "Warehouse",
    icon: MdOutlineWarehouse,
    url: "/warehouse"
    url: "/warehouse",
    delay: "30",
  },
];

interface IAdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: IAdminLayoutProps) => {
  const { isDark, setIsDark, setIsLogin } = useContext(StateContext);
  const [isHeader, setIsHeader] = useState(true)
  const handleSetDarkMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("isDark", JSON.stringify(!isDark));
  };

  const handleLogout = () => {
    setIsLogin(false);
    RemoveToken("aTk");
    RemoveToken("rTk");
    RemoveToken("a-Log");
    handleSetDarkMode();
  };

  return (
    <div className={`relative flex h-screen overflow-y-hidden `}>
      <aside
        className={`fixed z-50 transition-all w-72 pt-6 px-6 pb-8 h-full flex flex-col overflow-y-auto border-r bg-[#09090A] text-white
          ${isDark ? " border-r-[#1F1F22]" : "border-r-[#EFEFEF]"} 
          ${isHeader ? "translate-x-0" : "translate-x-[-100%]"}`}
      >
        <div className="w-full flex justify-end">
          <Button isIconOnly size="sm" onClick={() => setIsHeader(!isHeader)}>
            <FaAngleLeft />
          </Button>
        </div>
        <div>
          <div className="flex gap-x-3 items-center">
            <img
              src={Logo}
              alt="Avatar"
              className="w-14 h-14 rounded-2xl object-cover"
            />

            <div>
              <p
                className={classNames("font-bold text-[#EFEFEF]")}
              >
                Tech Store
              </p>
              <p
                className={classNames("text-sm text-[#EFEFEF]")}
              >
                techstore@gmail.com
              </p>
            </div>
          </div>

          <div
            className={classNames(
              "my-12 h-14 flex items-center gap-x-4 rounded-2xl px-4 text-[#EFEFEF]",
              {
                "bg-[#1F1F22] ": isDark,
                "bg-[#F5F5F5] ": !isDark,
              }
            )}
          >
            <div>
              <CiSearch className="text-xl" />
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="flex-1 w-full bg-transparent outline-none"
            />
          </div>

          <div>
            {navArr.map((it) => {
              const NavIcon = it.icon;

              return (
                <NavLink
                  to={it.url}
                  key={`nav-item-${it.idNav}`}
                  className={classNames(
                    "flex items-center gap-x-4 p-4 rounded-2xl text-[#EFEFEF] hover:text-zinc-950 hover:bg-[#F5F5F5]",)}
                >
                  <div className="text-2xl">
                    <NavIcon />
                  </div>

                  <p>{it.content}</p>
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="mt-auto">
          <div
            onClick={handleLogout}
            className={classNames(
              "flex items-center gap-x-4 p-4 rounded-2xl cursor-pointer text-[#EFEFEF] hover:text-zinc-50"
            )}
          >
            <div className="text-2xl">
              <LuLogOut />
            </div>

            <p>Logout</p>
          </div>

          <div
            className={classNames("flex items-center gap-x-4 py-4 pl-4 text-[#EFEFEF]")}
          >
            <div className="text-2xl">
              <MdOutlineLightMode />
            </div>

            <p>{isDark ? "Dark mode" : "Light mode"}</p>

            <Switch
              isSelected={isDark}
              onChange={handleSetDarkMode}
              size="md"
              color="secondary"
              className="ml-auto"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <FaMoon className={className} />
                ) : (
                  <FaSun className={className} />
                )
              }
            />
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className={`relative top-0 left-0 w-[99.2vw] h-[40px] flex content-start justify-start ${isDark ? "bg-[#3d3d3d]" : "bg-[#F5F5F5]"} p-1`}>
          <Button isIconOnly size="sm" onClick={() => setIsHeader(!isHeader)} className="bg-blue-500">
            <FaAngleRight />
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
