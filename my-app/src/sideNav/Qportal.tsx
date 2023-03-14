import React, { useState } from 'react'
import { useEffect } from 'react'
import Options from './Options'

const Qportal = ({questions}) => {

  // const { options } = question;
  // console.log(options)
  console.log(questions)
  return (
    <>
      <h1>Hello Questions</h1>
      <h1 className='font-grot border-[1px text-2xl'>{questions?.subjectCode}</h1>
      <ul>
        {/* {Object.keys(options).length == 0 ?(""):(Object.keys(options).map((key) => (
          <li key={key}>{options[key]}</li>
        )))} */}
      </ul>
    </>
  )
}

export default Qportal