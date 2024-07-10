import { useContext, useState } from "react"
import SignIn from "./signIn"
import { authForgot, authLogin, authRegister } from "../../api/auth"
import { SaveToken } from "../../utils/token"
import { setLocalStorage } from "../../utils/localStorage"
import { useNavigate } from "react-router-dom"
import { StateContext } from "../../context/stateContext"
import SignUp from "./signUp"
import Forgot from "./forgot"

const Auth = () => {
  const { setIsLogin } = useContext(StateContext)
  const [formName, setFormName] = useState<string>("signIn")
  const navigate = useNavigate()
  const handleAuth = (typeAuth: string, data: any) => {
    let url;
    switch (typeAuth) {
      case 'login':
        url = authLogin;
        break;
      case 'register':
        url = authRegister;
        break;
      case 'forgot':
        url = authForgot;
        break;
    }
    url && url(data).then((res: { status: number, message?: string, data?: any }) => {
      res.message && alert(res.message)
      if (res.status === 200 || res.status === 201) {
        if (typeAuth === "login") {
          SaveToken('aTk', res.data.accessToken, res.data.expiredA)
          SaveToken('rTk', res.data.refreshToken, res.data.expiredR)
          setLocalStorage('isLogs', true)
          setIsLogin(true)
          SaveToken('login', 'true', res.data.expiredR)
          navigate('/')
        }
        (typeAuth === "register" || typeAuth === "forgot") && setFormName("signIn")

      }

    })
  }
  return <div className="auth w-full h-screen flex flex-wrap">
    <div className="background-auth w-full lg:w-2/5 xl:w-2/4 h-1/5 sm:h-2/5 lg:h-full flex items-center justify-center">
      <img className="w-full xl:w-4/5 h-full xl:h-4/5 object-contain" src="https://raw.githubusercontent.com/dphasst17/techWEB/main/src/Pages/Login/ImageLogin/icon_login.png" />
    </div>
    <div className="authForm w-full lg:w-3/5 xl:w-2/4 h-4/5 sm:h-3/5 lg:h-full flex items-center justify-center">
      {formName === "signIn" && <SignIn handleAuth={handleAuth} setFormName={setFormName} />}
      {formName === "signUp" && <SignUp handleAuth={handleAuth} setFormName={setFormName} />}
      {formName === "forgot" && <Forgot handleAuth={handleAuth} setFormName={setFormName} />}
    </div>
  </div>
}

export default Auth