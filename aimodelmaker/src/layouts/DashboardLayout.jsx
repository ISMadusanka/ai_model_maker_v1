import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaBars } from 'react-icons/fa';
import '../pages/Dashboard/SideBar/Sidebar.css';
import ProjectsNavBar from '../components/ProjectsNavBar';
import { Button } from 'react-bootstrap';


const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ProjectsNavBar />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>My Dashboard</h3>
          <FaBars className="menu-icon" onClick={toggleSidebar} />
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaHome />
            <span>Train</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaUser />
            <span>Models</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FaCog />
            <span>Settings</span>  
          </NavLink>
        </nav>
        <Button>Create New</Button>
      </div>
      <div className={`content ${isOpen ? 'open' : ''}`} onClick={() => isOpen && toggleSidebar()}>
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
