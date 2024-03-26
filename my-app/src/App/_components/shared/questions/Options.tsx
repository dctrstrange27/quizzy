import { useState } from "react";
import { useEffect } from "react";
import correctSound from "@/assets/correct.mp3";
import wrongSound from "@/assets/wrong.mp3";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { BsArrowReturnRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const Options = ({
   setCount,
   count,
   handleProgress,
   setIsFinish,
   finish,
   setScore,
   currentQ,
   handleNext,
   arr,
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
      if (correctAns === key) {
         correct();
         setScore((prev: any) => prev + 1);
      } else {
         wrong();
      }
      setDisableCheckBtn(true);
   };

   useEffect(() => {
      if (key === "") {
         setIsSelected(false);
      } else {
         setIsSelected(true);
      }
   }, [key]);

   return (
      <>
            <h1 className="font-bold tracking-normal text-[23px] text-2xl py-4 text-justify ">
              {currentQ?.question}
            </h1>
            {currentQ?.options != "" ? (
              <div className=" space-y-3">
                {
                   currentQ?.options?.map((e, idx) => (
                    <div key={idx}>
                       {currentQ.questionType === 1 ||
                       currentQ.questionType === 0 ? (
                          <Button
                             disabled={disableCheckBtn}
                             className={` cursor-pointer text-md w-full hover:bg-mute-foreground  ${
                                disableCheckBtn
                                   ? `pointer-events-none  ${
                                        e.key === correctAns
                                           ? " bg-green-600  dark:bg-green-600 dark:text-white "
                                           : " bg-destructive "
                                     }`
                                   : `${
                                        key === e.key
                                           ? " bg-muted-foreground   dark:bg-primary/90 "
                                           : " bg-muted text-accent-foreground dark:bg-primary/40 dark:text-white dark:hover:text-accent "
                                     }`
                             } `}
                             onClick={() => {
                                setkey(e.key);
                                setIsSelected(false);
                             }}
                          >
                             {e.value}
                          </Button>
                       ) : (
                          ""
                       )}
                    </div>
                 ))
                }
              </div>
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
                     <div className=" space-y-2">
                        {["true", "false"].map((i, idx) => (
                           <div key={idx}>
                              <Button
                                 disabled={disableCheckBtn}
                                 className={`choices cursor-pointer w-full hover:bg-mute-foreground   ${
                                    disableCheckBtn
                                       ? `pointer-events-none${
                                            i === correctAns
                                            ? " bg-green-600  dark:bg-green-600 dark:text-white "
                                            : " bg-destructive "
                                         }`
                                       : `${
                                            key === i
                                            ? " bg-muted-foreground   dark:bg-primary/90 "
                                            : " bg-muted text-accent-foreground dark:bg-primary/40 dark:text-white dark:hover:text-accent "
                                         }`
                                 } `}
                                 onClick={() => {
                                    setkey(i);
                                    // console.log(i);
                                    setIsSelected(false);
                                 }}
                              >
                                 {i}
                              </Button>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}
            <div className="flex justify-end gap-2">
               <Button
                  disabled={!isSelected}
                  onClick={() => {
                     setIsSelected(false);
                     setDisableCheckBtn(true);
                     handleCheckAns();
                     setCheckAns(true);
                  }}
                  className={`questionB mt-10 uppercase ${
                     !isSelected
                        ? "bg-[#0000007b] hover:transform-none"
                        : "button"
                  } `}
               >
                  {"Check Answer"}
               </Button>{" "}
               <Button
                  disabled={!disableCheckBtn}
                  onClick={() => {
                     setCount(count + 1);
                     handleNext();
                     setkey("");
                     setIsSelected(true);
                     setCheckAns(false);
                     handleProgress();
                     setDisableCheckBtn(false);
                     if (arr === 0) setIsFinish(true);
                  }}
                  className={`questionB mt-10 uppercase ${
                     !disableCheckBtn
                        ? "bg-[#0000007b] hover:transform-none"
                        : "button"
                  } `}
               >
                  {arr === 0 ? "Finish" : "Next"}
               </Button>
            </div>
         
      </>
   );
};

export default Options;
