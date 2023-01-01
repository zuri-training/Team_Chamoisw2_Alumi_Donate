import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './styles/dashboard.scss'

const Dashboard = () => {
  return (
    <div className="dashboard row justify-content-center h-100">
      <div className="col-md-12 h-100"><Outlet /></div>
    </div>
  )
};

export default Dashboard;