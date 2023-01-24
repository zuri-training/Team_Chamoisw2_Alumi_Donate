import React,{ useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import './styles/dashboard.scss'
import useAuth from '../hooks/auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const Dashboard = () => {
  const { userIsAuth } = useAuth()
  const isAuth = useMemo(() => (userIsAuth()), [userIsAuth])

  return (
    <div className="dashboard row justify-content-center h-100">
      <Header />
      {
          isAuth && 
          <div className="col-md-3">
            <nav className="sidebar sidebar-offcanvas position-sticky" id="sidebar">
              <Sidebar />
            </nav>
          </div>
        }
      <div className="col-md-9 h-100"><Outlet /></div>
    </div>
  )
};

export default Dashboard;