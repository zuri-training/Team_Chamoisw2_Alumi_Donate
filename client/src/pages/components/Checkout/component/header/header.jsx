import React from "react";
import { Link } from "react-router-dom";
import * as styled from "./styled";


function Header() {
  return (
    <styled.Header>
      <styled.imageContainer>
        <img src="./img/Rectangle24.png" alt="Alumni Donate logo" />
      </styled.imageContainer>

      <styled.Container>
        <Link to="/donations">
          <h5 className="nav-donations">Donations</h5>
        </Link>
        <Link to="/about-us">
          <h5 className="nav-about">About Us</h5>
        </Link>
        <Link to="/faq">
          <h5 className="nav-faq">FAQ</h5>
        </Link>
        <Link to="/contact-us">
          <h5 className="nav-contact">Contact</h5>
        </Link>
      </styled.Container>
    </styled.Header>
  );
}

export default Header;
