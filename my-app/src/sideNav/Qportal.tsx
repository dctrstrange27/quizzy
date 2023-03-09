import React, { useState } from 'react'
import { useEffect } from 'react'

const Qportal = ({question}) => {

  const [options, setOptions] = useState([])


  useEffect(() => {
      setOptions(question.options)
      console.log(options)
  }, [])
  

  return (
    <>
        <h1 className=' font-grot text-2xl'>{question.question}</h1>
        <h3>{options.map((opt)=>(
          <>
            {opt}
          </>
        ))}</h3>
    
    
    </>
  )
}

export default Qportal