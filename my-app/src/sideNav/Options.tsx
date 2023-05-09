import { useEffect } from "react";
import { useState } from "react";
import correctSound from "../assets/correct.wav";
import wrongSound from "../assets/wrong.mp3";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { getQuestionOnly } from "../utils";

const Options = ({
  quest,
  handleQuestion,
  random,
  handleHideQuestions,
  incrementScore,
  arr,
  handleProgress,
}) => {
  const [questionType, setQuestionType] = useState();
  const [count, setCount] = useState(0);

  const check = () => quest.answerKey;

  useEffect(() => {
    check();
    setQuestionType(quest.questiontype);
  }, []);

  const correctAns = check();
  const [key, setkey] = useState("");
  const [res, setRes] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const [disableCheckBtn, setDisableCheckBtn] = useState(false);

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
    correctAns == key  ? correct() : wrong();
    setDisableCheckBtn(true);
    // console.log("question type"+ questionType)
  };

  const handleOnNext = () => {
    if (arr.length == quest.length - 1) {
      handleHideQuestions();
    }
    handleQuestion();
    setDisableCheckBtn(false);
    setkey("");
    setRes("");
    handleProgress();
  };
  const handleOnChange = (e) => {
    setkey(e.target.value);
  };
  useEffect(() => {
      if (key != "") {
        setIsSelected(false);
      } else {
        setIsSelected(true);
      }
  }, [key]);
  return (
    <>
      <div className="border-[1px">
        {Object.keys(quest?.options).map((e) => (
          <div key={e}>
            {quest?.options[e] != 1 ? (
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
            ) : (
              <>
                {quest?.options[e] == 1 ? (
                  <input
                    onChange={handleOnChange}
                    value={key}
                    className="w-full border-[1px] rounded-2xl h-11 px-4"
                  ></input>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        ))}
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
            // console.log("key: " + key);
            // console.log("correct ans: " + correctAns);
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
            setIsSelected(false);
            setkey("");
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
