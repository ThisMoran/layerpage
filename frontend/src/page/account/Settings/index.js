import React, { useEffect, useState } from 'react'
import { sun } from "../../../images/index"
import RightMenu from '../../../components/RightMenu'
import Header from '../../../components/Header'
import SettingsProfile from './Profile'
import SettingsConnections from './Connections'
import { GithubConnect } from '../../../http/userApi'

const AccountSettings = () => {
  const [layer, setLayer] = useState("profile")
  const [connectState, setConnectState] = useState(false)

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get('code')
    if (codeParam) setConnectState(true)
    GithubConnect(codeParam).then(data => {
      alert(data.message)
    }).finally(() => setConnectState(false))
  }, [])

  return (
    <main className="flex flex-col justify-between h-screen dark:bg-[#1A1919]">

      {connectState &&
        <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-white dark:bg-[#1A1919] z-10">
          <p>Loading...</p>
        </div>
      }

      <Header />

      <div className="flex justify-between lg:border-b border-EA h-full">
        <div className="w-full">
          <div className="flex flex-col container max-w-5xl px-5 mx-auto h-full">

            <div className="hidden lg:flex my-12 space-x-2 items-center">
              <span className="text-[#645F5B] dark:text-[#FFFFFF]">Layer</span>
              <span className="block w-1.5 h-1.5 bg-EA rounded-full"></span>
              <span className="text-[#645F5B] dark:text-[#FFFFFF]">Settings</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between lg:space-x-10">
              <div className="hidden lg:flex flex-col space-y-2.5 w-80">
                <div className={layer === 'profile' ? "bg-[#D3D3D366] rounded cursor-pointer p-2.5" : "rounded cursor-pointer p-2.5"} onClick={() => setLayer("profile")}>
                  <span className="font-semibold text-[#645F5B] dark:text-[#FFFFFF]">Profile</span>
                </div>

                <div className={layer === 'connections' ? "bg-[#D3D3D366] rounded cursor-pointer p-2.5" : "rounded cursor-pointer p-2.5"} onClick={() => setLayer("connections")}>
                  <span className="font-semibold text-[#645F5B] dark:text-[#FFFFFF]">Connections</span>
                </div>

                <div className={layer === 'system' ? "bg-[#D3D3D366] rounded cursor-pointer p-2.5" : "rounded cursor-pointer p-2.5"} onClick={() => setLayer("system")}>
                  <span className="font-semibold text-[#645F5B] dark:text-[#FFFFFF]">System</span>
                </div>
              </div>

              {layer === "profile" && <SettingsProfile />}
              {layer === "connections" && <SettingsConnections />}
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
}

export default AccountSettings