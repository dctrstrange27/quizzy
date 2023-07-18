import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentQ,
  getCurrentQuestion,
  getQuestionOnly,
} from "../utils";
import Qportal from "./Qportal";

const Question = ({
  questions,
  setQuestion,
  setQuestionOnly,
  setCurrentQ,
  disabled,
  random,
  handleQuestion,
  handleHideQuestions,
  arr,
  setArr,
  setInQportal,
}) => {
  
  const [score, setScore] = useState(0);
  const Navigate = useNavigate()
  const [scale, setScale] = useState(1);
  const [total,setTotal] = useState(getQuestionOnly().length)
  function incrementScore() {
    setScore(score + 1);
  }

  
  useEffect(() => {
      if (!getCurrentQ()) {
        handleQuestion();
      } 
      setCurrentQ(getCurrentQ());
      setQuestion(getCurrentQuestion());
      setQuestionOnly(getQuestionOnly());
  }, []);
  return (
    <>
      <div
        className="h-[80vh] mt-10 flex justify-center items-center border-[.2px py-4
                   m-auto w-full rounded-2xl border-[#00000032] md:max-w-2xl"
      >
        {!disabled ? (
          <Qportal
            setScale={setScale}
            scale={scale}
            random={random}
            arr={arr}
            handleHideQuestions={handleHideQuestions}
            handleQuestion={handleQuestion}
            quest={getCurrentQ()}
            questions={questions}
            incrementScore={incrementScore}
            total={total}
            setTotal={setTotal}
          ></Qportal> 
          ) : (
          <div>
            <h1 className=" font-extrabold text-[30px] text-[#000] dark:text-[#e1e1e1]">
              {arr.length - score}/{arr.length}
            </h1>
            <h1>score</h1>
            <div className="flex w-full border-[1px gap-10">
              <button className="questionB w-28" onClick={() => {
                   window.location.reload();   
                }}> 
                Try Again
              </button>
              <button onClick={()=>{  
              //  localStorage.setItem("currentQ", JSON.stringify([]))
                Navigate('/shared')
               }}  className="questionB w-24">Back</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
