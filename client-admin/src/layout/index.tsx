/* import { useContext } from "react" */
/* import LoadingComponent from "../loading/loadingComponent" */
import { useLocation } from "react-router-dom";
/* import { StateContext } from "../../context/stateContext" */
import Auth from "../pages/auth";
import AdminLayout from "./AdminLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  /* const {isLoading} = useContext(StateContext) */
  return location.pathname !== "/auth" ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <Auth />
  );
};

export default Layout;
