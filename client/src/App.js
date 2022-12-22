import React from "react";
import { Routes, Route } from 'react-router-dom'

import "./index.scss";
import "./App.scss";
import FAQ from "./pages/components/FAQ/FAQ";
import CheckoutPage from "./pages/components/Checkout/Checkout";
import SuccessPage from "./pages/components/SuccessPage/SuccessPage";
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignUp"
import SigninPage from "./pages/SignIn"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
