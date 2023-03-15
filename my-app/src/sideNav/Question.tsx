import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API, getCurrentQuestion, getCurrentQuestionOnly } from '../utils'
import Options from './Options'
import Qportal from './Qportal'
const Question = ({
  getSubject,
  questions,
  setQuestion,
  questionOnly,
  setQuestionOnly,
}) => {

  const Navigate = useNavigate()

  function getRandom(min, max) {
    const randomNumber = Math.random();
    const scaledNumber = Math.floor(randomNumber * (max - min + 1) + min);
    return scaledNumber;
  }

  const handleQuestion=()=>{
    const random = getRandom(0,9)
    console.log(random)
    setQuestionOnly(questionOnly.find((e,idx)=> random === idx))
  
  }



  useEffect(()=>{
    setQuestion(getCurrentQuestion())
    setQuestionOnly(getCurrentQuestionOnly())
    handleQuestion()
  },[])

  return (
    <>
      <div className="w-full h-fit mt-28 flex justify-center items-center border-[2px] border-[#700a0a]">
        <div className="">
          <Qportal quest={questionOnly} questions={questions}></Qportal>
          <button onClick={() => {handleQuestion() }} className="nav">Next</button>
        </div>
      </div>
    </>
  )
}

export default Question