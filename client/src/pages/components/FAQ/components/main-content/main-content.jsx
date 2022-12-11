import React from "react";
import * as styled from "./styled";

function Content() {
  return (
    <styled.Main>
      <styled.FAQs>
        <h1>FAQs</h1>
      </styled.FAQs>

      <styled.questionBox>
        <h4>Frequently asked questions about Alumni Donate</h4>
        &nbsp; &nbsp;
        <h3>How do I register my organization?</h3>
        <p>
          Click on sign up and fill in your details to register, Once
          registeredyou will be directed to your dashboard.
        </p>
        &nbsp; &nbsp;
        <h3>How do I find my alma mater?</h3>
        <p>
          Click on find my school and search for your school, colleges or
          institution.
        </p>
        &nbsp; &nbsp;
        <h3>How do I copy my organization donation link?</h3>
        <p>Go to profile and scroll to the bottom, click on copy donation link and it would automatically be copied</p>

        &nbsp; &nbsp;
        <h3>How do I link my bank account to my donation page?</h3>
        <p>Go to profile and scroll to the bottom, click on copy donation link and it would automatically be copied</p>

        &nbsp; &nbsp;
        <h3>How do I copy my organization donation link?</h3>
        <p>Go to profile and fill in account information, then click on verify. 
          An email will be sent to you after 2 to 3 business days to confirm that you have successfully linked your account.</p>

        &nbsp; &nbsp;
        <h3>What are the acceptable payment options?</h3>
        <p>We accept mastercard, paypal, payoneer, paystack, grey and stripe.</p>

        &nbsp; &nbsp;
        <h3>When can I withdraw?</h3>
        <p>You can withdraw anytime and as low as one donation.</p>

      </styled.questionBox>
    </styled.Main>
  );
}

export default Content;
