import React from 'react'
import { useState } from 'react'
import { Link, Outlet } from "react-router-dom"
import { BsSun } from 'react-icons/bs'
const Nav = () => {
  return (
    <>
      <div className='flex fixed justify-end bg-[#ffffffec] shadow-lg px-2 py-3 lg:justify-between w-full border-[1px border-[#bb3636] h-14'>
        <h1 className=' invisible md:visible'>logo</h1>
        <div className='flex justify-center items-center px-2 py-2 gap-5 border-emerald-300 border-[1px'>
          <div className='flex  gap-5 md:hidden'>
          <Link to="shared" className='nav '> Shared</Link>
          <Link to="yours" className='nav'>Yours</Link>
          </div>
          <Link to="shared" className='nav'> Docs</Link>
          <BsSun className='w-5 h-5'></BsSun>
          <button className='bg-[#041b2d] font-nuni text-sm hover:scale-105 duration-150 ease-in-out  font-bold tracking-wide px-[0.7rem] py-[0.35rem] text-[#fff] rounded-lg'>SIGN IN</button>
        </div>
      </div>
    </>

  )
}

export default Nav