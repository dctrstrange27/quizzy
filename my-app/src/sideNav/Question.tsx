import React, { useEffect, useState } from "react";
import { couldStartTrivia } from "typescript";
import { getCurrentQ, getCurrentQuestion, getQuestionOnly, saveCurrentQ } from "../utils";
import Qportal from "./Qportal";

const Question = ({
  questions,
  setQuestion,
  questionsOnly,
  setQuestionOnly,
}) => {
  const [currentQ, setCurrentQ] = useState<any | null>(null);
  const [disabled, setDisable] = useState(false);
  const [random, setRandom] = useState(0);
  const [arr, setArr] = useState([]);

  
  const generateRandomNum=()=>{ return Math.floor(Math.random() * 10)} 
  //handling questions every next
  const handleQuestion = (id) => {
    if (arr.length == 10) {setDisable(true);return}
    let x = true
    while(x){
        let randomNum = generateRandomNum()
        if(!arr.includes(randomNum)){
          setRandom(randomNum)
          arr.push(randomNum)
          x = false
          }
        randomNum = generateRandomNum()
      }
      const currentQuestion = questionsOnly.find((e, idx) => idx == id);
      setCurrentQ(currentQuestion);
      saveCurrentQ(currentQuestion)
  };

  useEffect(() => {
    setCurrentQ(getCurrentQ())
    handleQuestion(generateRandomNum())
    setQuestion(getCurrentQuestion())
    setQuestionOnly(getQuestionOnly())
  }, []);
  
  return (
    <>
      <div
        className="h-fit mt-28 flex justify-center items-center border-[.2px] 
                   m-auto w-full shadow-md rounded-2xl border-[#00000032] md:max-w-2xl">
          <Qportal
            disabled={disabled}
            random={random}
            handleQuestion={handleQuestion}
            quest={currentQ}
            questions={questions}
          ></Qportal>
      </div>
      {questionsOnly.map((q,idx)=>(
              <div key={idx}> 
                <h1>{q.question}</h1>
              </div>
           ))}
    </>
  );
};

export default Question;
