import { copyFileSync, cpSync } from "fs";
import { useEffect } from "react";
import { useState } from "react";
const Options = ({ handleSelect, quest, disabled, handleQuestion, random }) => {
  const [score, setScore] = useState(0);
  const correctAns = quest.answerKey;
  const [isSelected, setIsSelected] = useState(false);
  const [key, setkey] = useState("");
  const [res,setRes] = useState("");
  const [disableCheckBtn,setDisableCheckBtn] = useState(false)

  const checkAnswer=()=>{ 
    if(key == correctAns){
      setScore(score + 1)
      setRes("Correct!")

    }else{
      setRes("Wrong!")
    }
  }

  console.log(key)
  useEffect(() => {
    console.log(quest?.options);
  }, []);

  return (
    <>
      <div>
        {Object.keys(quest?.options).map((e) => (
          <div key={e} className="" >
            <button disabled={disableCheckBtn} className={`choices cursor-pointer w-full ${disableCheckBtn ?  `disabledChoices pointer-events-none
             ${e == correctAns ? "border-[#109c0b] from-white5 to-[#31f52b82] bg-gradient-to-r border-[3px]":" border-[#ea3939] from-white5 to-[#e73b3b] bg-gradient-to-r border-[3px]"}`: `${key == e  ? "from-[#fff] to-b2 bg-gradient-to-r ":""}`} `} onClick={() => {
              setkey(e)
              setIsSelected(true)
            }}>
              {quest?.options[e]}
            </button>
          </div>
        ))}
      </div>
       <>{res}</>
      <div className="border-[1px py-2 flex px-2 justify-end gap-2">
        <button
          disabled={disableCheckBtn}
          className={`${disableCheckBtn || key == "" ? "disabledBtn":"questionB"}`}
          onClick={() => {
            checkAnswer()
            setDisableCheckBtn(true)
          }}
        >
          CHECK ANSWER
        </button>
        <button
          disabled={disabled}
          onClick={() => {
            handleQuestion(random);
            setDisableCheckBtn(false)
            setkey("")
            setRes("")
          }}
          className={`questionB ${
            !disableCheckBtn ? "bg-[#0000007b] hover:transform-none" : "bg-[#2eb624]"
          } `}
        >
          NEXT
        </button>
      </div>
    </>
  );
};

export default Options;
