import React from 'react'
import ProjectsNavBar from '../components/ProjectsNavBar'
import { Outlet } from 'react-router-dom'

export default function ProjectsLayout() {
  return (
    <div>
      <ProjectsNavBar/>
      <Outlet/>
    </div>
  )
}
