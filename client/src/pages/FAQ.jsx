import React from "react"
import './styles/faq.scss'

function FAQ() {
  return (
       <main className="faq-page col-12 w-100 px-5 site-text-color position-relative" style={{ height: "100%", overflowY: "visible" }}>
        <div className="faqs">
         <h1>FAQs</h1>
        </div>
        <section className="faq-bg d-flex justify-content-center" style={{ backgroundImage: "url('./../img/backgroundimage.png')", height: "900px" }}>         
          <div className="position-relative bg-white w-100 h-100 my-0" style={{ zIndex: 2, opacity: 0.4 }}></div>
          <div className="question-box position-absolute w-75" style={{ zIndex: 3, padding: "2rem", height: "100" }}>
          <h4>Frequently asked questions about Alumni Donate</h4>
           
          <h3>How do I register my organization?</h3>
          <p>
            Click on sign up and fill in your details to register, Once
            registeredyou will be directed to your dashboard.
          </p>
           
          <h3>How do I find my alma mater?</h3>
          <p>
            Click on find my school and search for your school, colleges or
            institution.
          </p>
           
          <h3>How do I copy my organization donation link?</h3>
          <p>Go to profile and scroll to the bottom, click on copy donation link and it would automatically be copied</p>

           
          <h3>How do I link my bank account to my donation page?</h3>
          <p>Go to profile and scroll to the bottom, click on copy donation link and it would automatically be copied</p>

           
          <h3>How do I copy my organization donation link?</h3>
          <p>Go to profile and fill in account information, then click on verify. 
            An email will be sent to you after 2 to 3 business days to confirm that you have successfully linked your account.</p>

           
          <h3>What are the acceptable payment options?</h3>
          <p>We accept mastercard, paypal, payoneer, paystack, grey and stripe.</p>

           
          <h3>When can I withdraw?</h3>
          <p>You can withdraw anytime and as low as one donation.</p>
          
        </div>
        </section>
      </main>
  )
}

export default FAQ
