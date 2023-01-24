import React, { useEffect, useMemo, useState } from "react"
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom'
import useLoading from "./hooks/loading"

import "./index.scss"
import "./App.scss"
import useAuth from "./hooks/auth"
import Sidebar from "./pages/components/Sidebar"
import Header from './pages/components/Header'
import Footer from './pages/components/Footer'
import Loader from "./pages/components/Loading"

function App() {
  const { userIsAuth, userIsAdmin } = useAuth()
  const isAdmin = useMemo(() => (userIsAdmin()), [userIsAdmin])
  const isAuth = useMemo(() => (userIsAuth()), [userIsAuth])
  const { loaderVisible } = useLoading()
  const [isLoading, setIsLoading] = useState(loaderVisible)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(loaderVisible)
  },[loaderVisible]) 

  useEffect(() => {
    window.scrollTo(0,0)
  }, [navigate])

  return (
    <div className="App">
      <Loader visible={ isLoading } />
      
      {/* 
        Display the  top navbar if admin or user is not logged into their dashboard
        This is being handled internally. (inside the component)
      */}
      <Header />

      <div className="row app-body p-0 m-0">
        {/* 
          The admin has his own sidebar rendered in his page. This sidebar is rendered for casual users of the site 
          when they are authenticated
        */}

      <div className={ isAuth && !isAdmin ? "col-md-9 page-content m-0 px-3": "col-md-12 page-content m-0 px-3"}>
        <Outlet />
      </div>

      <Footer />
      </div>
    </div>
  )
}

export default App
