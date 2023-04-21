import React from 'react'
import { BiErrorAlt } from 'react-icons/bi'

const PageNotFound = () => {  
      return (
          <>
              <div className='font-pop w-screen h-screen flex flex-row gap-5 justify-center items-center text-[#BBBCBC]'>
                  <BiErrorAlt className='w-16 h-auto text-[#ea4040]'>
                  </BiErrorAlt>
                  <div className='flex flex-col justify-center items-center'>
                      <div className='text-[1.5rem] font-bold text-b1 flex gap-5'>
                      <h1 className=''>ERROR</h1>
                      <p>404</p>
                      </div>
                      <h1 className='text-[1rem] text-b2'>Woops. Looks like this page doesn't exist.</h1>
                  </div>
               
              </div>
          </>
      )
  }
  
export default PageNotFound