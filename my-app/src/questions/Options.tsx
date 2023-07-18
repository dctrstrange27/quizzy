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
}) => {
  const {subject,options, currentQuestion, questionType, answerKey, handleNext, arr } =
    useContext(GlobalContext);

  const [key, setkey] = useState("");
  const [res, setRes] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [disableCheckBtn, setDisableCheckBtn] = useState(false);
  const [checkAns, setCheckAns] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);

  let correctAns = answerKey;

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
        {options === undefined ? (
          ""
        ) : options != "" ? (
          options.map((e) => (
            <div key={e.key}>
              {questionType === 1 || questionType === 0 ? (
                <button
                  disabled={disableCheckBtn}
                  className={`choices cursor-pointer w-full text-five  dark:text-[#fff] ${
                    disableCheckBtn
                      ? `pointer-events-none${
                          e.key == correctAns
                            ? " border-[#06ff8f] border-[2px] dark:bg-[#fff0] dark:bg-none from-[#Fff] to-[#033465bf] bg-gradient-to-r"
                            : " border-[#b32a2a6e]  from-white5 dark:bg-none to-[#e73b3b7e] bg-gradient-to-r border-[3px]"
                        }`
                      : `${
                          key == e.key
                            ? "from-[#fff] border-[3px] dark:bg-none  to-b2 bg-gradient-to-r "
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
            {questionType === 2 ? (
              <div className="border-[1px">
                <input
                  onChange={handleOnChange}
                  value={key}
                  className="w-full border-[1px] rounded-2xl h-11 px-4"
                ></input>
                {checkAns && (
                  <>
                    <div className="flex px-5 py-2 text-[#32ac2e] font-semibold items-center text- gap-2">
                      <BsArrowReturnRight></BsArrowReturnRight>
                      <p>{answerKey}</p>
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
                                ? " border-[#06ff8f] border-[2px] dark:bg-[#fff0] dark:bg-none from-[#Fff] to-[#033465bf] bg-gradient-to-r"
                                : " border-[#b32a2a6e]  from-white5 dark:bg-none to-[#e73b3b7e] bg-gradient-to-r border-[3px]"
                            }`
                          : `${
                              key == i
                                ? "from-[#fff] border-[3px] dark:bg-none  to-b2 bg-gradient-to-r "
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
          {showFinishButton == true ? (
            <>
              {" "}
              <button
                onClick={() => {
                  setIsFinish(true);
                }}
                className={`questionB mt-10 uppercase ${
                  !disableCheckBtn
                    ? "bg-[#0000007b] hover:transform-none"
                    : "button"
                } `}
              >
                Finish
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                disabled={!disableCheckBtn}
                onClick={() => {
                  setCount(count + 1);
                  handleNext(currentQuestion, arr);
                  setkey("");
                  setIsSelected(true);
                  setCheckAns(false);
                  handleProgress();
                  setDisableCheckBtn(false);
                  if(arr.length == 0) setShowFinishButton(true);
                }}
                className={`questionB mt-10 uppercase ${
                  !disableCheckBtn
                    ? "bg-[#0000007b] hover:transform-none"
                    : "button"
                } `}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Options;
