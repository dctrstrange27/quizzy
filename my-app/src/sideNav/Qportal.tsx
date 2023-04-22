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
  setArr,
  setScale,
  scale,
  total,
  setTotal,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [questionType,setQuestionType] = useState("")

  const handleSelect = () => {
    setIsSelected(true);
  };
  
  function handleProgress() {
    setTotal(questions?.questions?.length)
    setScale(scale + 10);
    console.log(scale)
    return scale;
  }

  return (
    <>
      <div className=" border-[1px rounded-2xl border-[#0000004b] shadow-xl w-full flex flex-col px-3 -mt-24  mx-4 my-2">
        <h1 className="font-grot border-[1px py-3 text-2xl">
          {questions?.subjectCode}
        </h1>
        <div className="w-fit flex gap-2 items-center text-start border-[1px border-[#000]">
          <h1 className="text-[17px] font-bold">Question</h1>
          <h2 className="text-[19px] font-bold">{scale/10}/{total}</h2>
          <div   style={{ width: `${total*10}px` }} className={`h-2 bg-b1 rounded-full`}>
            <div
              style={{ width: `${scale}px` }}
              className="h-2 rounded-full bg-p2"
            />
          </div>
        </div>
        {quest == undefined ? (
          ""
        ) : (
          <div>
            <div className="font-bold tracking-normal text-[23px] text-2xl py-4 text-justify text-[#2c2b2b] border-[1px">
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
