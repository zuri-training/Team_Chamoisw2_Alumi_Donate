import React, { useEffect, useState } from "react";
import Header from "./../Header";
import PaymentForm from "./component/paymentdetails/paymentdetails"
import Footer from "./../Footer";
import { useParams } from "react-router-dom";


function Checkout(props) {
  const routeParams = useParams()
  const [donationLink, setDonationLink] = useState('')
  
  useEffect(() => {
    setDonationLink(routeParams.donationLink)
  }, [routeParams.donationLink, donationLink])

  return (
    <div>
      <Header />
      <PaymentForm donationlink={donationLink} />
      <Footer />
    </div>
   
  );
}

export default Checkout;
