import { useNavigate } from "react-router-dom"
import Logo from "../assets/Logomark.png"
import FacebookIcon_2 from "../components/icon/facebookIcon_2"
import GoogleIcon_2 from "../components/icon/googleIcon_2"
const Footer = (): JSX.Element => {
  const navigate = useNavigate()
  return <footer className="w-full font-sans tracking-wide bg-[#242424] px-8 py-12 mt-10">
    <div className="flex flex-wrap items-center justify-evenly">
      <div className="w-full md:w-1/5">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className='w-20 mr-6' />
          <h1 className="font-bold text-[30px] cursor-pointer">Tech Store</h1>
        </div>

        <ul className="mt-10 flex space-x-5">
          <li>
            <GoogleIcon_2 />
          </li>
          <li>
            <FacebookIcon_2 />
          </li>
        </ul>
      </div>

      <div className="w-full md:w-[60%] flex flex-wrap content-start justify-evenly">
        <div>
          <h4 className="text-white font-semibold text-3xl relative max-sm:cursor-pointer">Product <svg
            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
            className="sm:hidden absolute right-0 top-1 fill-[#d6d6d6]" viewBox="0 0 24 24">
            <path
              d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
              data-name="16" data-original="#000000"></path>
          </svg>
          </h4>
          <ul className="space-y-5 mt-6 max-sm:hidden">
            <li>
              <p onClick={() => navigate('/faq')} className='hover:text-white text-gray-300 text-lg cursor-pointer'>FAQ</p>
            </li>
            <li>
              <p onClick={() => navigate('/post')} className='hover:text-white text-gray-300 text-lg cursor-pointer'>Blog</p>
            </li>
            <li>
              <p className='hover:text-white text-gray-300 text-lg cursor-pointer'>Support</p>
            </li>

          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-2xl relative max-sm:cursor-pointer">Company <svg
            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
            className="sm:hidden absolute right-0 top-1 fill-[#d6d6d6]" viewBox="0 0 24 24">
            <path
              d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
              data-name="16" data-original="#000000"></path>
          </svg>
          </h4>

          <ul className="space-y-5 mt-6 max-sm:hidden">
            <li>
              <p className='hover:text-white text-gray-300 text-lg cursor-pointer'>About us</p>
            </li>
            <li>
              <p className='hover:text-white text-gray-300 text-lg cursor-pointer'>Careers</p>
            </li>
            <li>
              <p onClick={() => navigate('/contact')} className='hover:text-white text-gray-300 text-lg cursor-pointer'>Contact Us</p>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-2xl relative max-sm:cursor-pointer">Category <svg
            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
            className="sm:hidden absolute right-0 top-1 fill-[#d6d6d6]" viewBox="0 0 24 24">
            <path
              d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
              data-name="16" data-original="#000000"></path>
          </svg>
          </h4>

          <ul className="space-y-5 mt-6 max-sm:hidden">
            <li>
              <p onClick={() => navigate('/')} className='hover:text-white text-gray-300 text-lg cursor-pointer'>Home</p>
            </li>
            <li>
              <p onClick={() => navigate('/product')} className='hover:text-white text-gray-300 text-lg cursor-pointer'>Product</p>
            </li>
            <li>
              <p className='hover:text-white text-gray-300 text-lg cursor-pointer'>Sitemap</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <hr className="my-10 border-gray-400" />

    <div className="flex flex-wrap justify-center">
      <p className='text-gray-300 text-sm flex'>
        Copyright © 2024<p className="hover:underline mx-1 cursor-pointer">Tech Store</p>. All Rights Reserved.
      </p>
    </div>
  </footer>
}

export default Footer