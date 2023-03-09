import React, { useEffect, useState } from 'react'
import { API } from '../utils'
import Qportal from './Qportal'
const Question = ({ quest, id }) => {

  const [question, setQuestion] = useState([])


  useEffect(() => {
    const getQuestion = async () => {
      const data = await API.post("/getQuestion", {
        id: id
      })
      setQuestion(data.data)
    }
    getQuestion()
  }, [])
  return (

    <>
      <div className="w-full h-screen flex justify-center items-center border-[2px] border-[#700a0a]">
        <div className="">
          {question.map((q,idx) => (
            <Qportal key={idx} question={q} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Question