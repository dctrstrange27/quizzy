import React, { useState } from 'react'
import { useEffect } from 'react'
import Options from './Options'

const Qportal = ({ questions, quest }) => {

  console.log(quest.question)
  return (
    <>
      <h1 className='font-grot border-[1px text-2xl'>{questions?.subjectCode}</h1>
      <h1>Hello Questions</h1>
      <div>
        {quest.question}
      </div>
      <ul>
        {/* {quest?.map((entry, idx) => (
          <div key={idx}>
            {entry.question}
            <Options opt={entry.options} ></Options>
          </div>
        ))} */}
      </ul>
    </>
  )
}

export default Qportal