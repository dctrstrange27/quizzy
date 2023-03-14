import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API, getCurrentQuestion, getID } from '../utils'
import Options from './Options'
import Qportal from './Qportal'
const Question = ({
  getSubject,
  questions,
  setQuestion
}) => {

  const Navigate = useNavigate()

  // function generateRandomNumber(min, max) {
  //   const randomNumber = Math.random();
  //   const scaledNumber = Math.floor(randomNumber * (max - min + 1) + min);
  //   return scaledNumber;
  // }

  useEffect(()=>{
    setQuestion(getCurrentQuestion())
  },[])


  return (
    <>
      <div className="w-full h-fit mt-28 flex justify-center items-center border-[2px] border-[#700a0a]">
        <div className="">
          <Qportal questions={questions}></Qportal>
          <button onClick={() => { }} className="nav">Next</button>
        </div>
      </div>
    </>
  )
}

export default Question