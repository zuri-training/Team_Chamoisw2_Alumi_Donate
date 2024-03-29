import React, { useEffect, useState } from "react";
import PaystackHook from '../../../Paystack';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { NumericKeyboard } from 'react-numeric-keyboard';
import useAuth from "../../../../../hooks/auth";
import useDonations from "../../../../../hooks/donations";

const config = {
  reference: (new Date()).getTime().toString(),
  email: '',
  amount: 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  channels: ['card'],
  currency: 'NGN'
};

function Card() {
  const [card, setCard] = useState({
    "cvc": '',
    "expiry": '',
    "number": '',
    "amount": 0,
    "month": '',
    "year": '',
    "name": ''
  })
  const [infos, setInfos] = useState({
    vat: 0,
    institution: '',
    uniqueId: ''
  })
  const [isOpen, setIsOpen] = useState(false);
  const { getDonationReduxData } = useDonations()
  const [donationData] = useState(getDonationReduxData())
  const { getUserData } = useAuth()
  const [ formValid, setFormValid ] = useState(false)
  const [paystackConfig, setPaystackConfig] = useState(config)
  
  useEffect(() => {
    const { college, donationLink, fullName } = getUserData()
    setCard({ ...card, amount: donationData.amountToDonate, name: fullName })
    setInfos({...infos, institution: college, uniqueId: donationLink })
  },[])

  const handleInputChange = (e, inputField) => {
    const { name, value } = e.target;

    //Validate CVV
    if(name === 'cvc'){
      setCard({...card, 'cvc': value})
      
      if(value.length === 3){ setIsOpen(false) }
    }

    //Validate card number
    if(name === 'number'){
      //if it is not a number, return
      if(isNaN(value) || value.length > 19) return

      setCard({...card, [name]: value });
    }

    //Validate amount
    if(name === 'amount'){
      //if it is not a number, return
      if(isNaN((value))) return

      setCard({...card, [name]: value });
    }

    //Validate month
    if(inputField === "month"){
      if(value.length > 2 || value > 12)return

      setCard({...card, month: value, expiry: `${value}/${card.year}`})
    }
    
    //Validate Year
    if(inputField === "year"){
      if(value.length > 2)return

      setCard({...card, year: value, expiry: `${card.month}/${value}`})
    } 
  }

  useEffect(() => {
      setFormValid(FormValid())

      setPaystackConfig({
        ...paystackConfig,
        amount: card.amount * 100,
        email: getUserData().email
      })
  }, [card])

  const FormValid = () => {
    return Object
      .values(card)
      .every(value => { 
        return value !== "" 
          && value !== 0 
          && card.expiry.length === 5 
          && card.cvc.length === 3 
          && (card.number.length >= 16 && card.number.length <= 19 )
        })
  }

  return (
    <div className="row">
     <h4 className="text-start site-text-color">Payment Details</h4> 
     <div className="col-md-7 col-sm-12 d-flex flex-column align-items-center">
      {/* Card Number */}
      <div className="mb-4 w-75 d-flex flex-column align-items-start">
        <h5 className="form-label text-start fs-5 site-text-color">Card Number</h5>
        <span className="site-text-grey text-start fs-7" id="basic-addon1">Enter the number on the card</span>
        <input type="text" name="number" value={card.number} onChange={handleInputChange} className="form-control" id="card-number" aria-describedby="basic-addon1" />
      </div>

      {/* Amount to donate */}
      <div className="mb-4 w-75 d-flex flex-column align-items-start">
        <h5 className="form-label text-start fs-5 site-text-color">Enter amount</h5>
        <input type="text" name="amount" value={card.amount} onChange={handleInputChange} className="form-control" id="card-amount" aria-describedby="basic-addon2" />
      </div>

      {/* CVV Number */}
      <div className="mb-4 w-75 d-flex flex-column align-items-start">
        <div className="row">
          <div className="col-12 position-relative">
            <NumericKeyboard isOpen={isOpen} onChange={(value, name) => {
                handleInputChange({target:{ name:'cvc', value: value.value }})
            }} />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-start">
            <h5 className="form-label text-start site-text-color m-0">CVV</h5>
            <span className="site-text-grey text-start fs-7">Enter the three digit at the back of the card</span>
          </div>
          <div className="col-md-6">
            <input type="password" className="form-control" onClick={() => { setCard({...card, cvc: ''}); setIsOpen(true)}} contentEditable="false" value={card.cvc} readOnly={true}  id="card-cvv" aria-describedby="basic-addon3"  />
          </div>
          
        </div>
      </div>

      {/* Expiry Date */}
      <div className="mb-4 w-75 d-flex flex-column align-items-start">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-start site-text-color m-0">Expiry Date</h5>
            <p className="site-text-grey text-start fs-7">Enter the expiration date</p>
          </div>
          <div className="col-md-6">
            <div className="row">
             <div className="col-md-5"><input className="text-center month form-control" type="number" placeholder="MM" name="expiry" value={card.month} onChange={(e) => handleInputChange(e, "month")} /></div>
             <div className="col-md-2 d-flex align-items-center justify-content-center"><span>/</span></div>
             <div className="col-md-5"><input className="text-center year form-control" type="number" placeholder="YY" name="expiry" value={card.year} onChange={(e) => handleInputChange(e, "year")} /></div>
            </div>
          </div>
        </div>
      </div>
     
      <div className="w-75">
      { formValid && <PaystackHook paystackConfig={paystackConfig} /> }
      </div>
    </div>

    {/* Card Section */}
    <div className="col-md-5 mb-3">
      <div className="row justify-content-center">
        <div className="col-auto d-flex flex-column justify-content-center py-3" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", background: "rgba(131, 142, 171, 0.1)" }}>
          <Cards
            cvc={card.cvc}
            expiry={card.expiry}
            name={card.name}
            number={card.number}
          />
          <div className="row justify-content-center mt-3 py-3" style={{ background: "rgba(131, 142, 171, 0.2) !important" }}>
            <div className="col-4 text-start">Institution: </div><div className="col-7 text-start">{infos.institution}</div>
            <div className="col-4 text-start">Unique ID: </div><div className="col-7 text-start">{infos.uniqueId.replaceAll('"','')}</div>
            <div className="col-4 text-start">VAT: </div><div className="col-7 text-start">{infos.vat}</div>
          </div>

          <div className="row" style={{ borderTop: "2px solid rgba(131, 142, 171)" }}>
            <div className="mt-3" style={{ background: "rgba(131, 142, 171, 0.7) !important" }}>You are paying {Number(card.amount) + Number(infos.vat)} NGN</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Card;
