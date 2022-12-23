import React, { useLayoutEffect } from "react";
import * as styled from "./styled";
import { Link } from 'react-router-dom'
import { userIsAuth } from "../ProtectedRoutes";
import './../../styles/navbar.scss'

function Header() {

  useLayoutEffect(() => {

  }, [])

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

      { 
      !userIsAuth() ?<>
          <Link to="/login" className="nav-link-button">
            <button className="signin" type="button">Sign-in</button>
          </Link>
          <Link to="/signup" className="nav-link-button">
            <button className="signup" type="button">Sign-up</button>
          </Link>
        </>
        : <>
            <Link to="/logout" className="nav-link-button">
              <button className="signup btn btn-danger" type="button">Logout</button>
            </Link>
          </>
      }
    </styled.Header>
  );
}

export default Header;
