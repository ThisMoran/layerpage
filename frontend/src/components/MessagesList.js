import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { sort_svg } from "../images"
import { Context } from "../index"
import MessageItem from "./MessageItem"

const MessagesList = observer(() => {
  const { user, messages } = useContext(Context)
  const [orderBy, setOrderBy] = useState(false)
  const [msgFilter, setMsgFilter] = useState("all")

  function sortByIdThenName(a, b) {
    if (orderBy) {
      const n = a.createdAt - b.createdAt;
      return a.createdAt.localeCompare(b.createdAt);
    } else {
      const n = b.createdAt - a.createdAt;
      return b.createdAt.localeCompare(b.createdAt);
    }
  }

  return (
    <>
      <div className="flex justify-between mb-2.5 items-center mt-20 lg:mt-0 border-b border-EA py-2.5">
        <div className="flex justify-between space-x-2.5 items-center text-xs">
          <span className="border border-EA px-2.5 py-1 rounded-full font-semibold cursor-pointer dark:text-[#FFFFFF]" onClick={() => setMsgFilter('all')}>All</span>
          <span className="border border-[#67743D] text-[#67743D] px-2.5 py-1 rounded-full font-semibold cursor-pointer" onClick={() => setMsgFilter('unread')}>Unread</span>
          <span className="border border-[#D8A340] text-[#D8A340] px-2.5 py-1 rounded-full font-semibold cursor-pointer" onClick={() => setMsgFilter('starred')}>Starred</span>
          <span className="border border-[#589ED5] text-[#589ED5] px-2.5 py-1 rounded-full font-semibold cursor-pointer" onClick={() => setMsgFilter('sent')}>Sent</span>
        </div>
        <div className="hidden lg:flex items-center bg-EA rounded px-3 py-1.5 space-x-1.5 cursor-pointer" onClick={() => setOrderBy(!orderBy)}>
          <span>By date</span>
          <img src={sort_svg} className={orderBy ? "origin-center rotate-180 transition" : "origin-center rotate-0 transition"} />
        </div>
      </div>

      <div className="flex flex-col space-y-2.5 pb-16">
        <div className="flex flex-col space-y-2.5 pb-16">

          {/* All */}
          {msgFilter === "all" &&
            <>
              {messages.messages.slice().sort(sortByIdThenName).length === 0 &&
                <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">No letters</span>
              }
              {messages.messages.slice().sort(sortByIdThenName).map((message, i) =>
                <MessageItem
                  key={message.id}
                  onDelete={() => { messages.removeMessage(message.id) }}
                  onMark={() => { messages.markedMessage(message.id) }}
                  onRead={() => { messages.readThisMessage(message.id) }}
                  userId={user.user.id}
                  message={message} />
              )}
            </>
          }


          {/* Unread */}
          {msgFilter === "unread" &&
            <>
              {messages.messages.filter(msg => msg.status === false && msg.userId !== user.user.id).slice().sort(sortByIdThenName).length === 0 &&
                <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">The "Unread" tab is empty</span>
              }
              {messages.messages.filter(msg => msg.status === false && msg.userId !== user.user.id).slice().sort(sortByIdThenName).map(newMsg => (
                <MessageItem
                  key={newMsg.id}
                  onDelete={() => { messages.removeMessage(newMsg.id) }}
                  onMark={() => { messages.markedMessage(newMsg.id) }}
                  onRead={() => { messages.readThisMessage(newMsg.id) }}
                  userId={user.user.id}
                  message={newMsg} />
              ))}
            </>
          }

          {/* Starred */}
          {msgFilter === "starred" &&
            <>
              {messages.messages.filter(msg => msg.SenderStarred === true && msg.userId === user.user.id || msg.ReceiverStarred === true && msg.userId !== user.user.id).slice().sort(sortByIdThenName).length === 0 &&
                <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">The "Starred" tab is empty</span>
              }
              {messages.messages.filter(msg => msg.SenderStarred === true && msg.userId === user.user.id || msg.ReceiverStarred === true && msg.userId !== user.user.id).slice().sort(sortByIdThenName).map(newMsg => (
                <MessageItem
                  key={newMsg.id}
                  onDelete={() => { messages.removeMessage(newMsg.id) }}
                  onMark={() => { messages.markedMessage(newMsg.id) }}
                  onRead={() => { messages.readThisMessage(newMsg.id) }}
                  userId={user.user.id}
                  message={newMsg} />
              ))}
            </>
          }

          {/* Sent */}
          {msgFilter === "sent" &&
            <>
              {messages.messages.filter(msg => msg.from === user.user.username).slice().sort(sortByIdThenName).length === 0 &&
                <span className="text-center text-xl text-[#645F5B] dark:text-[#FFFFFF] font-semibold">The "Sent" tab is empty</span>
              }
              {messages.messages.filter(msg => msg.from === user.user.username).slice().sort(sortByIdThenName).map(newMsg => (
                <MessageItem
                  key={newMsg.id}
                  onDelete={() => { messages.removeMessage(newMsg.id) }}
                  onMark={() => { messages.markedMessage(newMsg.id) }}
                  onRead={() => { messages.readThisMessage(newMsg.id) }}
                  userId={user.user.id}
                  message={newMsg} />
              ))}
            </>
          }
        </div>
      </div>
    </>
  )
})

export default MessagesList