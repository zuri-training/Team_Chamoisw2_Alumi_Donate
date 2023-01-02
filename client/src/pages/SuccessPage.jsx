import React from "react";
import useDonations from "../hooks/donations";

function SuccessPage() {
  const { getDonationReduxData } = useDonations()

  return (
    <div className="row justify-content-center">
      <h5>THANK YOU</h5>
      <div className="col-10">
        <img src="./img/Rectangle 1.png" alt="Graduating Students" />
      </div>

      <div className="amount-donated col-10">{ getDonationReduxData().amountToDonate }</div>
      
      <div className="donation-successful col-10">Your Donation was Successful</div>

      <div className="amount-donated col-10"> A receipt has been sent to your email </div>
    </div>
  );
}

export default SuccessPage;
