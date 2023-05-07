import React from 'react'
import { Link, Outlet } from "react-router-dom"
import SideNav from './SideNav'
import { useContext } from 'react'
import { HomeContext } from "../App";
const Side = () => {
  const {inQportal } = useContext(HomeContext);
  return (
   <>
      {!inQportal && <div className='Side bg-p fixed hidden md:flex h-fit px-4 w-[20%] -mt-24 border-[5px flex-col'>
      <SideNav></SideNav>
      </div>}
    
   </>
  )
}

export default Side