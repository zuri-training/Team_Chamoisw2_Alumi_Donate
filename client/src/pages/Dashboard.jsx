import React, { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import DonateNow from './components/DonateNow'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [amount] = useState(0)
  const navigate = useNavigate()

  const redirectToCheckoutPage = () => {
    const collegeDonationLink = JSON.parse(localStorage.getItem('auth')).donationLink
    navigate(`/donate/${collegeDonationLink}/checkout`)
  }

  const handleDonateFormSubmission = async (e) => {
    e.preventDefault()

    localStorage.setItem('amountToDonate', JSON.stringify({amount: amount}))
    
    redirectToCheckoutPage()
  }

  return (
    <div className="dashboard row justify-content-center text-left">
     <Header />
        <DonateNow handleDonateFormSubmission={handleDonateFormSubmission} />
      <Footer />
    </div>
  )
};

export default Dashboard;