import { observer } from "mobx-react-lite"
import { useState } from "react"
import { deleteLink, editLink } from "../http/userApi"
import { check_svg, delete_svg, edit_svg } from "../images"

const LinkItem = observer(({ userId, link, onDelete, onEdit }) => {

  const [editList, setEditLink] = useState(false)
  const [title, setTitle] = useState()
  const [newLink, setNewLink] = useState()

  const removeLink = async () => {
    await deleteLink(link.id)
    onDelete()
  }

  const modifyLink = async (e) => {
    e.preventDefault()
    const data = await editLink(link.id, title, newLink)
    console.log(data)
    onEdit(title, newLink)
    setEditLink(false)
  }

  return (
    <>
      {userId === link.userId &&
        <>
          {!editList &&
            <div className="w-full p-2.5 bg-[#D3D3D3]/40 rounded flex justify-between">
              <a href={link.link} className="text-[#645F5B] font-semibold" target="_blank">{link.title}</a>
              <img src={edit_svg} className="cursor-pointer" onClick={() => setEditLink(true)} />
            </div>
          }
          {editList &&
            <form className="w-full p-2.5 bg-[#D3D3D3]/40 rounded flex flex-col justify-between" onSubmit={modifyLink}>
              <div className="flex justify-between">
                <input type="text" className='bg-transparent text-[#645F5B] font-semibold outline-0' defaultValue={link.title} onChange={e => setTitle(e.target.value)} placeholder='[Link title]' />
                <img src={delete_svg} className="cursor-pointer" onClick={() => removeLink()} />
              </div>
              <input type="text" className='mt-1.5 mb-3 bg-transparent text-[#645F5B] font-semibold outline-0' defaultValue={link.link} onChange={e => setNewLink(e.target.value)} placeholder='[URL]' />
              <div className="flex justify-start space-x-2">
                <button type="submit" className="flex justify-between items-center space-x-1.5 border border-[#5FC650] text-[#5FC650] font-semibold px-3 py-1.5 rounded cursor-pointer">
                  <span>Save</span>
                  <img src={check_svg} />
                </button>
                <span className="border border-white text-[#645F5B] font-semibold px-3 py-1.5 rounded cursor-pointer" onClick={() => setEditLink(false)}>Cancel</span>
              </div>
            </form>
          }
        </>
      }

      {userId !== link.userId &&
        <a href={link.link} div className="w-full p-2.5 bg-[#D3D3D3]/40 rounded flex justify-between">
          <span className="w-full text-[#645F5B] font-semibold" target="_blank">{link.title}</span>
        </a>
      }


    </>
  )
})

export default LinkItem