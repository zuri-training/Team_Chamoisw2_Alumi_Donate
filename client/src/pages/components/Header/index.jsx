import React from "react";
import * as styled from "./styled";


function Header() {
  return (
    <styled.Header>
      <styled.imageContainer>
        <img src="./img/Rectangle24.png" alt="Alumni Donate logo" />
      </styled.imageContainer>

      <styled.Container>
        <h5 className="nav-donations">Donations</h5>
        <h5 className="nav-about">About Us</h5>
        <h5 className="nav-findMySchool">Find My School</h5>
        <h5 className="nav-contact">Contact</h5>
      </styled.Container>

      
    </styled.Header>
  );
}

export default Header;
