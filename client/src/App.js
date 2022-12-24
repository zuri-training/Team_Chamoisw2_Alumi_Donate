import React from "react";
import { Routes, Route } from 'react-router-dom'

import "./index.scss";
import "./App.scss";
import FAQPage from "./pages/components/FAQ/FAQ";
import CheckoutPage from "./pages/components/Checkout/Checkout";
import SuccessPage from "./pages/components/SuccessPage/SuccessPage";
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignUp"
import SigninPage from "./pages/SignIn"
import DashboardPage from "./pages/Dashboard";
import DonationLinkPage from "./pages/DonationLink";
import ProtectedRoutes from "./pages/components/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/donate/checkout" 
          element={
            <ProtectedRoutes>
              <CheckoutPage />
            </ProtectedRoutes>
          } />
        <Route path="/donate/success" element={<SuccessPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route 
          path="/donate/:donationLink" 
          element={
              <DonationLinkPage />
          } />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          } />
      </Routes>
    </div>
  );
}

export default App;
