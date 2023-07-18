import { useEffect, useState } from "react";
import Options from "./Options";

const Qportal = ({
  questions,
  quest,
  random,
  handleQuestion,
  handleHideQuestions,
  arr,
  incrementScore,
  setScale,
  scale,
  total,
  setTotal,
}) => {

  const [count , setCount] =useState(1)
  console.log(questions.questions)

  function handleProgress() {
    setTotal(questions?.questions?.length)
    setScale(scale + 100/total);
    setCount(count + 1)
    // console.log(scale)
    return scale;
  }
  return (
    <>
      <div className=" border-[1px rounded-2xl dark:bg-[#24252681] border-[#0000004b] shadow-xl w-full flex flex-col px-3 -mt-24  mx-4 my-2">
        <h1 className="font-grot border-[1px py-3 text-2xl dark:text-[#ffff]">
          {questions?.subjectCode}
        </h1>
        <div className=" flex gap-2 items-center text-start border-[1px w-full px-2 border-[#000] dark:text-[#ffff]">
          <h1 className="text-[17px] font-bold">Question</h1>
          <h2 className="text-[19px] font-bold">{count}/{total}</h2>
          <div  style={{ width: `${total}%` }}  className={`h-2 w-[${total}%] bg-five rounded-full border-[1px`}>
          <div
              style={{ width: `${scale}%` }}
              className="h-2  rounded-full bg-p2"
            />
          </div>
          
        </div>
        {quest == undefined ? (
          ""
        ) : (
          <div>
            <div className="font-bold tracking-normal text-[23px] text-2xl py-4 text-justify text-[#2c2b2b] dark:text-[#ffff] border-[1px">
              {quest?.question}
            </div>
            <div className="mb-8 border-[1px px-4">
              <Options
                handleQuestion={handleQuestion}
                random={random}
                quest={quest}
                handleHideQuestions={handleHideQuestions}
                arr={arr}
                incrementScore={incrementScore}
                handleProgress={handleProgress}
              ></Options>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Qportal;
