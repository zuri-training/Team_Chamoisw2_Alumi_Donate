import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from "../../../hooks/auth";
import './../../styles/navbar.scss'

function Header() {
  const { userIsAuth } = useAuth()
  const navigate = useNavigate()  
  const location = useLocation()
  const isAuthenticated = useMemo(() => (userIsAuth()), [location.pathname])
  const headerLinks = useMemo(() => (['donations', 'about-us', 'faq', 'contact-us']), [])

  useEffect(() => {
    if( !headerLinks.includes(location.pathname.substring(1).trim()) )return

    if(document.querySelector('.nav-link.active')){
      //Remove the active className from the previously active nav-link
      document.querySelector('.nav-link.active').classList.remove('active')
    }

    //Add the active className to the presently active nav-link
    document.querySelector(`.${location.pathname.substring(1).trim()}`).classList.add('active')
  }, [location.pathname])
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/"><img src="/img/Rectangle24.png" alt="Alumni Donate logo" /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse w-100" id="navbarNavAltMarkup">
      { 
        !isAuthenticated && 
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center align-items-center w-100">
            <li className="nav-item">
              <Link className="nav-link mx-3 donations" aria-current="page" to="/donations">Donations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-3 about-us" aria-current="page" to="/about-us">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-3 faq" aria-current="page" to="/faq">FAQ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-3 contact-us" aria-current="page" to="/contact-us">Contact Us</Link>
            </li>
            {/* Sign-in and Signup buttons*/}
            <li className="nav-item">
              <Link to="/login" className="nav-link mx-1">
                <button className="signin" type="button">Sign-in</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link mx-1">
                <button className="signup" type="button">Sign-up</button>
              </Link>
            </li>
            
        </ul>
        }
      </div>
    </div>
    </nav>
  );
}

export default Header;
