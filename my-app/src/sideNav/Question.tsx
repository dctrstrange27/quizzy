import React, { useEffect, useState } from "react";
import { getCurrentQ, getCurrentQuestion, getQuestionOnly, saveCurrentQ } from "../utils";
import Qportal from "./Qportal";

//const getCurrentQFLS = localStorage.getItem("currentQ") !== undefined ? JSON.parse(localStorage.getItem("currentQ")) : []

const Question = ({
  questions,
  setQuestion,
  questionsOnly,
  setQuestionOnly,

}) => {
  const [currentQ, setCurrentQ] = useState([]);
  const [disabled, setDisable] = useState(false);
  const [random, setRandom] = useState(0);
  const [arr, setArr] = useState([]);

  //random number generattor
  const generateRandomNum = () => {
    console.log(arr)
    let x = true
    if (Object.keys(arr).length == 10) {
      setDisable(true);
      console.log(disabled)
      console.log("array length exceed!")
      return
    }
    try {
      while(x){
        let randomNum = Math.floor(Math.random() * 10);
        if(!arr.includes(randomNum)){
          setRandom(randomNum)
          arr.push(randomNum)
          x = false
          }
        randomNum = Math.floor(Math.random() * 10);
      }
    } catch (error) {
      console.log(error)
    }

  };
  //handling questions every next
  const handleQuestion = (rand = 0) => {
    handleCurrentQ(rand);
    generateRandomNum();
  };

  //filter specific questions
  const handleCurrentQ = (id) => {
    const currentQuestion = questionsOnly.find((e, idx) => idx == id);
    setCurrentQ(currentQuestion);
    saveCurrentQ(currentQuestion)
  };

  useEffect(() => {
    // console.log(currentQ)
    handleQuestion(0)    
    setQuestion(getCurrentQuestion())
  }, []);

  return (
    <>
      <div
        className="h-fit mt-28 flex justify-center items-center border-[1px m-auto w-full border-[#700a0a]
                       md:w-[50%]
                      "
      >
        <div className="">
          <Qportal
            disabled={disabled}
            random={random}
            handleQuestion={handleQuestion}
            quest={currentQ}
            questions={questions}
          ></Qportal>
        </div>
      </div>
    </>
  );
};

export default Question;
