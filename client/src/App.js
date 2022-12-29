import React, { useState } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'

import "./index.scss"
import "./App.scss"
import "./pages/styles/dashboard.scss"
import FAQPage from "./pages/FAQ"
import CheckoutPage from "./pages/components/Checkout/Checkout"
import SuccessPage from "./pages/components/SuccessPage/SuccessPage"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignUp"
import SigninPage from "./pages/SignIn"
import DashboardPage from "./pages/Dashboard"
import DonationLinkPage from "./pages/DonationLink"
import DonationsPage from "./pages/Donations"
import AboutUsPage from "./pages/AboutUs"
import ContactUsPage from "./pages/ContactUs"
import DonateNow from "./pages/components/DonateNow"
import ProtectedRoutes, { userIsAuth } from "./pages/components/ProtectedRoutes"
import Sidebar from "./pages/components/Sidebar"
import Header from './pages/components/Header'
import Footer from './pages/components/Footer'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(userIsAuth()))
  const navigate = useNavigate()

  const loggedOut = () => {
    setIsAuthenticated(false)
    navigate('/login')
  }

  const setAuthenticated = (authState) => {
    setIsAuthenticated(authState)
  }

  return (
    <div className="App">

      <div className="row">
        <div className="top-navbar col-12 position-fixed top-0 bg-white site-text-color"><Header /></div>
        {
          isAuthenticated && 
          <div className="col-md-3">
            <nav className="sidebar sidebar-offcanvas position-sticky" id="sidebar">
              <Sidebar loggedOut={loggedOut} />
            </nav>
          </div>
        }
      <div className={ isAuthenticated ? "col-md-9 page-content": "col-md-12 page-content"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/donate/:donationLink" element={<DonationLinkPage />} />
        <Route 
          path="/donate/checkout" 
          element={
            <ProtectedRoutes>
              <CheckoutPage />
            </ProtectedRoutes>
          } />
        <Route 
          path="/dashboard"
          element={<DashboardPage setAuthenticated={setAuthenticated} />} 
          >
            <Route 
              path="donate" 
              render={ () => {
                <ProtectedRoutes>
                  <DonateNow />
                </ProtectedRoutes>
              }} />
            <Route 
              path="donate/success" 
              render={ () => {
                <ProtectedRoutes>
                  <SuccessPage />
                </ProtectedRoutes>
              }} />
          </Route>
      </Routes>
      </div>
      <div className="col-12 footer"><Footer /></div>
      </div>
    </div>
  )
}

export default App
