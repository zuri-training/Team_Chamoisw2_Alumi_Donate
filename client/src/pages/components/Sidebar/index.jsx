import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ loggedOut }) => {
    const logout = () => {
        localStorage.clear()
        loggedOut()
    }

    return (
        <>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <i className="typcn typcn-device-desktop menu-icon"></i>
              <span className="menu-title">Profile</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/donate">
              <i className="typcn typcn-device-desktop menu-icon"></i>
              <span className="menu-title">Donate</span>
            </Link>
          </li>
        </ul>
        <div className="logout w-100 d-flex justify-content-center">
            <div className="w-75">
              <button className="btn btn-lg btn-danger position-relative w-100" type="button" onClick={logout}>Logout</button>
            </div>
        </div>
        </>
    )
}

export default Sidebar