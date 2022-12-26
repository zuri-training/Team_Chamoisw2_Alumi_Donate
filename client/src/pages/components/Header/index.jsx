import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { userIsAuth } from "../ProtectedRoutes";
import './../../styles/navbar.scss'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()  
  const headerLinks = useMemo(() => (['donations', 'about-us', 'faq', 'contact-us']), [])

  useEffect(() => {
    if( !headerLinks.includes(location.pathname.substring(1).trim()) )return

    if(document.querySelector('.nav-link.active')){
      //Remove the active class from the previously active nav-link
      document.querySelector('.nav-link.active').classList.remove('active')
    }

    //Add the active class to the presently active nav-link
    document.querySelector(`.${location.pathname.substring(1).trim()}`).classList.add('active')
  }, [location.pathname, headerLinks])

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" href="#"><img src="/img/Rectangle24.png" alt="Alumni Donate logo" /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse w-100" id="navbarNavAltMarkup">
        <div className="navbar-nav justify-content-center align-items-center w-100">
          <Link className="nav-link mx-3 donations" aria-current="page" to="/donations">Donations</Link>
          <Link className="nav-link mx-3 about-us" aria-current="page" to="/about-us">About Us</Link>
          <Link className="nav-link mx-3 faq" aria-current="page" to="/faq">FAQ</Link>
          <Link className="nav-link mx-3 contact-us" aria-current="page" to="/contact-us">Contact Us</Link>
        
          { 
            !userIsAuth() ?<>
              <Link to="/login" className="nav-link mx-1">
                <button className="signin" type="button">Sign-in</button>
              </Link>
              <Link to="/signup" className="nav-link mx-1">
                <button className="signup" type="button">Sign-up</button>
              </Link>
            </>
            : <Link className="nav-link mx-5"><button className="signup btn btn-small btn-danger" type="button" onClick={logout}>Logout</button></Link>
          }
        </div>
      </div>
    </div>
    </nav>
  );
}

export default Header;
