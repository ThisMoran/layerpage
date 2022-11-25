import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import { observer } from "mobx-react-lite"
import { Context } from "./index"
import { check } from "./http/userApi"

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>Loading…</div>
  }

  if (!localStorage.getItem('theme-color')) {
    localStorage.setItem('theme-color', 'light')
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
