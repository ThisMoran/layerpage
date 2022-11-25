import React, { useContext, useEffect, useState } from 'react'
import { sun } from "../../images/index"
import { changeUsername, getInfo } from '../../http/userApi'
import RightMenu from '../../components/RightMenu'
import Header from '../../components/Header'
import { USER_ACCOUNT_ROUTE } from '../../utils/consts'

const AccountUsername = () => {
  const [usernameState, setUsernameState] = useState(false)
  const [username, setUsername] = useState(null)

  const changeUserUsername = async () => {
    await changeUsername(username).finally(() => {
      window.location.href = USER_ACCOUNT_ROUTE
    })
  }

  return (
    <main className="flex flex-col justify-between h-screen">

      <Header />

      <div className="flex justify-between lg:border-b border-EA h-full">
        <div className="w-full">
          <div className="flex flex-col container max-w-5xl px-5 mx-auto h-full">

            <div className="hidden lg:flex my-12 space-x-2 items-center">
              <span className="text-[#645F5B]">Account connected</span>
              <span className="block w-1.5 h-1.5 bg-EA rounded-full"></span>
              <span className="text-[#645F5B]">Set a username</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between lg:space-x-10">
              <div className="border-t border-EA w-full mt-10 lg:mt-0 space-y-10">
                <h1 className="text-xl font-semibold text-[#645F5B] py-5">Set your username</h1>
                <div className="flex flex-col">
                  <span>My username and URL extension</span>
                  <div className="flex flex-col justify-between mt-5 space-y-5">
                    <div className="flex">
                      <span className="bg-EA p-2.5 rounded-l-lg text-[#A09992]">layer.page/</span>
                      <input type="text" className="outline-0 p-2.5 text-[#A09992] bg-[#D6D6D633]" placeholder="username" onChange={(e) => {
                        setUsername(e.target.value)
                        setUsernameState(true)
                      }
                      } />
                    </div>
                    {usernameState &&
                      <div className="block mt-5 lg:mt-0">
                        <button className="border border-[#5FC650] text-[#5FC650] p-2.5 rounded" onClick={changeUserUsername}>Confirm username</button>
                      </div>
                    }
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <RightMenu />

      </div>

    </main>
  )
}

export default AccountUsername