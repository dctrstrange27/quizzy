import React from 'react'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import Subject from './Subject'
const Shared = () => {
  return (
    <div className='flex-col h-screen border-[2px] border-r-dark_del_btn '>
      <div className='shared font-nuni flex flex-col h-[20%] border-[1px px-20 mt-12 gap-2 justify-center items-center'>
        <BsFillJournalBookmarkFill className='w-5 h-5 text-[#041b2d]' />
        <h1 className='font-bold text-base'>Reviewers</h1>
        <p className='font-light text-sm'>These are reviewers/questions that are created & shared
          by different students to practice for their exam. </p>
        {/* sample */}
      </div>
      <div className='px-6 py-2 '>
        <Subject></Subject>
        <Subject></Subject>
      </div>

    </div>
  )
}

export default Shared