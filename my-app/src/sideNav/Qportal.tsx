import React, { useState } from 'react'
import { useEffect } from 'react'
import Options from './Options'

const Qportal = ({ question }) => {
  const { options } = question;
  console.log(options)
  return (
    <>
      <h1 className='font-grot border-[1px text-2xl'>{question.question}</h1>
      <ul>
        {/* {Object.keys(options).map((key) => (
          <li key={key}>{options[key]}</li>
        ))} */}
      </ul>


    </>
  )
}

export default Qportal