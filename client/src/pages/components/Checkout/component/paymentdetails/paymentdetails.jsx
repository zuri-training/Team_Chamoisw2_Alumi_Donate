import React, { useEffect, useState } from "react";
import * as styled from "./styled";
import PaystackHook from './../../../../../config/paystack.config';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

function Card() {
  const [card, setCard] = useState({
    "cvv": '',
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
          <styled.inputWrapper  style={{marginBottom: "20px"}}>
            <styled.numberInput type="number" name="number" onChange={handleInputChange} />
          </styled.inputWrapper>

          <styled.digit>Email</styled.digit>
          <styled.inputWrapper style={{marginBottom: "20px"}}>
            <styled.nameInput type="text" disabled value={card.email} />
          </styled.inputWrapper>

          <styled.digit>Enter the name on your card</styled.digit>
          <styled.inputWrapper style={{marginBottom: "20px"}}>
            <styled.nameInput type="text" name="name" onChange={handleInputChange} />
          </styled.inputWrapper>

          <styled.inputh3>Enter the amount</styled.inputh3>
          <styled.amountInput style={{marginBottom: "20px"}} type="number" name="amount" onChange={handleInputChange}/>

          <div className="row mb-3">
            <div className="col-md-9">
              <styled.cardNumber style={{ marginTop: "0px" }}>CVV Number</styled.cardNumber>
              <styled.digit style={{ fontSize: "0.8rem", textAlign: "start" }}>
              Enter the three digit at the back of the card
              </styled.digit>
            </div>

            <div className="col-md-3">
                <styled.inputDigit style={{width: "80px"}}  type="text" name="cvv" onChange={handleInputChange}/>
            </div>
          </div>

          <div className="row align-items-center justify-content-between">
            <div className="col-md-7">
              <styled.cardNumber>Expiry Date</styled.cardNumber>
              <styled.expiration className="text-start">Enter the expiration date</styled.expiration>
            </div>
            <div className="col mx-1">
              <styled.inputDigit style={{width: "100%"}} className="text-center" type="number" placeholder="MM" name="expiry" onChange={(e) => handleInputChange(e, "month")} />
            </div>  
              /
            <div className="col mx-1">
              <styled.inputDigit style={{width: "100%"}} className="text-center" type="number" placeholder="YY" name="expiry" onChange={(e) => handleInputChange(e, "year")} />
            </div>
          </div>

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
