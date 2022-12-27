import React, { useMemo, useState, useCallback } from "react";
import * as styled from "./styled";
import PaystackHook from './../../../../../config/paystack.config';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useNavigate } from "react-router-dom";
import { NumericKeyboard } from 'react-numeric-keyboard';

function Card() {
  const [card, setCard] = useState({
    "cvc": '',
    "expiry": '',
    "name": '',
    "number": '',
    "amount": 0,
    "email": '',
    "month": 0,
    "year": 0
  })
  const [infos, setInfos] = useState({
    vat: 0,
    institution: '',
    uniqueId: ''
  })
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const authCheck = useCallback(() => {
    const authUser = JSON.parse(localStorage.getItem('auth'))
   
    if(authUser === null){
      navigate('/login')
      return
    } 
    setInfos({...infos, institution: authUser.college, uniqueId: authUser.donationLink})
    setCard({...card, email: authUser.email, amount: parseInt(localStorage.getItem('amountToDonate'))})
  }, [card, infos, navigate])

  useMemo(() => (authCheck()) ,[])

  const handleInputChange = (e, inputField) => {
    const { name, value } = e.target;

    //Validate CVV
    if(name === 'cvc'){
      
      setCard(prev => {
        return {...prev, 'cvc': value}
      })
      
      if(value.length === 3){ setIsOpen(false); }

      return
    }

    //Validate name
    if(name === 'name'){
      //if it is a number and value is not undefined, return
      if(value && Number(value)) return
    }

    //Validate card number
    if(name === 'number'){
      //if it is not a number, return
      if(isNaN(Number(value)) || value.length > 19) return
    }

    //Validate amount
    if(name === 'amount'){
      //if it is not a number, return
      if(isNaN(Number(value))) return


    }

    //Validate month
    if(inputField === "month"){
      if(value.length > 2)return

      setCard({...card, month: value, expiry: `${value}/${card.year}`})

      return
    }
    
    //Validate Year
    if(inputField === "year"){
      if(value.length > 2)return

      setCard({...card, year: value, expiry: `${card.month}/${value}`})
      return
    } 

    setCard({...card, [name]: value });
  }

  const FormValid = () => {
    return Object.values(card).every(value => { return value !== "" && value !== 0 && card.expiry.length >= 4})
  }

  return (
    <>
      <styled.paymentDetails>Payment Details</styled.paymentDetails>
      <styled.Cart>
        <styled.Details>
          <styled.cardNumber>Card Number</styled.cardNumber>
          <styled.digit>Enter the 10 digit number on the card</styled.digit>
          <styled.inputWrapper  style={{marginBottom: "20px"}} className="custom-border">
            <styled.numberInput type="text" name="number" value={card.number} onChange={handleInputChange} />
          </styled.inputWrapper>

          <styled.digit>Email</styled.digit>
          <styled.inputWrapper style={{marginBottom: "20px"}}>
            <styled.nameInput type="text" disabled value={card.email} />
          </styled.inputWrapper>

          <styled.digit>Enter the name on your card</styled.digit>
          <styled.inputWrapper style={{marginBottom: "20px"}}>
            <styled.nameInput type="text" name="name" value={card.name} onChange={handleInputChange} />
          </styled.inputWrapper>

          <styled.inputh3>Amount to donate</styled.inputh3>
            <styled.inputWrapper style={{marginBottom: "20px"}}>
            <styled.numberInput type="text" name="amount" value={card.amount} onChange={handleInputChange}/>
          </styled.inputWrapper>

          <div className="row mb-3">
            <div className="col-md-9">
              <styled.cardNumber style={{ marginTop: "0px" }}>CVV Number</styled.cardNumber>
              <styled.digit style={{ fontSize: "0.8rem", textAlign: "start" }}>
              Enter the three digit at the back of the card
              </styled.digit>
            </div>

            <div className="col-md-3">
              <NumericKeyboard isOpen={isOpen} onChange={(value, name) => {
                  handleInputChange({target:{ name:'cvc', value: value.value }})
              }} />
              <input type="password" className="form-control" onClick={() => { setCard({...card, cvc: ''}); setIsOpen(true)}} contentEditable="false" value={card.cvc} readOnly={true} />
            </div>
          </div>

          <div className="row align-items-center justify-content-between">
            <div className="col-md-7">
              <styled.cardNumber>Expiry Date</styled.cardNumber>
              <styled.expiration className="text-start">Enter the expiration date</styled.expiration>
            </div>
            <div className="col mx-1">
              <styled.numberInput style={{width: "100%"}} className="text-center month" type="number" placeholder="MM" name="expiry" value={card.month} onChange={(e) => handleInputChange(e, "month")} />
            </div>  
              /
            <div className="col mx-1">
              <styled.numberInput style={{width: "100%"}} className="text-center year" type="number" placeholder="YY" name="expiry" value={card.year} onChange={(e) => handleInputChange(e, "year")} />
            </div>
          </div>

          { FormValid() ? <PaystackHook paymentDetails={card} /> : "" }
        </styled.Details>

        <div className='row flex-column w-100'>
          <styled.Untitled className="py-3">
          <Cards
            cvc={card.cvc}
            expiry={card.expiry}
            name={card.name}
            number={card.number}
          />
          </styled.Untitled>

          <styled.untitledVat style={{ zIndex: 2, marginTop: "-15px", paddingTop: "10px" }}>
            <div className="row">
              <div className="col-4 text-start">Institution: </div><div className="col-8 text-start">{infos.institution}</div>
              <div className="col-4 text-start">Unique ID: </div><div className="col-8 text-start">{infos.uniqueId.replaceAll('"','')}</div>
              <div className="col-4 text-start">VAT: </div><div className="col-8 text-start">{infos.vat}</div>
            </div>
            <styled.amountToPay className="mt-3">You are paying {Number(card.amount) + Number(infos.vat)} USD</styled.amountToPay>
          </styled.untitledVat>
        </div>
      </styled.Cart>
    </>
  );
}

export default Card;
