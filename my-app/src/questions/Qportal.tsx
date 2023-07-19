import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../src/utils/ContextTypes";
import { API } from "../utils";
import {
  getCurrentArray,
  getCurrentSubject,
  saveCurrentArray,
  saveCurrentQuestion,
  saveCurrentSubject,
  shuffleRandomArray,
} from "../utils";
import Options from "./Options";



const Qportal = () => {
  const {
    subject,
    question,
    len,
    arr,
    setLen,
  } = useContext(GlobalContext);

  const currentSubjectFromLocal =  JSON.parse(localStorage.getItem("subject") || '[]');
  const currentArrayFromLocal =  JSON.parse(localStorage.getItem("array") || '[]');

  const Navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [count, setCount] = useState(1);
  const [finish, setIsFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentSubject,setCurrentSubject] = useState(currentSubjectFromLocal)
  const [currentArray,setCurrentArray] = useState(currentArrayFromLocal)
  const [currentQuestion,setCurrentQuestion] = useState([])

  const handleNext =()=>{
    let random = currentArray.pop()
    const current = currentSubject?.questions?.find((quest) => quest.id === random);
    setCurrentQuestion(current)
  }
  useEffect(() => {
    setCurrentSubject(currentSubject)
    setCurrentArray(currentArray)
    setLen(currentSubject.questions.length)
    handleNext()
  }, []);
  
  function handleProgress() {
    setScale(scale + 100 / len);
  }
  return (
    <div
      className="h-[80vh] border-[1px flex justify-center items-center border-[.2px py-4
      m-auto w-full rounded-2xl border-[#00000032] md:max-w-2xl"
    >
      {!showQuestion ? (
        <div className="flex flex-col">
           <h1 className="font-grot border-[1px py-3 text-2xl dark:text-[#ffff]">
                      {currentSubject.subjectCode}
                    </h1>
          <button onClick={() => {setShowQuestion(prev => !prev)}} className="button questionB">
            start
          </button>
        </div>
      ) : (
        <>
          {" "}
          <div className="border-[1px w-full">
            {finish == true ? (
              <>
                <div className="border-[1px">
                  <h1 className=" font-extrabold text-[30px] text-[#000] dark:text-[#e1e1e1]">
                    {score}/{len}
                  </h1>
                  <h1>score</h1>
                  <div className="flex w-full justify-center  border-[1px gap-10">
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
                        Navigate("/shared");
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
                <div className="flex  flex-col rounded-2xl dark:bg-[#24252681] border-[#0000004b] shadow-xl p-5  gap-2 w-full h-fit">
                  <div className="border-[1px">
                    <h1 className="font-grot border-[1px py-3 text-2xl dark:text-[#ffff]">
                      {currentSubject.subjectCode}
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
                  <div className="border-[1px p-5  w-full flex flex-col px-3 my-2">
                    <div className="mb-8 border-[1px px-4">
                      <Options
                        handleNext={handleNext}
                        count={count}
                        handleProgress={handleProgress}
                        setCount={setCount}
                        setIsFinish={setIsFinish}
                        setScore={setScore}
                        finish={finish}
                        currentQ={currentQuestion}
                        arr={currentArray.length}
                      ></Options>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Qportal;
