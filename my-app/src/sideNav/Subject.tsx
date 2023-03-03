import React from 'react'

const Subject = () => {
  return (
    <>
      <div className='subject relative mb-7 bg-b  font-nuni text-sm px-4 py-4 h-60 border-[1px] shadow-Light_shadow hover:shadow-md  border-[#1e1e1e3e] rounded-lg hover:scale-105 ease-in-out duration-200'>
          <header className='flex gap-2 py-2 border-r-Ofive border-[1px justify-start items-center'>
            <svg stroke-width="0" viewBox="0 0 24 24" className="text-sm text-two" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 10h4v4H7zm0-6h4v4H7zm0 12h4v4H7zm6-6h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z"></path></svg>
            <h1 className='Author font-extrabold text-[#434242] '>Author:</h1>
            <p>Rohan</p>
          </header>
          <div className='flex justify-start'>
            <h2 className='font-bold text-[#434242] '>Mixed</h2>
            <svg stroke-width="0" viewBox="0 0 24 24" className="ml-2 text-sm text-[#041b2d]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm-.497 11l5.656-5.657-1.414-1.414-4.242 4.243L6.38 13.05l-1.414 1.414L8.503 18z"></path></g></svg>
          </div>
          <h1 className='font-bold text-xl text-start py-6 text-[#373636] '>ITEL IOS Razec Version</h1>
          <div className='Count px-2 py-2 flex font-nuni font-bold tracking-wide w-fit rounded-xl bg-[#041b2d]'>
            <p className='px-2 text-[#fff] rounded-lg bg-[#004e9a]'>1</p>
            <p className='px-2  text-[#fff] uppercase '>Questions</p>
          </div>
          <div className='Date text-sm text-[#5f5e5e] absolute bottom-2'>Feb 28, 2023 @ 09:40 PM</div>
          <div className='Date text-sm text-[#5f5e5e] absolute bottom-2 right-3'>Accessed by student 23x</div>
      
        </div>
    </>
  )
}

export default Subject