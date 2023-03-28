import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getCurrentQ,
  generateRandomNum,
  getCurrentQuestion,
  getQuestionOnly,
  saveCurrentQ,
} from "../utils";
import Qportal from "./Qportal";

const Question = ({
  questions,
  setQuestion,
  setQuestionOnly,
  setCurrentQ,
  currentQ,
  disabled,
  random,
  handleQuestion,
  handleHideQuestions,
  arr,
  setArr,
}) => {
  const [score, setScore] = useState(0);
  const Navigate = useNavigate()

  function incrementScore() {
    setScore(score + 1);
  }

  useEffect(() => {
    if (!getCurrentQ()) {
      handleQuestion(generateRandomNum());
    }
    setCurrentQ(getCurrentQ());
    setQuestion(getCurrentQuestion());
    setQuestionOnly(getQuestionOnly());
  }, []);

  return (
    <>
      <div
        className="h-fit mt-28 flex justify-center items-center border-[.2px py-4
                   m-auto w-full shadow-md rounded-2xl border-[#00000032] md:max-w-2xl"
      >
        {!disabled ? (
          <Qportal
            disabled={disabled}
            random={random}
            handleHideQuestions={handleHideQuestions}
            arr={arr}
            handleQuestion={handleQuestion}
            quest={currentQ}
            questions={questions}
            incrementScore={incrementScore}
            setArr={setArr}
          ></Qportal>
        ) : (
          <div>
            <h1 className=" font-extrabold text-[30px]">
              {arr.length + 1 - score}/{arr.length + 1}
            </h1>
            <h1>score</h1>
            <div className="flex w-full border-[1px gap-10">
              <button className="questionB w-28" onClick={() => { window.location.reload();}}>
                Try Again
              </button>
              <button onClick={()=>{  
                localStorage.setItem("currentQ", JSON.stringify([]))
                Navigate('/shared')
                window.location.reload();
               
               }}  className="questionB w-24">Back</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
