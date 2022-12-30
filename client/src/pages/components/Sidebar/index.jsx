import React, { useCallback, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ loggedOut }) => {
    const dashboardPages = useMemo(() => (['profile', 'donate']),[])
    const location = useLocation()

    const logout = () => {
        localStorage.clear()
        loggedOut()
    }

    const removeActiveLink = () => {
      if(document.querySelector('.nav-item.active')){
        document.querySelector('.nav-item.active').classList.remove('active')
      }
    }

    const selectActiveLink = useCallback(() => {
      dashboardPages.forEach(pageLink => {
        if(location.pathname === `/dashboard/${pageLink}`){
          document.querySelector(`.nav-item.${pageLink}`).classList.add('active')
        }
      })
    },[location.pathname, dashboardPages])

    useEffect(() => {
      // Remove the currently selected active sidebar link
      removeActiveLink()

      selectActiveLink()
      
    }, [location.pathname, selectActiveLink])

    return (
        <>
        <ul className="nav">
          <li className="nav-item profile">
            <Link className="nav-link" to="/dashboard/profile">
              <i className="typcn typcn-device-desktop menu-icon"></i>
              <span className="menu-title">Profile</span>
            </Link>
          </li>
          <li className="nav-item donate">
            <Link className="nav-link" to="/dashboard/donate">
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