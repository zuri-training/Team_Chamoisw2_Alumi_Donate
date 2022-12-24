import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import axios from '../api/axios';
import { Toast } from '../pages/components/ToastAlert';
import { useNavigate } from 'react-router-dom';

const config = {
    reference: (new Date()).getTime().toString(),
    email: '',
    amount: 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    channels: ['card'],
    currency: 'NGN'
};

const PaystackHook = ({paymentDetails}) => {
    const navigate = useNavigate()
    config.amount = paymentDetails.amount * 100;
    config.email = paymentDetails.email;

    // you can call this function anything
    const onDone = (response) => {
      
      if(response.status !== "success"){
        Toast.fire({
          icon: "error",
          title: "Transaction failed"
        })

        return
      }

      // verify transaction
      (async () => {
        const token = JSON.parse(localStorage.getItem('auth')).token
        
        if(!token) {
          Toast.fire({
            icon: "error",
            title: "Unauthorized access"
          })

          navigate('/login')

          return
        }

        try{
          const verificationResponse = await axios.get(`/transaction/verify/${response.reference}`,{
            headers:{
              'accesstoken': `Bearer ${token}`
            }
          })
          

          if(verificationResponse.status !== 200){
            throw new Error("Operation failed")
          }

          Toast.fire({
            icon: "success",
            title: "Donation was successful"
          })

          // redirect to payment success page
          navigate('/donate/success')
        }catch(err){
          console.log(err)

          Toast.fire({
            icon: "error",
            title: err.message
          })
        }
      })()
      
    };

    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button
            style={{
              backgroundColor: "#071d57",
              color: "#ffffff",
              fontFamily: "Montserrat",
              marginTop: "50px",
              marginBottom: "50px",
              fontSize: "15px",
              height: "50px",
              borderRadius: "10px",
              width: "100%"
            }}

           onClick={() => {
              initializePayment(onDone, onClose)
          }}>Donate now</button>
      </div>
    );
};

export default PaystackHook