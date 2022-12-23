import React from "react";

import * as styled from "./styled";

function Footer() {
  return (
    <styled.Footer>
      <styled.socialsContainer>
        <img src="./img/Rectangle24.png" alt="Alumni Donate logo" />
        
        <styled.aboutUsText1>we are a platform that helps alumni give</styled.aboutUsText1>
        <styled.aboutUsText2>back to their Alma-mater. You can reach us on this platform.</styled.aboutUsText2>
        <styled.Logos>
        <img src="./img/Group 39.png" alt="Socials logo" />
        </styled.Logos>
        <styled.emailWrapper>
        <styled.emailInput type="email" className="form-control mb-0" placeholder="Enter E-mail Address" />
        <styled.emailSubscribe>Subscribe</styled.emailSubscribe>
        </styled.emailWrapper>
        <styled.Copyright>
        <small>Copyrights© 2022 TeamChamoisw2. All rights reserved.</small>
        </styled.Copyright>
      </styled.socialsContainer>
      <styled.dunkelBlau>
        <h5>Donations</h5>
        <h5>About Us</h5>
        <h5>Find My School</h5>
        <h5>Contact</h5>
        <h5>Terms of service</h5>
        <h5> Privacy Policy</h5>
      </styled.dunkelBlau>
    </styled.Footer>
  );
}

export default Footer;
