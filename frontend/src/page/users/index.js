import React, { useContext, useEffect, useState } from 'react'
import { avatar_svg, enter_png, link_svg, logo, search_svg, sun, tickbox_png } from "../../images/index"
import RightMenu from '../../components/RightMenu'
import Header from '../../components/Header'
import { getLayerInfo } from '../../http/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../index'
import { HOME_ROUTE, USER_ACCOUNT_ROUTE } from '../../utils/consts'
import { createMessage, createUnauthMessage } from '../../http/messageApi'
import LinksList from '../../components/LinksList'
import ReactModal from 'react-modal'
import GithubAuth from '../../components/Authorization/Github'
import GoogleAuth from '../../components/Authorization/Google'
import { ThemeContext, themes } from '../../store/ThemeContext';

export const UserLayer = () => {
  const { id } = useParams()
  const { user, links } = useContext(Context)
  const [userInfo, setUserInfo] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [fromEmail, setFromEmail] = useState(null)
  const [fromName, setFromName] = useState(null)
  const [messageBody, setMessageBody] = useState(null)
  const [showModalMobile, setShowModalMobile] = useState(false)
  const [showModalPC, setShowModalPC] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme-color') === 'white-content' ? false : true)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  if (user.user.username === id) {
    navigate(USER_ACCOUNT_ROUTE)
  }

  useEffect(() => {
    getLayerInfo(id).then(data => {
      if (data) {
        setUserInfo(data)
        links.setLinks(data.links)
        setAvatar(data.avatar ? data.avatar : null)
      }
    }).finally(() => setLoading(false))
  }, [])

  const sendMessage = async () => {
    await createMessage(userInfo.username, messageBody)
    setMessageBody("")
    alert("Message sent")
  }

  const sendUnauthMessage = async () => {
    const data = await createUnauthMessage(fromEmail, userInfo.username, messageBody)
    setFromEmail('')
    setFromName('')
    alert('Message sent successfully')
  }

  const searchUser = (e) => {
    e.preventDefault()
    navigate(HOME_ROUTE + searchValue)
    navigate(0)
  }

  if (loading) {
    return <div>Loading…</div>
  }

  return (
    <main className="flex flex-col justify-between h-screen dark:bg-[#1A1919]">

      <Header />

      <div className="flex justify-between lg:border-b border-EA h-full">
        <div className="w-full">
          <div className="flex flex-col container max-w-5xl px-5 mx-auto h-full">
            {userInfo &&
              <>
                <div className="hidden lg:flex my-12 space-x-2 items-center">
                  <span className="text-[#645F5B] dark:text-[#FFFFFF] ">Home</span>
                  <span className="block w-1.5 h-1.5 bg-EA rounded-full"></span>
                  <span className="text-[#645F5B] dark:text-[#FFFFFF] ">Bio</span>
                </div>

                <div className="flex flex-col lg:flex-row justify-between lg:space-x-10">
                  <div className="border-t border-EA w-full">

                    <div className="flex justify-between mt-10">
                      <p className="text-[#645F5B] dark:text-[#FFFFFF]  text-xl font-semibold">@[{userInfo.username}]</p>
                      <img src={avatar ? process.env.REACT_APP_API_URL + avatar : avatar_svg} className="w-[60px] h-[60px] rounded-full" />
                    </div>

                    {userInfo.bio &&
                      <div className="flex justify-between mt-10">
                        <textarea className="bg-transparent	border border-EA rounded focus:outline-none h-20 w-full resize-none p-2.5 dark:text-[#FFFFFF]" value={userInfo.bio} readOnly={true} />
                      </div>
                    }

                    <LinksList />

                  </div>
                  <div className="w-full">
                    <div className="flex justify-center mb-2.5 items-center mt-20 lg:mt-0 cursor-pointer">
                      {!user.isAuth &&
                        <>
                          <div className='flex justify-between items-center space-x-1.5 text-[#589ED5] font-semibold border border-[#589ED5] px-2.5 py-1.5 rounded lg:hidden' onClick={() => setShowModalMobile(true)}>
                            <span>Connect an account to leave a message</span>
                            <span><img src={enter_png} /></span>
                          </div>
                          <div className='hidden lg:flex justify-between items-center space-x-1.5 text-[#589ED5] font-semibold border border-[#589ED5] px-2.5 py-1.5 rounded' onClick={() => setShowModalPC(true)}>
                            <span>Connect an account to leave a message</span>
                            <span><img src={enter_png} /></span>
                          </div>
                        </>
                      }

                      {user.isAuth &&
                        <div className='flex justify-between items-center space-x-1.5 text-[#53A258] font-semibold border border-[#53A258] px-2.5 py-1.5 rounded'>
                          <span>Signed in</span>
                          <span><img src={tickbox_png} /></span>
                        </div>
                      }
                    </div>

                    {user.isAuth &&
                      <div className="flex justify-between items-center space-x-2.5 my-5">
                        <span className='w-full border-b border-EA'></span>
                        <span className='text-[#D9D9D9]'>or</span>
                        <span className='w-full border-b border-EA'></span>
                      </div>
                    }

                    <div className="flex flex-col space-y-2.5 pb-16">
                      {!user.isAuth &&
                        <div className="flex justify-between space-x-5">
                          <input type="text" className="w-full outline-0 border border-[#E8E7E366] bg-[#D6D6D633] rounded text-[#645F5B] dark:text-[#FFFFFF] p-2.5" placeholder="Name" onChange={e => setFromName(e.target.value)} value={fromName ? fromName : ""} />
                          <input type="email" className="w-full outline-0 border border-[#E8E7E366] bg-[#D6D6D633] rounded text-[#645F5B] dark:text-[#FFFFFF] p-2.5" placeholder="Email" onChange={e => setFromEmail(e.target.value)} value={fromEmail ? fromEmail : ""} />
                        </div>
                      }

                      {user.isAuth &&
                        <div className="flex justify-between space-x-5">
                          <input type="text" className="w-full outline-0 border border-[#E8E7E366] bg-[#D6D6D633] rounded text-[#645F5B] dark:text-[#FFFFFF] p-2.5" value={user.user.username} readOnly={true} />
                        </div>
                      }
                      <textarea className="w-full outline-0 border border-[#E8E7E366] bg-[#D6D6D633] rounded text-[#645F5B] dark:text-[#FFFFFF] p-2.5 resize-none h-[300px]" onChange={e => setMessageBody(e.target.value)} value={messageBody ? messageBody : ""} placeholder="Message" />
                      {user.isAuth && <button className="bg-[#67743D] text-[#FFF] rounded py-2" onClick={sendMessage}>Send</button>}
                      {!user.isAuth && <button className="bg-[#67743D] text-[#FFF] rounded py-2" onClick={sendUnauthMessage}>Send</button>}


                    </div>

                  </div>
                </div>
              </>
            }

            {!userInfo &&
              <h1 className="mt-5 text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">User not found.</h1>
            }

          </div>
        </div>

        <RightMenu />

      </div>

      <ReactModal isOpen={showModalMobile} onRequestClose={() => setShowModalMobile(false)} closeTimeoutMS={300} overlayClassName="fixed top-0 bottom-0 left-0 right-0 bg-white dark:bg-[#1A1919]" className="fixed bottom-0 w-full h-full bg-white dark:bg-[#1A1919] pb-10 outline-none">
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between border-b border-EA">
            <div className="flex justify-between w-full bg-white dark:bg-[#1A1919]">
              <img src={logo} className="p-5 cursor-pointer" />
            </div>
            <div className="flex lg:bg-side lg:border-l border-EA w-40">
              <div className="flex justify-end mr-5 lg:mr-0 lg:justify-center space-x-1 items-center w-40" onClick={() => setShowModalMobile(false)}>
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

      <ReactModal isOpen={showModalPC} onRequestClose={() => setShowModalPC(false)} closeTimeoutMS={300} overlayClassName="fixed top-0 bottom-0 left-0 right-0 bg-white dark:bg-[#1A1919]" className="fixed bottom-0 w-full h-full bg-white dark:bg-[#1A1919] pb-10 outline-none">
        <div className="flex flex-col h-full justify-between items-center">
          <div></div>
          <div className="flex flex-col mt-5 space-y-5">
            <GithubAuth />
            <GoogleAuth />
          </div>
          <div className="flex justify-center items-center">
            <button className="text-[#589ED5] font-semibold border border-[#589ED5] px-2.5 py-1.5 rounded" onClick={() => setShowModalPC(false)}>Close</button>
          </div>
        </div>
      </ReactModal>

    </main>
  )
}

export default UserLayer