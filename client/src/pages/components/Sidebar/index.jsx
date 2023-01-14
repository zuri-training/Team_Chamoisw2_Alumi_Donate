import React, { useCallback, useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGOUT } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
import useAuth from './../../../hooks/auth'
import { BagPlusFill, BuildingFill, PersonBoundingBox, Bank } from 'react-bootstrap-icons'

const dashboardPages = [
  {
    title: 'Profile',
    link: '/dashboard/profile',
    icon: <PersonBoundingBox />,
    className: 'profile',
    isAdmin: false
  },
  {
    title: 'Donate',
    link: '/dashboard/donate',
    icon: <BagPlusFill />,
    className: 'donate',
    isAdmin: false
  },
  {
    title: 'Colleges',
    link: '/admin/colleges',
    icon: <BuildingFill />,
    className: 'colleges',
    isAdmin: true,
  },
  {
    title: 'Banks',
    link: '/admin/banks',
    icon: <Bank />,
    className: 'banks',
    isAdmin: true,
  }
]

const Sidebar = ({ isAdmin }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({type: LOGOUT})

        navigate('/')
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
          {
            !isAdmin && (
              dashboardPages.map(pageLink => {
                if (pageLink.isAdmin) return null
                
                return <li className="nav-item" key={pageLink.title}>
                  <Link className="nav-link" to={pageLink.link}>
                    {pageLink.icon}
                    <span className="menu-title mx-3">
                      {pageLink.title}
                    </span>
                  </Link>
                </li>
              }
            ))
          }

          {
            isAdmin && (
              dashboardPages.map(pageLink => {
                if (!pageLink.isAdmin) return null

                return <li className="nav-item" key={pageLink.title}>
                  <Link className="nav-link" to={pageLink.link}>
                    {pageLink.icon}
                    <span className="menu-title mx-3">
                      {pageLink.title}
                    </span>
                  </Link>
                </li>
              }
            ))
          }

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