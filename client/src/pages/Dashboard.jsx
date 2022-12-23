import React, { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate()

  const handleDonateFormSubmission = async (e) => {
    e.preventDefault()

    localStorage.setItem('amountToDonate', JSON.stringify({amount: amount}))

    const collegeDonationLink = JSON.parse(localStorage.getItem('auth')).donationLink

    navigate(`/donate/${collegeDonationLink}/checkout`)
  }

  return (
    <div className="dashboard row justify-content-center text-left">
     <Header />
        <form onSubmit={handleDonateFormSubmission}>
          <input type="number" name="amount" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
          <button type='submit'>Donate now</button>
        </form>
      <Footer />
    </div>
  )
};

export default Dashboard;