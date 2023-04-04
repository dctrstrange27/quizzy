import { copyFileSync, cpSync } from "fs";
import { useEffect } from "react";
import { useState } from "react";
import correctSound from "../assets/correct.wav";
import wrongSound from "../assets/wrong.mp3";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { queryByTestId } from "@testing-library/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { getQuestionOnly } from "../utils";

// const Opt =({options})=>{
//   console.log(options)
//   return(<>
//       {Object.keys(options).map((e)=>(
//         <div key={e}>{options[e]}</div>
//       ))}

//   </>
//   )
// }

const Options = ({
  handleSelect,
  quest,
  disabled,
  handleQuestion,
  random,
  handleHideQuestions,
  incrementScore,
  arr,
  handleProgress,
  setArr,
  total,
}) => {
  const [questionType, setQuestionType] = useState();
  const [count, setCount] = useState(0);

  const check=()=> quest.answerKey

  useEffect(() => {
    check();
    setQuestionType(quest.questiontype);
  }, []);

  const correctAns = check()
  const [key, setkey] = useState("");
  const [res, setRes] = useState("");
  const [ansInIndetification, setAnsInIdentification] = useState("");

  const [isSelected, setIsSelected] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [disableCheckBtn, setDisableCheckBtn] = useState(false);
  const [useMode,setUseMode] = useState(false)


  const correct = () => {
    new Audio(correctSound).play();
    setRes("Correct! 👍");
  };

  const wrong = () => {
    incrementScore();
    setRes("Wrong! 😥");
    new Audio(wrongSound).play();
  };

  const handleCheckAns = () => {
    if (questionType == 1 || questionType == 0) {
      if (key === correctAns) {
        correct();
      } else {
        wrong();
      }
    }
    if (questionType == 2) {
      if (ansInIndetification == correctAns) {
        correct();
      } else {
        wrong();
      }
    }
    setDisableCheckBtn(true);
  };

  const handleOnNext = () => {
    if (arr.length == quest.length - 1) {
      handleHideQuestions();
    }
    handleQuestion(random);
    setDisableCheckBtn(false);
    setkey("");
    setRes("");
    handleProgress();
  };

  const handleOnChange = (e) => {
    setAnsInIdentification(e.target.value);
  };

  const handleUseMode=()=>{
     if(questionType == 1 || questionType == 0){
      setUseMode(true)
     }
     if(questionType == 2){
      setUseMode(false)
     }
  }
  console.log(useMode)

  useEffect(() => {
    if (questionType == 2) {
      if (ansInIndetification != "") {
        setIsSelected(false);
        console.log("is selected or empty "+ isSelected)
      } else {
        setIsSelected(true);
        console.log("is selected or not "+ isSelected)
      }
    }
  }, [ansInIndetification]);

  console.log(questionType)
 useEffect(()=>{
   handleUseMode()
 },[useMode])

  const handleQuestionTypeOneAndZero = () => {
    return (
      <>
        <h1>this is type 1</h1>
        {Object.keys(quest?.options).map((e) => (
          <div key={e}>
            <button
              disabled={disableCheckBtn}
              className={`choices cursor-pointer w-full ${
                disableCheckBtn
                  ? `pointer-events-none${
                      e == correctAns
                        ? " border-[#06ff8f] border-[2px] from-[#Fff] to-[#033465bf] bg-gradient-to-r"
                        : " border-[#b32a2a6e] bg-[#ffff] from-white5 to-[#e73b3b7e] bg-gradient-to-r border-[3px]"
                    }`
                  : `${
                      key == e
                        ? "from-[#fff] border-[3px] to-b2 bg-gradient-to-r "
                        : ""
                    }`
              } `}
              onClick={() => {
                setkey(e);
                setIsSelected(false);
                // console.log(isSelected);
              }}
            >
              {quest?.options[e]}
              <div className="flex items-center">
                {key == e ? (
                  <ImCheckboxChecked className="w-5 h-5 ease-in-out p-0 duration-700 text-b1 rounded-md bg-[#fff]"></ImCheckboxChecked>
                ) : (
                  <ImCheckboxUnchecked className="w-5 h-5 text-[#fff0] border-[1px] shadow-lg border-[#0000001f] rounded-md"></ImCheckboxUnchecked>
                )}
              </div>
            </button>
          </div>
        ))}
      </>
    );
  };

  const handleQuestionTypeTwo = () => {
    return (
      <>
        <h1>this is type 2</h1>
        <input
          onChange={handleOnChange}
          value={ansInIndetification}
          className="w-full border-[1px] rounded-2xl h-11 px-4"
        ></input>
      </>
    );
  };
  
  return (
    <>
      <div className="border-[1px">
        {useMode ? handleQuestionTypeOneAndZero()
          : handleQuestionTypeTwo()}
      </div>
      <>{res}</>
      <div className="border-[1px py-2 flex px-2 justify-end my-3 gap-2">
        <button
          disabled={isSelected}
          className={`${isSelected ? "disabledBtn" : "questionB"}`}
          onClick={() => {
            handleCheckAns();
            setDisableCheckBtn(true);
            setIsSelected(true);
            handleUseMode()
          }}
        >
          CHECK ANSWER
        </button>
        <button
          disabled={!disableCheckBtn}
          onClick={() => {
            handleOnNext();
            setCount(count + 1);
            setDisableCheckBtn(false);
            setIsSelected(false)
            handleUseMode()
          }}
          className={`questionB uppercase ${
            !disableCheckBtn
              ? "bg-[#0000007b] hover:transform-none"
              : "bg-[#154a72]"
          } `}
        >
          {arr.length == getQuestionOnly().length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};

export default Options;
