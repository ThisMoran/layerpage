import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { deleteMessage, readMessage, starredMessage } from "../http/messageApi"
import { delete_svg, marker_star_svg, star_svg } from "../images"

const MessageItem = observer(({ userId, message, onDelete, onMark, onRead }) => {
  const navigate = useNavigate()
  const date = new Date(message.createdAt)
  const dateTime = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ", " + date.getDate() + " " + date.toLocaleString('en-US', { month: 'short' }) + " " + date.getFullYear()

  const destroyMessage = async () => {
    const data = await deleteMessage(message.id)
    onDelete()
    console.log(data)
  }

  const markMessage = async () => {
    const data = await starredMessage(message.id)
    onMark()
    console.log(data)
  }

  const openMessage = async () => {
    if (userId !== message.userId) {
      onRead()
      await readMessage(message.id)
    }
    alert(message.body)
  }

  return (
    <>
      {message.userId === userId &&
        <div className="border border-[#DAD7D4] bg-[#A5D7FF66] rounded p-2.5">
          <div className="flex justify-between">
            <h2 className="font-semibold dark:text-[#FFFFFF]">To: <span className="cursor-pointer" onClick={() => navigate("/" + message.to)}>@[{message.to}]</span></h2>
            <span className="text-[9px] dark:text-[#FFFFFF]">[{dateTime}]</span>
          </div>
          <div className="flex flex-col justify-between relative">
            <div className="w-auto h-7 transition duration-200 ease-in-out">
              <p className="truncate dark:text-[#FFFFFF]">{message.body}</p>
            </div>
            <span className="w-full text-center dark:text-[#FFFFFF]" onClick={() => openMessage()}>Open</span>
            <div className="absolute right-0 bottom-0 flex justify-between space-x-2.5">
              <div onClick={destroyMessage}><img src={delete_svg} className="cursor-pointer" /></div>
              <div onClick={markMessage}>
                {!message.SenderStarred &&
                  <img src={star_svg} className="cursor-pointer" />
                }
                {message.SenderStarred &&
                  <img src={marker_star_svg} className="cursor-pointer" />
                }
              </div>
            </div>
          </div>
        </div>
      }

      {message.userId !== userId &&
        <div className={message.status ? "border border-[#DAD7D4] rounded p-2.5" : "border border-[#DAD7D4] bg-[#D7E7A966] rounded p-2.5"}>
          <div className="flex justify-between">
            <h2 className="font-semibold dark:text-[#FFFFFF]">From: <span className="cursor-pointer" onClick={() => navigate("/" + message.from)}>@[{message.from}]</span></h2>
            <span className="text-[9px] dark:text-[#FFFFFF]">[{dateTime}]</span>
          </div>
          <div className="flex flex-col justify-between relative">
            <div className="w-auto h-7 transition duration-200 ease-in-out">
              <p className="truncate dark:text-[#FFFFFF]">{message.body}</p>
            </div>
            <span className="w-full text-center dark:text-[#FFFFFF]" onClick={() => openMessage()}>Open</span>
            <div className="absolute right-0 bottom-0 flex justify-between space-x-2.5">
              <div onClick={destroyMessage}><img src={delete_svg} className="cursor-pointer" /></div>
              <div onClick={markMessage}>
                {!message.ReceiverStarred &&
                  <img src={star_svg} className="cursor-pointer" />
                }
                {message.ReceiverStarred &&
                  <img src={marker_star_svg} className="cursor-pointer" />
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
})

export default MessageItem