import React, { useEffect, useMemo, useState } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'
import useLoading from "./hooks/loading"

import "./index.scss"
import "./App.scss"
import "./pages/styles/dashboard.scss"
import FAQPage from "./pages/FAQ"
import CheckoutPage from "./pages/components/Checkout/Checkout"
import SuccessPage from "./pages/SuccessPage"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignUp"
import SigninPage from "./pages/SignIn"
import DashboardPage from "./pages/Dashboard"
import DonationLinkPage from "./pages/DonationLink"
import DonationsPage from "./pages/Donations"
import AboutUsPage from "./pages/AboutUs"
import ContactUsPage from "./pages/ContactUs"
import DonateNow from "./pages/components/DonateNow"
import ProtectedRoutes from "./pages/components/ProtectedRoutes"
import Sidebar from "./pages/components/Sidebar"
import Header from './pages/components/Header'
import Footer from './pages/components/Footer'
import ProfilePage from './pages/components/Dashboard/Profile'
import Loader from "./pages/components/Loading"
import CollegesPage from './pages/components/Admin/College'
import BanksPage from './pages/components/Admin/Bank'
import RegisterCollegePage from "./pages/components/Admin/College/register"
import EditCollegePage from "./pages/components/Admin/College/edit"
import AdminPage from './pages/components/Admin'
import AdminLoginPage from './pages/components/Admin/login'
import AdminRegisterPage from './pages/components/Admin/register'
import AdminEditPage from './pages/components/Admin/edit'
import ProtectedAdminRoutes from './pages/components/ProtectedRoutes/admin'
import Redirect from './pages/components/Redirect'
import useAuth from "./hooks/auth"

function App() {
  const { userIsAuth, userIsAdmin } = useAuth()
  const isAdmin = useMemo(() => (userIsAdmin()), [userIsAdmin])
  const isAuth = useMemo(() => (userIsAuth()), [userIsAuth])
  const { loaderVisible } = useLoading()
  const [isLoading, setIsLoading] = useState(loaderVisible)
  const navigate = useNavigate()

  //If user is logged in, redirect to dashboard
  useEffect(() => {
    if(isAuth) navigate('/dashboard')
  }, [isAuth, navigate])

  useEffect(() => {
    setIsLoading(loaderVisible)
  },[loaderVisible]) 

  useEffect(() => {
    window.scrollTo(0,0)
  }, [navigate])


  return (
    <div className="App">
      <Loader visible={ isLoading } />
      
      {/* Display the  top navbar if admin or user is not logged into their dashboard */}
      <Header />

      <div className="row app-body p-0 m-0">
        {/* 
          The admin has its own sidebar rendered in its page. This sidebar is rendered for casual users of the site 
          when they are authenticated
        */}
        {
          isAuth && !isAdmin && 
          <div className="col-md-3">
            <nav className="sidebar sidebar-offcanvas position-sticky" id="sidebar">
              <Sidebar />
            </nav>
          </div>
        }
      <div className={ isAuth && !isAdmin ? "col-md-9 page-content m-0 px-3": "col-md-12 page-content m-0 px-3"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/donate/:donationLink" element={<DonationLinkPage />} />
        <Route path="/admin" element={<AdminPage />}>
            <Route 
              path="login" 
              element={
                  <AdminLoginPage />
              } />
            <Route 
              path="register" 
              element={
                <ProtectedAdminRoutes>
                  <AdminRegisterPage />
                </ProtectedAdminRoutes>
              } />
            <Route 
              path="edit" 
              element={
                <ProtectedAdminRoutes>
                  <AdminEditPage />
                </ProtectedAdminRoutes>
              } />
            <Route 
            path="colleges" 
            element={
              <ProtectedRoutes>
                <CollegesPage />
              </ProtectedRoutes>
            }>
              <Route 
                path="register" 
                element={
                  <ProtectedRoutes>
                    <RegisterCollegePage />
                  </ProtectedRoutes>
                } />
              <Route 
                path="edit" 
                element={
                  <ProtectedRoutes>
                    <EditCollegePage />
                  </ProtectedRoutes>
                } />
            </Route>
            <Route 
              path="banks" 
              element={
                <ProtectedRoutes>
                  <BanksPage />
                </ProtectedRoutes>
              } />
        </Route>
        <Route 
          path="dashboard"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }> 
            <Route 
              path="profile" 
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              } />
            <Route 
              path="donate" 
              element={
                <ProtectedRoutes>
                  <DonateNow />
                </ProtectedRoutes>
              } />
            <Route 
              path="donate/checkout" 
              element={
                <ProtectedRoutes>
                  <CheckoutPage />
                </ProtectedRoutes>
              } />
            <Route 
              path="donate/success" 
              element={
                <ProtectedRoutes>
                  <SuccessPage />
                </ProtectedRoutes>
              } />
          </Route>
          <Route
            path="*"
            element={<Redirect to="/" />}
          />
      </Routes>
      </div>
      <Footer />
      </div>
    </div>
  )
}

export default App
