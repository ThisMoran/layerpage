import React, { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import GithubConnection from '../../../components/Connections/Github';
import GoogleConnection from '../../../components/Connections/Google';
import { getConnections, getInfo, setEmail, setMailing } from '../../../http/userApi';
import { plus_svg } from '../../../images';

const SettingsConnections = () => {
  const [connectGithub, setConnectGithub] = useState(false)
  const [mailingStatus, setMailingStatus] = useState(false)
  const [emailState, setEmailState] = useState(false)
  const [newEmail, setNewEmail] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getInfo().then(data => {
      setUserInfo(data)
      setMailingStatus(data.mailing)
    }).finally(() => setLoading(false))
  }, [])

  const dropdownOptions = [
    'No', 'Yes'
  ]

  const onSelect = async (value) => {
    const status = dropdownOptions.indexOf(value)
    if (mailingStatus !== status) {
      const data = await setMailing(status)
      setMailingStatus(status)
    }
  }

  const changeUserEmail = async () => {
    await setEmail(newEmail)
    setEmailState(false)
  }

  if (loading) {
    return <div>Loading…</div>
  }

  return (
    <div className="border-t border-EA w-full mt-10 lg:mt-0 space-y-10">
      <h1 className="text-xl font-semibold text-[#645F5B] dark:text-[#FFFFFF] py-5">Connections</h1>
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col">
          <p className="text-[#645F5B] dark:text-[#FFFFFF]">Send me an email when I receive a message</p>
          <div className="flex flex-col lg:flex-row justify-between mt-5">
            <Dropdown
              className="w-[150px]"
              controlClassName="flex justify-between p-2.5 bg-[#EAEAEA] border-none rounded-md"
              placeholderClassName="font-semibold text-[#589ED5]"
              arrowClassName="dropdownArrow down"
              arrowClosed={<span className="dropdownArrow down" />}
              arrowOpen={<span className="dropdownArrow up" />}
              options={dropdownOptions}
              onChange={e => onSelect(e.value)}
              value={dropdownOptions[mailingStatus]} />
          </div>
          <div className="flex flex-col lg:flex-row justify-between mt-5">
            <div className="flex flex-col lg:flex-row justify-between mt-5 space-x-2.5">
              <input
                type="text"
                placeholder="Email address"
                className="outline-0 p-2.5 text-[#A09992] dark:text-[#FFFFFF] bg-[#D6D6D633] rounded-md border border-EA flex-[0.5_0_0%]"
                onChange={(e) => {
                  setNewEmail(e.target.value)
                  setEmailState(true)
                }}
                defaultValue={userInfo.distEmail}
              />
              {emailState &&
                <button className="border border-[#589ED5] text-[#589ED5] p-2.5 rounded" onClick={changeUserEmail}>Edit</button>
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-[#645F5B] dark:text-[#FFFFFF]">Connected accounts</p>
          <p className="text-sm text-[#645F5B] dark:text-[#FFFFFF]">Connecting an account requires for that account to have the same email so that we can authenticate you. At least one account is required for your layer to be active.</p>
          <div className="flex flex-col mt-5 space-y-2.5">
            <GoogleConnection />
            <GithubConnection />
          </div>
        </div>
      </div>

    </div>
  )
}

export default SettingsConnections