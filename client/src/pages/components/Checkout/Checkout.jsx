import React, { useEffect, useState } from "react";
import Header from "./component/header/header";
import PaymentForm from "./component/paymentdetails/paymentdetails"
import Footer from "./component/footer/footer";
import { useParams } from "react-router-dom";


function Checkout(props) {
  const routeParams = useParams()
  const [donationLink, setDonationLink] = useState('')
  
  useEffect(() => {
    setDonationLink(routeParams.collegedonationlink)
  }, [])

  return (
    <div>
      <Header />
      <PaymentForm donationlink={donationLink} />
      <Footer />
    </div>
   
  );
}

export default Checkout;
