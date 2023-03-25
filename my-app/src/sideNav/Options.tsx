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
  interface options {
    a: string;
    b: string;
    c: string;
    d: string;
  }
  const [options, setOwptions] = useState<options[]>([]);

  const [score, setScore] = useState(0)
  const correctAns = opt.answerKey
  const [userAnswer,setUserAns] = useState('')

  const getUserAns = (userAns,correctAns) => {
      setUserAns(userAns)
  };
  
  const checkAnswer=()=>{
    if(userAnswer == correctAns){
      setScore(score + 1)
      console.log("correct")
    }console.log("wrong")
  }  

  const [numbers, setNumbers] = useState([]);
  const [randomNum,setRandom] = useState(null)


  // const generateNumber = () => {
  //   const numbersArray = [...numbers];
  //   let randomNumber = Math.floor(Math.random() * 10);
  //   while (numbersArray.includes(randomNumber)) {

  //     randomNumber = Math.floor(Math.random() * 10);
  //   }
  //   numbersArray.push(randomNumber);
  //   setNumbers(numbersArray);
  // };

  
  return (
    <>
      <div>{opt.answerKey}</div>
      <div className="border-[1px py-2 flex px-2 justify-end gap-2">
        <button disabled={disabled}className="questionB"
        onClick={() => {
            checkAnswer()
        }} 
        >
          CHECK ANSWER
        </button>
        <button
          disabled={disabled}
          onClick={() => {
            // generateNumber()
            // console.log(numbers)
            handleQuestion(random);
          }}
          className={`questionB ${disabled ? "bg-[#0000007b] hover:transform-none":"bg-[#2eb624]"} `}
        >
          NEXT
        </button>
      </div>
    </>
  );
};

export default Options