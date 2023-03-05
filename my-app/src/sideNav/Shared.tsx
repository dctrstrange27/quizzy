import React from 'react'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import Subject from './Subject'

const Shared = () => {
  return (
    <div className='flex-col px-6 w-full  md:ml-[20%] md:max-w-xl lg:max-w-[50rem] 2xl:max-w-[70rem] 3xl:max-w-[70rem]  border-[2px border-[#700a0a] '>
      <div className='shared font-nuni w-full md:min-w-[35rem] md:max-w-[65rem] flex flex-col h-[20%] border-[1px px-20 mt-28 mb-5 
                      gap-2 justify-center items-center'>
        <BsFillJournalBookmarkFill className='w-5 h-5 text-[#041b2d]' />
        <h1 className='font-bold text-base'>Reviewers</h1>
        <p className='font-light text-sm max-w-md'>These are reviewers/questions that are created & shared
          by different students to practice for their exam. </p>
        {/* sample */}
      </div>
      <div className='py-2 '>
        <Subject></Subject>
        <Subject></Subject>
        <Subject></Subject>
      </div>
    </div>
  )
}

export default Shared