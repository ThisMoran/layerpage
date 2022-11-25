import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { arrow_svg, logo, search_svg, sun } from "../images/index"
import RightMenu from '../components/RightMenu'
import Header from '../components/Header'
import GoogleAuth from '../components/Authorization/Google'
import GithubAuth from '../components/Authorization/Github'
import { HOME_ROUTE, USER_ACCOUNT_ROUTE } from '../utils/consts'
import { ThemeContext, themes } from '../store/ThemeContext';
import { GithubOAuth } from '../http/userApi'

ReactModal.setAppElement('#root')

const Home = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [showModalAccounts, setShowModalAccounts] = useState(false)
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme-color') === 'white-content' ? false : true)
  const [authState, setAuthState] = useState(false)

  const searchUser = (e) => {
    e.preventDefault()
    navigate(HOME_ROUTE + searchValue)
    navigate(0)
  }

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get('code')
    if (codeParam) setAuthState(true)
    GithubOAuth(codeParam).then(data => {
      if (data.id) window.location.href = USER_ACCOUNT_ROUTE
    })
  }, [])

  return (
    <main className="flex flex-col justify-between h-screen bg-white dark:bg-[#1A1919]">

      {authState &&
        <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-white dark:bg-[#1A1919] z-10">
          <p>Loading...</p>
        </div>
      }

      <Header />

      <div className="flex justify-between h-full bg-white dark:bg-[#1A1919]">
        <div className="w-full">
          <div className="flex flex-col justify-between container max-w-5xl px-5 mx-auto h-full">

            <div className="hidden lg:flex my-12 space-x-2 items-center">
              <span className="text-[#645F5B] dark:text-[#FFFFFF]">Home</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between lg:space-x-10 space-y-10 lg:space-y-0 mt-10">
              <div className="border-t border-EA w-full">
                <p className="mt-5 text-[#645F5B] dark:text-[#FFFFFF] text-xl font-semibold">Your simplified web-based interactive layer.</p>
                <h1 className="mt-10 text-3xl font-semibold dark:text-[#FFFFFF]">Layerpage™</h1>
              </div>
              <div className="w-full">
                <div className="border-t border-EA py-5">
                  <p className="text=[#645F5B] dark:text-[#FFFFFF]">Sign up or in with a connected account.</p>
                </div>
                <div className="border-t border-EA py-5">
                  <p className="text=[#645F5B] dark:text-[#FFFFFF]">Send or receive messages while keeping your email private.</p>
                </div>
                <div className="border-t border-EA py-5">
                  <p className="text=[#645F5B] dark:text-[#FFFFFF]">View them here or forward them to your email.</p>
                </div>
                <div className="border-t border-EA py-5">
                  <p className="text=[#645F5B] dark:text-[#FFFFFF]">Share your unique layer.page/URL as your own.</p>
                </div>
                <div className="border-t border-EA py-5">
                  <p className="text=[#645F5B] dark:text-[#FFFFFF]">Adjust your privacy settings.</p>
                </div>
              </div>
            </div>

            {user.isAuth && <div></div>}

            {!user.isAuth &&
              <div>
                <div className="flex justify-start relative lg:justify-between items-end lg:items-start border-t border-EA pt-4 mb-6">
                  <div className="flex flex-col justify-between">
                    <p className="text-xl text-[#645F5B] dark:text-[#FFFFFF]">Sign <span className="italic text-[#645F5B] dark:text-[#FFFFFF]">up</span> or<br /> <span className="italic text-[#645F5B] dark:text-[#FFFFFF]">in</span> with:</p>
                    <img src={arrow_svg} className="w-8 h-8" />
                  </div>

                  <div className="hidden lg:flex justify-between space-x-5">
                    <GithubAuth />
                    {/* <div className="border p-8 rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer">
                      <img src={discord_logo} />
                    </div>
                    <div className="border p-8 rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer">
                      <img src={twitter_logo} />
                    </div>
                    <div className="border p-8 rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer">
                      <img src={apple_logo} />
                    </div>
                    <div className="border p-8 rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer">
                      <img src={microsoft_logo} />
                    </div>
                    <div className="border p-8 rounded-xl hover:bg-[#E8E7E3]/40 duration-300 ease-in-out cursor-pointer">
                      <img src={amazon_logo} />
                    </div> */}
                    <GoogleAuth />
                  </div>

                  <div className="absolute flex lg:hidden left-0 right-0">
                    <div className="mx-auto px-7 py-2.5 text-[#645F5B] dark:text-[#FFFFFF] border border-[#645F5B] rounded-full" onClick={() => setShowModalAccounts(true)}>Accounts</div>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>

        <RightMenu />

      </div>

      <ReactModal isOpen={showModalAccounts} onRequestClose={() => setShowModalAccounts(false)} closeTimeoutMS={300} overlayClassName="fixed top-0 bottom-0 left-0 right-0 bg-white dark:bg-[#1A1919]" className="fixed bottom-0 w-full h-full bg-white dark:bg-[#1A1919] pb-10 outline-none">
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between border-b border-EA">
            <div className="flex justify-between w-full bg-white dark:bg-[#1A1919]">
              <img src={logo} className="p-5 cursor-pointer" />
            </div>
            <div className="flex lg:bg-side lg:border-l border-EA w-40">
              <div className="flex justify-end mr-5 lg:mr-0 lg:justify-center space-x-1 items-center w-40" onClick={() => setShowModalAccounts(false)}>
                <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
                <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
                <span className="block w-2.5 h-2.5 bg-dots rounded-full"></span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 space-y-5">
            <GithubAuth />
            <GoogleAuth />
          </div>
          <div className="flex justify-between px-5">
            <div></div>
            <form className="relative block" onSubmit={searchUser}>
              <input className="placeholder:text-[#67743D] bg-transparent block w-full border border-[#67743D] dark:text-[#FFFFFF] dark:placeholder-[#FFFFFF] rounded-md py-2 pr-9 pl-3 focus:outline-none text-xs" placeholder="@finduser" type="text" name="search" onChange={e => setSearchValue(e.target.value)} />
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
                >
                  <img src={sun} />
                </button>
              )}
            </ThemeContext.Consumer>
          </div>
        </div>
      </ReactModal>

    </main >
  )
})

export default Home