import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import correctSound from "../assets/correct.wav";
import wrongSound from "../assets/wrong.mp3";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { getQuestionOnly } from "../utils";
import { BsArrowReturnRight } from "react-icons/bs";
import { GlobalContext } from "../utils/ContextTypes";
import { couldStartTrivia } from "typescript";
const Options = ({
  setCount,
  count,
  handleProgress,
  setIsFinish,
  finish,
  setScore,
  currentQ,
  handleNext,arr
}) => {
 

  const [key, setkey] = useState("");
  const [res, setRes] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [disableCheckBtn, setDisableCheckBtn] = useState(false);
  const [checkAns, setCheckAns] = useState(false);

  let correctAns = currentQ?.answerKey || "";

  

  const handleOnChange = (e) => {
    setkey(e.target.value);
  };
  const correct = () => {
    new Audio(correctSound).play();
    setRes("Correct! 👍");
  };
  const wrong = () => {
    setRes("Wrong! 😥");
    new Audio(wrongSound).play();
  };
  const handleCheckAns = () => {
    if (correctAns == key) {
      correct();
      setScore((prev: any) => prev + 1);
    } else {
      wrong();
    }
    setDisableCheckBtn(true);
  };

  useEffect(() => {
    if (key == "") {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  }, [key]);

  return (
    <>
      <div className="border-[1px">
      <h1 className="font-bold tracking-normal text-[23px] text-2xl py-4 text-justify text-[#2c2b2b] dark:text-[#ffff] border-[1px">
                      {currentQ?.question}
                    </h1>
        { currentQ?.options != "" ? (
          currentQ?.options?.map((e,idx) => (
            <div key={idx}>
              {currentQ.questionType === 1 || currentQ.questionType === 0 ? (
                <button
                  disabled={disableCheckBtn}
                  className={`choices cursor-pointer w-full text-five  dark:text-[#fff] ${
                    disableCheckBtn
                      ? `pointer-events-none${
                          e.key == correctAns
                          ? " border-[#36D399] border-[2px] dark:border-[3px] dark:from-[#36d39911] dark:to-[#36D399]  from-[#Fff] to-[#033465bf] bg-gradient-to-r"
                          : " border-[#b32a2a6e] dark:border-[3px] dark:from-[#91515918] dark:to-[#915157]  from-white5  to-[#e73b3b7e] bg-gradient-to-r border-[3px]"
                        }`
                      : `${
                          key == e.key
                          ? "from-[#fff] border-[3px]  dark:from-[#ea449233] dark:to-[#004e9a]  to-b2 bg-gradient-to-r "
                          : " dark:bg-[#fff0] dark:border-[0px]  "
                        }`
                  } `}
                  onClick={() => {
                    setkey(e.key);
                    // console.log(e.key);
                    setIsSelected(false);
                  }}
                >
                  {e.value}
                  <div className="flex items-center">
                    {key == e.key ? (
                      <ImCheckboxChecked className="w-5 h-5 ease-in-out p-0 duration-700 text-b1 rounded-md bg-[#fff]"></ImCheckboxChecked>
                    ) : (
                      <ImCheckboxUnchecked className="w-5 h-5 text-[#fff0] border-[1px] shadow-lg border-[#0000001f] rounded-md"></ImCheckboxUnchecked>
                    )}
                  </div>
                </button>
              ) : (
                ""
              )}
            </div>
          ))
        ) : (
          <div>
            {currentQ?.questionType === 2 ? (
              <div className="border-[1px">
                <input
                  onChange={handleOnChange}
                  value={key}
                  className="w-[100%] border-[2.5px] dark:bg-[#ffffff01] dark:text-[#Fff] dark:focus:outline-none  dark:border-[#1d69a4f5] dark:border-[1px] rounded-2xl h-11 px-4"
                ></input>
                {checkAns && (
                  <>
                    <div className="flex px-5 py-2 text-[#32ac2e] font-semibold items-center text- gap-2">
                      <BsArrowReturnRight></BsArrowReturnRight>
                      <p>{currentQ?.answerKey || ""}</p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                {["true", "false"].map((i, idx) => (
                  <div key={idx}>
                    <button
                      disabled={disableCheckBtn}
                      className={`choices cursor-pointer w-full  ${
                        disableCheckBtn
                          ? `pointer-events-none${
                              i == correctAns
                                ? " border-[#36D399] border-[2px] dark:border-[3px] dark:from-[#36d39911] dark:to-[#36D399]  from-[#Fff] to-[#033465bf] bg-gradient-to-r"
                                : " border-[#b32a2a6e] dark:border-[3px] dark:from-[#91515918] dark:to-[#915157]  from-white5  to-[#e73b3b7e] bg-gradient-to-r border-[3px]"
                            }`
                          : `${
                              key == i
                                ? "from-[#fff] border-[3px]  dark:from-[#ea449233] dark:to-[#004e9a]  to-b2 bg-gradient-to-r "
                                : " dark:bg-[#fff0] dark:border-[0px]  "
                            }`
                      } `}
                      onClick={() => {
                        setkey(i);
                        // console.log(i);
                        setIsSelected(false);
                      }}
                    >
                      {i}
                      <div className="flex items-center">
                        {key == i ? (
                          <ImCheckboxChecked className="w-5 h-5 ease-in-out p-0 duration-700 text-b1 rounded-md bg-[#fff]"></ImCheckboxChecked>
                        ) : (
                          <ImCheckboxUnchecked className="w-5 h-5 text-[#fff0] border-[1px] shadow-lg border-[#0000001f] rounded-md"></ImCheckboxUnchecked>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            disabled={!isSelected}
            onClick={() => {
              setIsSelected(false);
              setDisableCheckBtn(true);
              handleCheckAns();
              setCheckAns(true);
            }}
            className={`questionB mt-10 uppercase ${
              !isSelected ? "bg-[#0000007b] hover:transform-none" : "button"
            } `}
          >
            {"Check Answer"}
          </button>
              {" "}
              <button
                disabled={!disableCheckBtn}
                onClick={() => {
                  setCount(count + 1);
                  handleNext()
                  setkey("");
                  setIsSelected(true);
                  setCheckAns(false);
                  handleProgress();
                  setDisableCheckBtn(false);
                  if(arr == 0) setIsFinish(true);
                }}
                className={`questionB mt-10 uppercase ${
                  !disableCheckBtn
                    ? "bg-[#0000007b] hover:transform-none"
                    : "button"
                } `}
              >
                {arr == 0 ? "Finish":"Next"}
              </button>
        </div>
      </div>
    </>
  );
};

export default Options;
