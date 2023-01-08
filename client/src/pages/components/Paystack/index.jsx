import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import useAxios from '../../../api/axios';
import { Toast } from './../ToastAlert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PaystackHook = ({paystackConfig}) => {
    const navigate = useNavigate()
    const { axiosPrivate } = useAxios()
    const donationsInfo = useSelector(state => (state.donations))
    const initializePayment = usePaystackPayment(paystackConfig)

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
        
          const verificationResponse = await axiosPrivate.post(`/transaction/verify/${response.reference}`, donationsInfo)
          
          if(verificationResponse.data.data.status !== true ){
            
            Toast.fire({
              icon: "error",
              title: "Verification failed"
            })

            return
          }

          Toast.fire({
            icon: "success",
            title: "Donation was successful"
          })

          // redirect to payment success page
          navigate('/dashboard/donate/success')
      })()
      
    };

    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }
   
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