import { useEffect } from "react";
import { useState } from "react";
const Options = ({
  handleSelect,
  isSelected,
  opt,
  disabled,
  handleQuestion,
  random,
}) => {
  const [score, setScore] = useState(0);
  const correctAns = opt.answerKey;
  const [userAnswer, setUserAns] = useState("");

  const getUserAns = (userAns, correctAns) => {
    setUserAns(userAns);
  };
  const checkAnswer = () => {
    if (userAnswer == correctAns) {
      setScore(score + 1);
      console.log("correct");
    }
    console.log("wrong");
  };

  return (
    <>
      {/* <div>{options?.map((e) => (
        <div className="">
          <p className="choices"></p>

        </div>
      ))}</div> */}
      <div>{opt.answerKey}</div>
      <div className="border-[1px py-2 flex px-2 justify-end gap-2">
        <button
          disabled={disabled}
          className="questionB"
          onClick={() => {
            checkAnswer();
          }}
        >
          CHECK ANSWER
        </button>
        <button
          disabled={disabled}
          onClick={() => {
            handleQuestion(random);
          }}
          className={`questionB ${
            disabled ? "bg-[#0000007b] hover:transform-none" : "bg-[#2eb624]"
          } `}
        >
          NEXT
        </button>
      </div>
    </>
  );
};

export default Options;
