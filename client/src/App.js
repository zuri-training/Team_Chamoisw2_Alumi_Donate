import React from "react";
import { Routes, Route } from 'react-router-dom'

import "./index.scss";
import "./App.scss";
import FAQPage from "./pages/FAQ";
import CheckoutPage from "./pages/components/Checkout/Checkout";
import SuccessPage from "./pages/components/SuccessPage/SuccessPage";
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignUp"
import SigninPage from "./pages/SignIn"
import DashboardPage from "./pages/Dashboard";
import DonationLinkPage from "./pages/DonationLink";
import DonationsPage from "./pages/Donations";
import AboutUsPage from "./pages/AboutUs";
import ProtectedRoutes from "./pages/components/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/donations" element={<DonationsPage />} />
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
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          } />
          <Route 
            path="/donate/success" 
            element={
            <ProtectedRoutes>
              <SuccessPage />
            </ProtectedRoutes>
            } />
      </Routes>
    </div>
  );
}

export default App;
