import React, { useEffect, useState } from "react";
import PaymentForm from "./component/paymentdetails/paymentdetails"
import { useParams } from "react-router-dom";


function Checkout(props) {
  const routeParams = useParams()
  const [donationLink, setDonationLink] = useState('')
  
  useEffect(() => {
    setDonationLink(routeParams.donationLink)
  }, [routeParams.donationLink, donationLink])

  return (
      <PaymentForm donationlink={donationLink} />
  );
}

export default Checkout;
