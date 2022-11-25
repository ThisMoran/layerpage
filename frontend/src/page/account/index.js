import React, { useContext, useEffect, useState } from 'react'
import { addLink, getInfo } from '../../http/userApi'
import { useNavigate } from 'react-router-dom'
import { Context } from "../../index"
import { add_svg, avatar_svg, check_svg, delete_svg, sun } from "../../images/index"
import RightMenu from '../../components/RightMenu'
import Header from '../../components/Header'
import { getMessages } from '../../http/messageApi'
import MessagesList from '../../components/MessagesList'
import LinksList from '../../components/LinksList'
import { observer } from 'mobx-react-lite'


export const Account = observer(() => {
  const { user, messages, links } = useContext(Context)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [avatar, setAvatar] = useState(null)
  const [title, setTitle] = useState()
  const [link, setLink] = useState()
  const [createLinkForm, setCreateLinkForm] = useState(false)

  useEffect(() => {
    getInfo().then(data => {
      links.setLinks(data.links)
      setUserInfo(data)
      setAvatar(data.avatar ? data.avatar : null)
      getMessages().then(data => messages.setMessages(data))
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>Loading…</div>
  }

  const createLink = async (e) => {
    e.preventDefault()
    await addLink(title, link)
    setTitle(null)
    setLink(null)
    await getInfo().then(data => {
      links.setLinks(data.links)
      setCreateLinkForm(false)
    })
  }

  const cancelCreateLink = () => {
    setTitle(null)
    setLink(null)
    setCreateLinkForm(false)
  }


  return (
    <main className="flex flex-col justify-between h-screen dark:bg-[#1A1919]">

      <Header />

      <div className="flex justify-between lg:border-b border-EA h-full">
        <div className="w-full">
          <div className="flex flex-col container max-w-5xl px-5 mx-auto h-full">

            <div className="hidden lg:flex my-12 space-x-2 items-center">
              <span className="text-[#645F5B] dark:text-[#FFFFFF]">Layer</span>
              <span className="block w-1.5 h-1.5 bg-EA rounded-full"></span>
              <span className="text-[#645F5B] dark:text-[#FFFFFF]">@[{userInfo.username}]</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between lg:space-x-10">
              <div className="border-t border-EA flex-1 w-96">

                <div className="flex justify-between mt-10">
                  <p className="text-[#645F5B] dark:text-[#FFFFFF] text-xl font-semibold">@[{userInfo.username}]</p>
                  <img src={avatar ? process.env.REACT_APP_API_URL + avatar : avatar_svg} className="w-[60px] h-[60px] rounded-full" />
                </div>

                <div className="flex justify-between mt-10">
                  <textarea className="bg-transparent border border-EA rounded focus:outline-none h-20 w-full resize-none p-2.5 dark:text-[#FFFFFF]" value={userInfo.bio ? userInfo.bio : ''} placeholder="Welcome to my layer." readOnly={true} />
                </div>

                <LinksList />

                <div className='flex flex-col space-y-2.5'>

                  <form className={createLinkForm ? "w-full p-2.5 bg-[#D3D3D3]/40 rounded flex flex-col justify-between" : "hidden"} onSubmit={createLink}>
                    <div className="flex justify-between">
                      <input type="text" className='bg-transparent text-[#645F5B] dark:text-[#FFFFFF] font-semibold outline-0 w-full' onChange={e => setTitle(e.target.value)} value={title ? title : ''} placeholder='[Link title]' />
                    </div>
                    <input type="text" className='mt-1.5 mb-3 bg-transparent text-[#645F5B] dark:text-[#FFFFFF] font-semibold outline-0 w-full' onChange={e => setLink(e.target.value)} value={link ? link : ''} placeholder='[URL]' />
                    <div className="flex justify-start space-x-2">
                      <button type="submit" className="flex justify-between items-center space-x-1.5 border border-[#5FC650] text-[#5FC650] font-semibold px-3 py-1.5 rounded cursor-pointer">
                        <span>Save</span>
                        <img src={check_svg} />
                      </button>
                      <span className="border border-white text-[#645F5B] dark:text-[#FFFFFF] font-semibold px-3 py-1.5 rounded cursor-pointer" onClick={() => cancelCreateLink()}>Cancel</span>
                    </div>
                  </form>

                  {!createLinkForm &&
                    <div className="w-full p-2.5 border border-[#F4F3F3] rounded flex justify-between" onClick={() => setCreateLinkForm(true)}>
                      <span></span>
                      <img src={add_svg} className="cursor-pointer" />
                    </div>
                  }
                </div>

              </div>
              <div className='flex-1 w-96'>
                <MessagesList />
              </div>
            </div>

          </div>
        </div>

        <RightMenu />

      </div>

      {/* Смена темы */}
      <div className="fixed bottom-0 right-0 p-5 block lg:hidden">
        <span><img src={sun} /></span>
      </div>
    </main>
  )
})

export default Account