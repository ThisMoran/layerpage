import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { search_svg, sun } from '../images'
import { Context } from '../index'
import { ThemeContext, themes } from '../store/ThemeContext';
import { HOME_ROUTE, TERMS_ROUTE, USER_ACCOUNT_ROUTE, USER_SETTINGS_ROUTE } from '../utils/consts'

const RightMenu = () => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme-color') === 'white-content' ? false : true)

  const logOut = () => {
    user.setUser({})
    localStorage.removeItem('token')
    window.location.href = HOME_ROUTE
  }

  const searchUser = (e) => {
    e.preventDefault()
    navigate(HOME_ROUTE + searchValue)
    navigate(0)
  }

  return (
    <div>
      {user.isAuth &&
        <div className="hidden lg:flex bg-side border-l border-EA h-full w-40">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-2.5 w-full p-5">
              <button className="border border-EA rounded py-2 font-semibold" onClick={() => navigate(USER_ACCOUNT_ROUTE)}>Layer</button>
              <button className="border border-EA rounded py-2 font-semibold" onClick={() => navigate(USER_SETTINGS_ROUTE)}>Settings</button>
              <button className="border border-[#EAC5C3] rounded py-2 text-[#E1655C] font-semibold" onClick={logOut}>Sign out</button>
            </div>

            <div className="w-full">
              <div className="p-5">
                <form className="relative block" onSubmit={searchUser}>
                  <input className="placeholder:text-[#67743D] block w-full border border-[#67743D] rounded-md py-2 pr-9 pl-3 focus:outline-none text-xs" placeholder="@finduser" type="text" name="search" onChange={e => setSearchValue(e.target.value)} />
                  <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-2"><img src={search_svg} /></button>
                </form>
              </div>
              <div className="flex flex-col border-t border-EA px-5 py-5 pb-6 space-y-5">
                <ThemeContext.Consumer>
                  {({ changeTheme }) => (
                    <button
                      color="link"
                      onClick={() => {
                        setDarkMode(!darkMode);
                        changeTheme(darkMode ? themes.light : themes.dark);
                      }}
                    >
                      <img src={sun} className="ml-auto" />
                    </button>
                  )}
                </ThemeContext.Consumer>
                <p className="text-[#645F5B] text-xs text-right cursor-pointer" onClick={() => navigate(TERMS_ROUTE)}>Privacy and terms</p>
                <p className="text-[#645F5B] text-xs font-extralight text-right">© Layerpage</p>
              </div>
            </div>
          </div>
        </div>
      }

      {!user.isAuth &&
        <div className="hidden lg:flex bg-side border-l border-EA h-full items-end w-40">
          <div className="w-full">
            <div className="p-5">
              <form className="relative block" onSubmit={searchUser}>
                <input className="placeholder:text-[#67743D] block w-full border border-[#67743D] rounded-md py-2 pr-9 pl-3 focus:outline-none text-xs" placeholder="@finduser" type="text" name="search" onChange={e => setSearchValue(e.target.value)} />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-2"><img src={search_svg} /></button>
              </form>
            </div>
            <div className="flex flex-col border-t border-EA px-5 py-5 pb-6 space-y-5">
              <ThemeContext.Consumer>
                {({ changeTheme }) => (
                  <button
                    color="link"
                    onClick={() => {
                      setDarkMode(!darkMode);
                      changeTheme(darkMode ? themes.light : themes.dark);
                    }}
                  >
                    <img src={sun} className="ml-auto" />
                  </button>
                )}
              </ThemeContext.Consumer>
              <p className="text-[#645F5B] text-xs text-right cursor-pointer" onClick={() => navigate(TERMS_ROUTE)}>Privacy and terms</p>
              <p className="text-[#645F5B] text-xs font-extralight text-right">© Layerpage</p>
            </div>
          </div>
        </div>
      }

      <div className="fixed bottom-0 right-0 p-5 block lg:hidden">
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <button
              color="link"
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            >
              <img src={sun} />
            </button>
          )}
        </ThemeContext.Consumer>
      </div>
    </div>
  )
}

export default RightMenu