import React from "react";
import * as styled from "./styled";

function Thankyou() {
  return (

    <styled.Container>
    <styled.Card>

      <styled.thankYou>THANK YOU</styled.thankYou>

      <styled.gradImage>
        <img src="./img/Rectangle 1.png" alt="Graduating Students" />
      </styled.gradImage>

<styled.dollar>
  $1000
</styled.dollar>

<styled.donationSuccessful>
  Your Donation was Successful
</styled.donationSuccessful>

<styled.receipt>A receipt has been sent to your Email</styled.receipt>

    </styled.Card>
    </styled.Container>
  )
}

export default Thankyou;