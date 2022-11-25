import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "../index"
import LinkItem from "./LinkItem"

const LinksList = observer(() => {
  const { user, links } = useContext(Context)

  return (
    <div className="flex flex-col justify-between space-y-2.5 mt-10 mb-5">

      {links.links.map((link, i) =>
        <LinkItem
          key={link.id}
          onDelete={() => { links.removeLink(link.id) }}
          onEdit={(newTitle, newLink) => { links.editLink(link.id, newTitle, newLink) }}
          userId={user.user.id}
          link={link} />
      )}

    </div>
  )
})

export default LinksList