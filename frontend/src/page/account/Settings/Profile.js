import React, { useEffect, useState } from 'react'
import { changeUserAvatar, changeUsername, getInfo, saveUserBio } from '../../../http/userApi'
import { avatar_svg } from '../../../images'

const SettingsProfile = () => {

  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userBio, setUserBio] = useState(null)
  const [newUsername, setNewUsername] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [usernameState, setUsernameState] = useState(false)
  const [userbioState, setUserbioState] = useState(false)
  const [selectedImage, setSelectedImage] = useState()

  useEffect(() => {
    getInfo().then(data => {
      setUserInfo(data)
      setUserBio(data.bio)
      setAvatar(data.avatar ? data.avatar : null)
      setNewUsername(data.username)
    }).finally(() => setLoading(false))
  }, [])

  const changeUserUsername = async () => {
    const data = await changeUsername(newUsername)
    setUsernameState(false)
    console.log(data)
  }

  const saveBio = async () => {
    await saveUserBio(userBio)
    setUserbioState(false)
  }

  const returnBio = () => {
    if (userInfo.bio) {
      setUserBio(userInfo.bio)
    } else {
      setUserBio('')
    }
    setUserbioState(false)
  }

  const selectFile = async (e) => {
    setSelectedImage(e.target.files[0])
    let formData = new FormData()
    formData.append('img', e.target.files[0])
    const data = await changeUserAvatar(formData)
    console.log(data)
  }

  if (loading) {
    return <div>Loading…</div>
  }

  return (
    <div className="border-t border-EA w-full mt-10 lg:mt-0 space-y-10">
      <h1 className="text-xl font-semibold text-[#645F5B] dark:text-[#FFFFFF] py-5">Profile</h1>
      <div className="flex flex-col">
        <span className="dark:text-[#FFFFFF]">My username and URL extension</span>
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="flex">
            <span className="bg-EA p-2.5 rounded-l-lg text-[#A09992]">layer.page/</span>
            <input type="text" className="outline-0 p-2.5 text-[#A09992] dark:text-[#FFFFFF] bg-[#D6D6D633]" placeholder="username" onChange={(e) => {
              setNewUsername(e.target.value)
              setUsernameState(true)
            }
            } defaultValue={userInfo.username} />
          </div>
          <div className="block mt-5 lg:mt-0">
            {usernameState &&
              <button className="border border-[#589ED5] text-[#589ED5] p-2.5 rounded" onClick={changeUserUsername}>Edit</button>
            }
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className=" dark:text-[#FFFFFF]">Photo (JPEG or PNG)</span>
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="flex">
            <img src={selectedImage ? (URL.createObjectURL(selectedImage)) : (avatar ? process.env.REACT_APP_API_URL + avatar : avatar_svg)} className="w-[60px] h-[60px] rounded-full" />
          </div>
          <div className="block mt-5 lg:mt-0">
            <label htmlFor="file">
              <div className="border border-[#589ED5] text-[#589ED5] p-2.5 rounded cursor-pointer">Edit</div>
              <input id="file" name="file" type="file" onChange={selectFile} hidden={true} />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="dark:text-[#FFFFFF]">Bio</span>
        <div className="flex flex-col lg:flex-row justify-between mt-5 lg:space-x-5">
          <div className="flex w-[500px]">
            <textarea className="bg-transparent border border-[#589ED5] dark:text-[#FFFFFF] rounded w-full h-20 resize-none outline-0 p-2" onChange={(e) => {
              setUserBio(e.target.value)
              setUserbioState(true)
            }} value={userBio ? userBio : ''} placeholder="Write about yourself" />
          </div>
          <div className='flex'>
            {userbioState &&
              <div className="flex mt-5 lg:mt-0 space-x-5 items-end">
                <button className="dark:text-[#FFFFFF] border border-[#EAEAEA] text-[#645F5B] p-2.5 rounded" onClick={returnBio}>Cancel</button>
                <button className="border border-[#5FC650] text-[#5FC650] p-2.5 rounded" onClick={saveBio}>Save</button>
              </div>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default SettingsProfile