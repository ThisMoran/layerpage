import { useEffect, useState } from "react"
import { deleteConnect, getConnections } from "../../http/userApi"
import { plus_svg } from "../../images"

const GithubConnection = () => {
  const [connectGithub, setConnectGithub] = useState(false)
  const [connectedAPI, setConnectedAPI] = useState(false)

  const clientId = "278ebeee654546b331c5"

  useEffect(() => {
    getConnections().then(data => {
      setConnectedAPI(data.length)
      for (let info of data) {
        if (info.service === 'github') setConnectGithub(true)
      }
    })
  })

  const addGithub = () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + clientId + "&scope=user")
  }

  const deleteGithub = async () => {
    const deleteThis = window.confirm("Unlink profile?")
    if (deleteThis) {
      const data = await deleteConnect('github')
      setConnectGithub(false)
    }
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="border-b w-full max-w-[500px]">
        <p className="text-[#645F5B] p-2.5">Github</p>
      </div>
      <div className="flex cursor-pointer">
        {!connectGithub &&
          <img src={plus_svg} onClick={addGithub} />
        }
        {connectGithub &&
          <>
            {connectedAPI > 1 &&
              <div className="flex items-center p-2.5 border border-[#EAEAEA] rounded cursor-pointer" onClick={deleteGithub}>
                <span className="font-semibold text-[#645F5B]">Remove</span>
              </div>
            }
            {connectedAPI <= 1 &&
              <div className="flex items-center p-2.5 border border-[#EAEAEA] rounded cursor-not-allowed">
                <span className="font-semibold text-[#645F5B]">Remove</span>
              </div>
            }
          </>
        }
      </div>
    </div>
  )
}

export default GithubConnection
