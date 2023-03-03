import React from 'react'
import { useState } from 'react'
import { BsSun } from 'react-icons/bs'
import SideNav from '../sideNav/SideNav'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <>
      <div className='flex fixed justify-end bg-[#ffffff] shadow-lg px-2 py-3 md:justify-between w-full border-[1px border-[#bb3636] h-14'>
        <h1 className='font-grot text-center hidden md:flex px-7 py-2 text-2xl text-b1 tracking-wide items-center'>Quizzy</h1>
        <div className='flex justify-center items-center px-2 py-2 gap-5 border-emerald-300 border-[1px'>
          <div className='gap-5 hidden md:hidden '>
          <SideNav></SideNav>
          </div>
          <Link to="shared" className='nav'> Docs</Link>
          <BsSun className='w-5 h-5'></BsSun>
          <Link to="/login" className='button'>SIGN IN</Link>
        </div>
     
      </div>
    </>

  )
}

export default Nav