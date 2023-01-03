import React from "react";

import * as styled from "./styled";

function Footer() {
  return (
    <styled.Footer className="d-flex flex-column align-items-center justify-content-between" style={{ position:'relative', bottom: "0px", width: "100%", padding: "0px" }}>
      <styled.socialsContainer className="px-4">
        <img src="/img/Rectangle24.png" alt="Alumni Donate logo" />
        
        <styled.aboutUsText1>we are a platform that helps alumni give</styled.aboutUsText1>
        <styled.aboutUsText2>back to their Alma-mater. You can reach us on this platform.</styled.aboutUsText2>
        <styled.Logos>
        <img src="/img/Group 39.png" alt="Socials logo" />
        </styled.Logos>
        <styled.emailWrapper className="position-relative w-100 mt-3">
        <styled.emailInput type="email" className="form-control mb-0" placeholder="Enter E-mail Address" />
        <styled.emailSubscribe>Subscribe</styled.emailSubscribe>
        </styled.emailWrapper>
        <styled.Copyright>
        <small>Copyrights© 2022 TeamChamoisw2. All rights reserved.</small>
        </styled.Copyright>
      </styled.socialsContainer>
      <styled.dunkelBlau className="row w-100 d-flex justify-content-center flex-lg-nowrap flex-sm-wrap flex-xs-wrap">
        <h5 className="col-sm-6 col-md-2 col-lg-auto">Donations</h5>
        <h5 className="col-sm-6 col-md-2 col-lg-auto">About Us</h5>
        <h5 className="col-sm-6 col-md-2 col-lg-auto">Find My School</h5>
        <h5 className="col-sm-6 col-md-2 col-lg-auto">Contact</h5>
        <h5 className="col-sm-6 col-md-2 col-lg-auto">Terms of service</h5>
        <h5 className="col-sm-6 col-md-2 col-lg-auto"> Privacy Policy</h5>
      </styled.dunkelBlau>
    </styled.Footer>
  );
}

export default Footer;
