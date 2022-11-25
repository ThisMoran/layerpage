import React, { useContext } from "react"
import { Routes, Route } from 'react-router-dom'
import ERROR_404 from "../page/404"
import { Context } from '../index'
import { authRoutes, publicRoutes } from "../routes"

const AppRouter = () => {
  const { user } = useContext(Context)
  return (
    <Routes>
      <Route path="*" element={<ERROR_404 />} />
      {user.isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={Component} exact />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={Component} exact />
      )}
    </Routes>
  )
}

export default AppRouter