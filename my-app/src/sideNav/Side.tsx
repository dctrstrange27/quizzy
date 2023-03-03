import React from 'react'
import { Link, Outlet } from "react-router-dom"
import SideNav from './SideNav'
const Side = () => {
  return (
   <>
     <div className='Side fixed hidden md:flex h-full pl-4 w-[20%] border-[5px flex-col'>
      <SideNav></SideNav>
      </div>
      <Outlet />
   </>
  )
}

export default Side