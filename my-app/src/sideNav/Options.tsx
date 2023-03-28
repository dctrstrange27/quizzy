import { copyFileSync, cpSync } from "fs";
import { useEffect } from "react";
import { useState } from "react";
import correctSound from "../assets/correct.wav";
import wrongSound from "../assets/wrong.mp3";

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
}) => {
  const correctAns = quest.answerKey;
  const [isSelected, setIsSelected] = useState(false);
  const [key, setkey] = useState("");
  const [res, setRes] = useState("");
  const [disableCheckBtn, setDisableCheckBtn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const checkAnswer = () => {
    if (key != correctAns) {
      incrementScore();
      setRes("Wrong!");
    } else {
      setRes("Correct!");
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <div>
        {Object.keys(quest?.options).map((e) => (
          <div key={e} className="flex">
            <button
              disabled={disableCheckBtn}
              className={`choices cursor-pointer w-full ${
                disableCheckBtn
                  ? `pointer-events-none${
                      e == correctAns
                        ? " border-[#2bf303] border-[2px] from-[#Fff] to-[#033465] bg-gradient-to-r"
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
            </button>
          </div>
        ))}
      </div>
      <>{res}</>
      <div className="border-[1px py-2 flex px-2 justify-end gap-2">
        <button
          disabled={disableCheckBtn}
          className={`${
            disableCheckBtn || key == "" ? "disabledBtn" : "questionB"
          }`}
          onClick={() => {
            if (arr.length == 9) {
              handleHideQuestions();
            }
            checkAnswer();
            if (key === correctAns) {
              new Audio(correctSound).play();
            } else {
              new Audio(wrongSound).play();
            }
            setDisableCheckBtn(true);
          }}
        >
          CHECK ANSWER
        </button>
        <button
          disabled={!disableCheckBtn}
          onClick={() => {
            handleQuestion(random);
            setDisableCheckBtn(false);
            setkey("");
            setRes("");
            handleProgress()
          }}
          className={`questionB ${
            !disableCheckBtn
              ? "bg-[#0000007b] hover:transform-none"
              : "bg-[#154a72]"
          } `}
        >
          NEXT
        </button>
      </div>
    </>
  );
};

export default Options;
