import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../src/utils/ContextTypes";
import { getCurrentArray, getCurrentSubject, saveCurrentArray, saveCurrentQuestion, saveCurrentSubject, shuffleRandomArray } from "../utils";
import Options from "./Options";

const Qportal = () => {
  const { subject,currentSubject,setSubject,setArr, handleNext, question, arr, options, len } =
    useContext(GlobalContext);

  const Navigate = useNavigate()
  const [scale, setScale] = useState(1);
  const [count, setCount] = useState(1);
  const [finish, setIsFinish] = useState(false);
  const [score, setScore] = useState(0)
  
  useEffect(() => {
    handleNext(arr)
  }, []);

  function handleProgress() {
    setScale(scale + 100 / len);
  }
  return (
    <div
      className="h-[80vh] border-[1px mt-10 flex justify-center items-center border-[.2px py-4
      m-auto w-full rounded-2xl border-[#00000032] md:max-w-2xl"
    >
      {finish == true ? (
        <>
          <div>
            <h1 className=" font-extrabold text-[30px] text-[#000] dark:text-[#e1e1e1]">
              {score}/{len}
            </h1>
            <h1>score</h1>
            <div className="flex w-full border-[1px gap-10">
              <button
                className="questionB w-28"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  Navigate('/shared')
                }}
                className="questionB w-24"
              >
                Back
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col rounded-xl border-[#5050502a] p-10 border-[1px] gap-2 w-full h-fit">
            <div className="border-[1px">
              <h1 className="font-grot border-[1px py-3 text-2xl dark:text-[#ffff]">
                {subject.subjectCode}
              </h1>
              <div className=" flex gap-2 items-center text-start border-[1px w-full px-2 border-[#000] dark:text-[#ffff]">
                <h1 className="text-[17px] font-bold">Question:</h1>
                <h2 className="text-[19px] font-bold">
                  {count}/{len}
                </h2>
                <div
                  style={{ width: `${len}%` }}
                  className={`h-2 w-[${len}%] bg-five rounded-full border-[1px`}
                >
                  <div
                    style={{ width: `${scale}%` }}
                    className="h-2  rounded-full bg-p2"
                  />
                </div>
              </div>
            </div>
            <div className="border-[1px p-5 rounded-2xl dark:bg-[#24252681] border-[#0000004b] shadow-xl w-full flex flex-col px-3 my-2">
              <h1 className="font-bold tracking-normal text-[23px] text-2xl py-4 text-justify text-[#2c2b2b] dark:text-[#ffff] border-[1px">
                {question}
              </h1>
              <div className="mb-8 border-[1px px-4">
                <Options
                  count={count}
                  handleProgress={handleProgress}
                  setCount={setCount}
                  setIsFinish={setIsFinish}
                  setScore={setScore}
                  finish={finish}
                ></Options>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Qportal;
