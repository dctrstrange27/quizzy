import { copyFileSync, cpSync } from "fs";
import { useEffect } from "react";
import { useState } from "react";
import correctSound from "../assets/correct.wav";
import wrongSound from "../assets/wrong.mp3";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { queryByTestId } from "@testing-library/react";

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
  

  const [questionType,setQuestionType] = useState()

  function check(){
    let correctAns = undefined
    if(questionType == 1){
      return correctAns = quest.answerKey;
    } 
    if(questionType == 0){
      return correctAns = quest.answerKey;
    } 
  }
  useEffect(()=>{
    check()
    setQuestionType(quest.questiontype)

  },[])

  const correctAns = check()
  const [isSelected, setIsSelected] = useState(false);
  const [key, setkey] = useState("");
  const [res, setRes] = useState("");

  const[True,setIsTrue]= useState(null) 

  const [disableCheckBtn, setDisableCheckBtn] = useState(false);

  
  const correct=()=>{
    new Audio(correctSound).play();
    setRes("Correct!");
  }
  const wrong=()=>{
    incrementScore();
    setRes("Wrong!");
    new Audio(wrongSound).play();
  }

  const handleCheckAns = () => {
    if(questionType == 1 || questionType == 0){
      if (key === correctAns) {
        correct()
      } else {
        wrong()
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
  let convertBoolean = key == isSelected.toString() ? "true": "false"
  


  // const sampleOptions = [
  //   {
  //     "question": "What is the capital city of France?",
  //     "answerKey": "b",
  //     "questiontype": "1",
  //     "options": {
  //         "a": "London",
  //         "b": "Paris",
  //         "c": "Berlin",
  //         "d": "Rome"
  //     }
  // },
  // {
  //     "question": "Pacific ocean is the largest ocean in the world?",
  //     "answerKey": "true",
  //     "questiontype": "0",
  //     "options": {
  //          "a":"true",
  //          "b":"true",
  //     }
  // },
  // {
  //     "question": "What is the smallest planet in our solar system?",
  //     "answerKey": "Mercury",
  //     "questiontype": "2",
  //     "options": {
  //       "a":"Mercury"
  //     }
  // },
  // ]
  return (
    <>
      <div>
        {/* <div>
        {sampleOptions.map((e,idx)=>(
          <Opt key={idx} options={e.options}></Opt>
        ))}
        </div> */}

        {Object.keys(quest?.options).map((e) => (
          <div key={e} className="flex border-[1px">
            {/* Multiple Choices */}
            {}

            {questionType == 1 &&
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
                  setIsSelected(true);
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
            }

            {/* Identification */}
            {questionType == 2 && 
              <input className="w-full h-12 border-[2px] px-4 text-[20px] border-b1 rounded-2xl">
              </input>
            }
            {/* true or false */}
            {questionType == 0 && 
            <button
            disabled={disableCheckBtn}
            className={`choices cursor-pointer w-full ${
              disableCheckBtn
                ? `pointer-events-none${
                    e == correctAns
                      ? " border-[#06ff8f] border-[2px] from-[#Fff] to-[#033465bf] bg-gradient-to-r"
                      : " border-[#b32a2a6e] bg-[#ffff] from-white5 to-[#e73b3b7e] bg-gradient-to-r border-[3px]"
                  }`
                : `${key == e
                      ? "from-[#fff] border-[3px] to-b2 bg-gradient-to-r "
                      : ""
                  }`
            } `}
            onClick={() => {
              setkey(e);
              setIsTrue(quest?.options[e])
              setIsSelected(true);
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
          }
          </div>
        ))}
      </div>
      <>{res}</>

      <div className="border-[1px py-2 flex px-2 justify-end my-3 gap-2">
        <button
          disabled={disableCheckBtn || key == ""}
          className={`${
            disableCheckBtn || key == "" ? "disabledBtn" : "questionB"
          }`}
          onClick={() => {
            handleCheckAns();
          }}
        >
          CHECK ANSWER
        </button>
        <button
          disabled={!disableCheckBtn}
          onClick={() => {
            handleOnNext();
          }}
          className={`questionB uppercase ${
            !disableCheckBtn
              ? "bg-[#0000007b] hover:transform-none"
              : "bg-[#154a72]"
          } `}
        >
          {arr.length == 9 ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};

export default Options;
