import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNavBar from '../components/HomeNavbar'

export default function HomeLayout() {
  return (
    <div>
      <HomeNavBar/>
      <Outlet/>
    </div>
  )
}
