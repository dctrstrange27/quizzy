import React, { useEffect, useState } from 'react'
import { API } from '../utils'
import Options from './Options'
import Qportal from './Qportal'
const Question = ({currentQ,setCurrentQ,current,id, getSpecificQuestion,handleQuestion }) => {



  function generateRandomNumber(min, max) {
    const randomNumber = Math.random();
    const scaledNumber = Math.floor(randomNumber * (max - min + 1) + min);
    return scaledNumber;
  }

  

  // useEffect(()=>{
  //   handleQuestion(currentQ)
  // },[currentQ])

  const next = () => {
    handleQuestion(currentQ)
    setCurrentQ(generateRandomNumber(0,9))
  }

  useEffect(()=>{
    getSpecificQuestion()
  },[])


  return (
    <>
      <div className="w-full h-fit mt-28 flex justify-center items-center border-[2px] border-[#700a0a]">
        <div className="">
              <Qportal question={current} ></Qportal>
          <button onClick={() => { next() }} className="nav">Next</button>
        </div>
      </div>
    </>
  )
}

export default Question