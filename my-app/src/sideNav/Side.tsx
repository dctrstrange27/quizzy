import React from 'react'
import { Link, Outlet } from "react-router-dom"
import SideNav from './SideNav'
import { useContext } from 'react'
import { GlobalContext} from "../../src/utils/ContextTypes";
const Side = () => {
  const {inQportal } = useContext(GlobalContext);
  return (
   <>
      {!inQportal && <div className='Side bg-p border-[1px fixed hidden md:flex h-fit px-4 w-[20%] -mt-24 border-[5px flex-col'>
      <SideNav></SideNav>
      </div>}
    
   </>
  )
}

export default Side