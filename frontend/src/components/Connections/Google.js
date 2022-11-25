import { useEffect, useState } from "react"
import { gapi } from 'gapi-script'
import GoogleLogin from "react-google-login"
import { deleteConnect, getConnections, GoogleConnect } from "../../http/userApi"
import { plus_svg } from "../../images"


const GoogleConnection = () => {
  const [connectGoogle, setConnectGoogle] = useState(false)
  const [connectedAPI, setConnectedAPI] = useState(false)
  const clientId = "175140570001-dj25gi29kfap835f9ll1429qpru28a4r.apps.googleusercontent.com"

  useEffect(() => {
    getConnections().then(data => {
      setConnectedAPI(data.length)
      for (let info of data) {
        if (info.service === 'google') setConnectGoogle(true)
      }
    })
  })

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })

  const addGoogle = async (res) => {
    const data = await GoogleConnect(res.profileObj.email, res.profileObj.googleId)
    if (data.status === 1) setConnectGoogle(true)
  }

  const deleteGoogle = async () => {
    const deleteThis = window.confirm("Unlink profile?")
    if (deleteThis) {
      const data = await deleteConnect('google')
      setConnectGoogle(false)
    }
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="border-b w-full max-w-[500px]">
        <p className="text-[#645F5B] p-2.5">Google</p>
      </div>
      <div className="flex cursor-pointer">
        {!connectGoogle &&
          <div id="googleSignInButton" className="mx-auto">
            <GoogleLogin
              clientId={clientId}
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <img src={plus_svg} />
                </button>
              )}
              onSuccess={addGoogle}
              onFailure={addGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        }
        {connectGoogle &&
          <>
            {connectedAPI > 1 &&
              <div className="flex items-center p-2.5 border border-[#EAEAEA] rounded cursor-pointer" onClick={deleteGoogle}>
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

export default GoogleConnection