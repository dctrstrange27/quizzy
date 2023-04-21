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
    return scale;
  }

  return (
    <>
      <div className=" border-[1px] rounded-2xl border-[#0000004b] shadow-xl p-5 w-full flex flex-col px-2 -mt-24  mx-2 my-2">
        <h1 className="font-grot border-[1px py-3 text-2xl">
          {questions?.subjectCode}
        </h1>
        <div className="w-fit flex gap-2 items-center text-start border-[1px border-[#000]">
          <h1 className="text-[17px] font-bold">Question</h1>
          <h2 className="text-[19px] font-bold">{scale/10}/{total}</h2>
          <div className="w-20 h-2 bg-b1 rounded-full">
            <div
              style={{ width: `${scale}%` }}
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
