import React from 'react'
import { Outlet } from 'react-router-dom'
import ProjectsNavBar from '../components/ProjectsNavBar'

export default function DashboardLayout() {
  return (
    <div>
      <ProjectsNavBar/>
      <Outlet/>
    </div>
  )
}
