import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { userIsAuth } from './components/ProtectedRoutes';
import './styles/dashboard.scss'

const Dashboard = ({ setAuthenticated }) => {
  useEffect(() => {
    setAuthenticated(Boolean(userIsAuth()))
  },[setAuthenticated])

  return (
    <div className="dashboard row justify-content-center text-left">
      <div className="col-md-12"><Outlet /></div>
    </div>
  )
};

export default Dashboard;