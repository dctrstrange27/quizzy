import React from 'react'
import { Link, Outlet } from "react-router-dom"
const Side = () => {
  return (
   <>
     <div className='Side hidden md:flex border-[1px flex-col'>
        <Link to="yours" className='nav'> Yours</Link>
        <Link to="shared" className='nav'> Shared</Link>
      </div>
      <Outlet />
   </>
  )
}

export default Side