import React from "react";
import * as styled from "./styled";

function Card() {
  return (
    <>
      <styled.paymentDetails>Payment Details</styled.paymentDetails>
      <styled.Cart>
        <styled.Details>
          <styled.cardNumber>Card Number</styled.cardNumber>
          <styled.digit>Enter the 10 digit number on the card</styled.digit>

          <styled.inputWrapper>
            <styled.inputImages>
              <styled.visaImages src="./img/Group.png" alt="circlelogo" />
              <styled.visaImages src="./img/path3789.png" alt="Visa logo" />
            </styled.inputImages>

            <styled.numberInput type="text" />
          </styled.inputWrapper>

          <styled.inputh3>Enter the amount</styled.inputh3>
          <styled.amountInput type="text" />

          <styled.cvvContainer>
            <div>
              <styled.Cvv>CVV Number</styled.Cvv>
              <styled.threeDigit>
                Enter the three digit at the back of the card
              </styled.threeDigit>
            </div>
            <styled.cvvInput>
              <styled.inputDigit type="text" />
            </styled.cvvInput>
          </styled.cvvContainer>

          <styled.expireContainer>
            <div>
              <styled.expiryDate>Expiry Date</styled.expiryDate>
              <styled.expiration>Enter the expiration date</styled.expiration>
            </div>
            <styled.Calendar>
              <styled.month type="text" placeholder="MM" />
              <p>/</p>
              <styled.year type="text" placeholder="YY" />
            </styled.Calendar>
          </styled.expireContainer>

          <styled.donate>Donate Now</styled.donate>
        </styled.Details>

        <styled.untitledContainer>
          <styled.Untitled>
            <styled.header>Untitled</styled.header>
            <styled.circleLogo>
              <img src="./img/Group.png" alt="circlelogo" />
            </styled.circleLogo>
          </styled.Untitled>

          <styled.untitledVat>
            <styled.institution>Institution:</styled.institution>
            <styled.uniqueId>Unidue ID:</styled.uniqueId>
            <styled.Vat>VAT:</styled.Vat>
            <styled.amountToPay>You are paying 0.00 USD</styled.amountToPay>
          </styled.untitledVat>
        </styled.untitledContainer>
      </styled.Cart>
    </>
  );
}

export default Card;
