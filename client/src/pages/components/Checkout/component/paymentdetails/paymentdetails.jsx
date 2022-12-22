import React, { useEffect, useState } from "react";
import * as styled from "./styled";
import PaystackHook from './../../../../../config/paystack.config';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

function Card() {
  const [card, setCard] = useState({
    "cvc": '',
    "expiry": '',
    "name": '',
    "number": '',
    "amount": 0,
    "email": ''
  })

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'))
   
    if(auth === null) return

    setCard({...card, email: auth.email})
  },[])

  const handleInputChange = (e, inputField) => {
    const { name, value } = e.target;
    
    if(inputField === "month"){
      const expiryDate = card.expiry.split("/");
      setCard({...card, expiry: expiryDate.length === 2 ? `${value}/${expiryDate[1]}`: value });
      return
    }else if(inputField === "year"){
      const expiryDate = card.expiry.split("/");
      setCard({...card, expiry: expiryDate.length === 2 ? `${expiryDate[0]}/${value}`: `01/${value}` });
      return
    } 
    setCard({...card, [name]: value });
  }

  const FormValid = () => {
    return Object.values(card).every(value => { return value !== "" && value !== 0})
  }

  return (
    <>
      <styled.paymentDetails>Payment Details</styled.paymentDetails>
      <styled.Cart>
        <styled.Details>
        <Cards
          cvc={card.cvc}
          expiry={card.expiry}
          name={card.name}
          number={card.number}
        />
          <styled.cardNumber>Card Number</styled.cardNumber>
          <styled.digit>Enter the 10 digit number on the card</styled.digit>

          <styled.inputWrapper>
            <styled.numberInput type="number" name="number" onChange={handleInputChange} />
          </styled.inputWrapper>

          <styled.digit>Email</styled.digit>
          <styled.inputWrapper>
            <styled.nameInput type="text" disabled value={card.email} />
          </styled.inputWrapper>

          <styled.digit>Enter the name on your card</styled.digit>
          <styled.inputWrapper>
            <styled.nameInput type="text" name="name" onChange={handleInputChange} />
          </styled.inputWrapper>

          <styled.inputh3>Enter the amount</styled.inputh3>
          <styled.amountInput type="number" name="amount" onChange={handleInputChange}/>

          <styled.cvvContainer>
            <div>
              <styled.Cvv>CVC Number</styled.Cvv>
              <styled.threeDigit>
                Enter the three digit at the back of the card
              </styled.threeDigit>
            </div>
            <styled.cvvInput>
              <styled.inputDigit type="text" name="cvc" onChange={handleInputChange}/>
            </styled.cvvInput>
          </styled.cvvContainer>

          <styled.expireContainer>
            <div>
              <styled.expiryDate>Expiry Date</styled.expiryDate>
              <styled.expiration>Enter the expiration date</styled.expiration>
            </div>
            <styled.Calendar>
              <styled.month type="number" placeholder="MM" name="expiry" onChange={(e) => handleInputChange(e, "month")} />
              <p>/</p>
              <styled.year type="number" placeholder="YY" name="expiry" onChange={(e) => handleInputChange(e, "year")} />
            </styled.Calendar>
          </styled.expireContainer>

          { FormValid() ? <PaystackHook paymentDetails={card} /> : "" }
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
