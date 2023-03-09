import React, { useEffect } from 'react'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import Subject from './Subject'
import { useState } from 'react'
import { API } from '../utils'
const Shared = ({ handleShowProfile,getId }) => {

  const [showSub, setShowSub] = useState(true)
  const [questions, setQuestions] = useState([]);

  const getQuestion=async()=>{
      const getQuestion = await API.post('/getSubject')
      setQuestions(getQuestion.data);
      console.log(questions)
  }

  useEffect(()=>{
      getQuestion()
      console.log(questions)
  },[])

  return (
    <div onClick={() => {
      handleShowProfile()
    }}
      className='flex-col px-6 w-full md:ml-[20%] md:max-w-xl
        lg:max-w-[50rem] 2xl:max-w-[70rem] 3xl:max-w-[70rem]
         border-[2px border-[#700a0a] '>
      <div className='shared font-nuni w-full md:min-w-[35rem] md:max-w-[65rem] flex flex-col h-[20%] border-[1px px-20 mt-28 mb-5 
                      gap-2 justify-center items-center'>
        <BsFillJournalBookmarkFill className='w-5 h-5 text-[#041b2d]' />
        <h1 className='font-bold text-base'>Reviewers</h1>
        <p className='font-light text-sm max-w-md'>These are reviewers/questions that are created & shared
          by different students to practice for their exam. </p>
        {/* sample */}
      </div>
      <div className='py-2 '>
        {
          questions.map((quest,id)=>(  
              <Subject key={id} getId={getId} quest={quest} ></Subject>
          ))
        }
      </div>
    </div>
  )
}

export default Shared