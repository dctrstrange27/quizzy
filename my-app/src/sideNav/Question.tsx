import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentQ,generateRandomNum, getCurrentQuestion, getQuestionOnly, saveCurrentQ } from "../utils";
import Qportal from "./Qportal";

const Question = ({
  questions,
  setQuestion,
  questionsOnly,
  setQuestionOnly,
  setCurrentQ,
  currentQ,
  disabled,
  random,
  handleQuestion
}) => {
 
  useEffect(() => {
    if(!getCurrentQ()){
      handleQuestion(generateRandomNum())
      console.log(getCurrentQ())
    }
    setCurrentQ(getCurrentQ())
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
    </>
  );
};

export default Question;
