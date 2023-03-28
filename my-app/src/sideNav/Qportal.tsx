import { useEffect, useState } from "react";
import Options from "./Options";

const Qportal = ({ 
  questions, 
  quest, 
  random, 
  handleQuestion, 
  disabled,
  handleHideQuestions,
  arr,
  incrementScore,
  setArr
 }) => {    
  const [isSelected, setIsSelected] = useState(false);
  const [score,setScore] = useState(0)
  
  const handleSelect = () => {
    setIsSelected(true);
  };

  function handleProgress(){
    setScore(score+1)
  }


  console.log(score)
  return (
    <>
      <div className="border-[1px w-full flex flex-col px-2 mx-2 my-2">
        <h1 className="font-grot border-[1px py-3 text-2xl">
          {questions?.subjectCode}
        </h1>
        
        <progress
                className="progress rounded-full text-xs progress-primary w-full"
                value={score}
                max={questions?.questions?.length}
              />
        {quest == undefined ? (
          ""
        ) : (
          <div>
            <div className="font-extrabold text-[23px] text-2xl py-4 text-justify text-[#2c2b2b] border-[1px">
              {quest?.question}
            </div>
            <div className="mb-8 border-[1px px-4">
              <Options
                disabled={disabled}
                handleQuestion={handleQuestion}
                random={random}
                quest={quest}
                handleHideQuestions={handleHideQuestions}
                arr={arr}
                incrementScore={incrementScore}
                isSelected={isSelected}
                setArr={setArr}
                handleProgress={handleProgress}
                handleSelect={handleSelect}
              ></Options>
              {/* {options?.map((opt,idx)=>(
                  <div key={idx}>
                    <Options opt={opt} isSelected={isSelected} handleSelect={handleSelect}></Options>
                  </div>  
                ))} */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Qportal;
