import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import ProjectsNavBar from '../components/ProjectsNavBar';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

const Sidebar = styled('div')({
  width: '240px',
  backgroundColor: '#1e88e5',
  color: '#fff',
  height: 'calc(100vh - 64px)',
  position: 'fixed',
  top: '64px',
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  overflow: 'hidden',
});

const Content = styled('div')({
  marginLeft: '240px',
  marginTop: '64px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  minHeight: 'calc(100vh - 64px)',
});

const SidebarItem = styled(NavLink)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  '&.active': {
    backgroundColor: '#1565c0',
  },
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  '& span': {
    marginLeft: '10px',
    whiteSpace: 'nowrap',
  },
});

const DashboardLayout = () => {
  return (
    <>
      <ProjectsNavBar />
      <Sidebar>
        <Box flexGrow={1}>
          <SidebarItem 
            to="/projects" 
            end // Add this to ensure exact matching
          >
            <FaHome />
            <span>Train</span>
          </SidebarItem>
          <SidebarItem 
            to="/projects/models" 
            end // Add this to ensure exact matching
          >
            <FaUser />
            <span>Models</span>
          </SidebarItem>
          <SidebarItem 
            to="/projects/settings"
            end // Add this to ensure exact matching
          >
            <FaCog />
            <span>Settings</span>
          </SidebarItem>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, width: '100%' }}
          onClick={() => alert('Create New Item')}
        >
          Create New
        </Button>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default DashboardLayout;