import React, { useContext, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { account_arrow_svg, blank_page_svg, logo, search_svg, sun } from "../images"
import { DOCS_ROUTE, FEATURES_ROUTE, HELP_ROUTE, HOME_ROUTE, USER_ACCOUNT_ROUTE, USER_SETNAME_ROUTE, USER_SETTINGS_ROUTE } from '../utils/consts'
import { ThemeContext, themes } from '../store/ThemeContext';
import { Context } from '../index'
import { getInfo } from '../http/userApi'

ReactModal.setAppElement('#root')

const Header = () => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const [showModalMenu, setShowModalMenu] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme-color') === 'white-content' ? false : true)

  const searchUser = (e) => {
    e.preventDefault()
    navigate(HOME_ROUTE + searchValue)
    navigate(0)
  }

  const logOut = () => {
    user.setUser({})
    localStorage.removeItem('token')
    window.location.href = HOME_ROUTE
  }

  if (user._user.username === "" && window.location.pathname !== USER_SETNAME_ROUTE) {
    window.location.href = USER_SETNAME_ROUTE
  }
  return (
    <>
      <div className="flex justify-between border-b border-EA">
        <div className="flex justify-between w-full bg-white dark:bg-[#1A1919]">
          <img src={logo} className="p-5 cursor-pointer" onClick={() => navigate(HOME_ROUTE)} />
          <div className="hidden lg:flex space-x-5 items-center p-5">
            <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] dark:text-[#FFFFFF] font-semibold text-sm" onClick={() => navigate(FEATURES_ROUTE)}>Features</span>
            <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] dark:text-[#FFFFFF] font-semibold text-sm" onClick={() => navigate(HELP_ROUTE)}>Help</span>
            <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] dark:text-[#FFFFFF] font-semibold text-sm" onClick={() => navigate(DOCS_ROUTE)}>Docs</span>
          </div>
        </div>
        <div className="flex lg:bg-side lg:border-l border-EA w-40">
          <div className="flex justify-end mr-5 lg:mr-0 lg:justify-center space-x-1 items-center w-40" onClick={() => setShowModalMenu(true)}>
            <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
            <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
            <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
          </div>
        </div>
      </div>

      <ReactModal isOpen={showModalMenu} onRequestClose={() => setShowModalMenu(false)} closeTimeoutMS={300} overlayClassName="fixed flex-col top-0 bottom-0 left-0 right-0 bg-white dark:bg-[#1A1919]" className="fixed bottom-0 w-full h-full bg-[#FAF4EE] pb-10 outline-none">
        <div className="flex flex-col h-full justify-between">

          <div className="flex flex-col">
            <div className="flex justify-between border-b border-EA">
              <div className="flex justify-between w-full bg-white dark:bg-[#1A1919]">
                <img src={logo} className="p-5 cursor-pointer" />
              </div>
              <div className="flex lg:bg-side lg:border-l border-EA w-40 bg-white dark:bg-[#1A1919]">
                <div className="flex justify-end mr-5 lg:mr-0 lg:justify-center space-x-1 items-center w-40" onClick={() => setShowModalMenu(false)}>
                  <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
                  <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
                  <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
                </div>
              </div>
            </div>
            {!user.isAuth &&
              <div className="flex flex-col space-y-5 px-5 mt-5">
                <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] font-semibold text-sm" onClick={() => navigate(FEATURES_ROUTE)}>Features</span>
                <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] font-semibold text-sm" onClick={() => navigate(HELP_ROUTE)}>Help</span>
                <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] font-semibold text-sm" onClick={() => navigate(DOCS_ROUTE)}>Docs</span>
              </div>
            }

            {user.isAuth &&
              <div className="flex flex-col space-y-5 px-5 mt-5">
                <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] font-semibold text-sm" onClick={() => navigate(FEATURES_ROUTE)}>Features</span>
                <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] font-semibold text-sm" onClick={() => navigate(HELP_ROUTE)}>Help</span>
                <span className="py-2 px-7 border border-EA hover:bg-[#E8E7E3]/40 duration-300 ease-in-out rounded-full cursor-pointer text-[#645F5B] font-semibold text-sm" onClick={() => navigate(DOCS_ROUTE)}>Docs</span>
                <div className="border-b border-EA"></div>
                <div className="bg-white rounded-xl p-2.5">
                  <div className="flex justify-between">
                    <span><img src={blank_page_svg} /></span>
                    <span></span>
                  </div>
                </div>
                <button className="border border-EA rounded py-2 font-semibold" onClick={() => navigate(USER_ACCOUNT_ROUTE)}>Layer</button>
                <button className="border border-EA rounded py-2 font-semibold" onClick={() => navigate(USER_SETTINGS_ROUTE)}>Settings</button>
                <button className="border border-[#EAC5C3] rounded py-2 text-[#E1655C] font-semibold" onClick={logOut}>Sign out</button>
              </div>
            }
          </div>

          <div className="flex justify-between px-5">
            {user.isAuth &&
              <button className="flex items-center justify-center p-2.5 bg-EA rounded-lg">
                <img src={account_arrow_svg} />
              </button>
            }

            {!user.isAuth &&
              <div></div>
            }
            <form className="relative block" onSubmit={searchUser}>
              <input className="placeholder:text-[#67743D] bg-transparent block w-full border border-[#67743D] rounded-md py-2 pr-9 pl-3 focus:outline-none text-xs" placeholder="@finduser" type="text" name="search" onChange={e => setSearchValue(e.target.value)} />
              <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-2"><img src={search_svg} /></button>
            </form>
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <button
                  color="link"
                  onClick={() => {
                    setDarkMode(!darkMode);
                    changeTheme(darkMode ? themes.light : themes.dark);
                  }}
                  className="flex items-center justify-center p-1.5 bg-EA rounded-lg"
                >
                  <img src={sun} className="w-3/6" />
                </button>
              )}
            </ThemeContext.Consumer>
          </div>

        </div>
      </ReactModal>
    </>
  )
}

export default Header