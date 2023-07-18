import { ConnectionStates } from "mongoose";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../src/utils/ContextTypes";
import { shuffleRandomArray } from "../utils";
import Options from "./Options";

const Qportal = () => {
  const {subject,handleNext,question,currentQuestion,arr,options} = useContext(GlobalContext);
  
  useEffect(()=>{
    handleNext(subject,arr)
  },[])

  return (
    <div>
      <h1>{question}</h1>
      <div className="mb-8 border-[1px px-4">
              <Options
                quest={currentQuestion}
              ></Options>
            </div>
      <button
        className="button"
        onClick={() => {
          handleNext(currentQuestion,arr);
        }}>
        next
      </button>
    </div>
  );
};

export default Qportal;
