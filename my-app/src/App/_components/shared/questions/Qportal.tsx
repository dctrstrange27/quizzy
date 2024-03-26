import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "./Options";
import { GlobalContext } from "@/utils/ContextTypes";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";

const Qportal = () => {
   const { len, setLen, setInQportal } = useContext(GlobalContext);

   const currentSubjectFromLocal = JSON.parse(
      localStorage.getItem("subject") || "[]"
   );
   const currentArrayFromLocal = JSON.parse(
      localStorage.getItem("array") || "[]"
   );

   const Navigate = useNavigate();
   const [scale, setScale] = useState(1);
   const [count, setCount] = useState(1);
   const [finish, setIsFinish] = useState(false);
   const [score, setScore] = useState(0);
   const [showQuestion, setShowQuestion] = useState(false);
   const [currentSubject, setCurrentSubject] = useState(
      currentSubjectFromLocal
   );
   const [currentArray, setCurrentArray] = useState(currentArrayFromLocal);
   const [currentQuestion, setCurrentQuestion] = useState([]);

   const handleNext = () => {
      let random = currentArray.pop();
      const current = currentSubject?.questions?.find(
         (quest) => quest.id === random
      );
      setCurrentQuestion(current);
   };

   useEffect(() => {
      setInQportal((prev) => true);
      setCurrentSubject(currentSubject);
      setCurrentArray(currentArray);
      setLen(currentSubject.questions.length);
   }, []);

   useEffect(() => {
      handleNext();
   }, [currentArray, currentSubject]);

   function handleProgress() {
      setScale(scale + 100 / len);
   }

   return (
      <div className="min-h-[50vh] flex justify-center  ">
         <Card className="w-full lg:w-[50%] p-5">
            <CardTitle className="text-center my-2"> {currentSubject.subjectCode}</CardTitle>
               {finish == true ? (
                  <>
                     <div className="border-[1px flex flex-col items-center">
                        <h1 className=" font-extrabold text-[30px] text-[#000] dark:text-[#e1e1e1]">
                           {score}/{len}
                        </h1>
                        <h1 className="font-grot border-[1px py-3 text-2xl dark:text-[#ffff]">
                           score
                        </h1>
                        <div className="flex w-full justify-center  border-[1px gap-10">
                           <Button
                              className="questionB w-28"
                              onClick={() => {
                                 window.location.reload();
                              }}
                           >
                              Try Again
                           </Button>
                           <Button
                              onClick={() => {
                                 setInQportal((prev) => !prev);
                                 Navigate("/shared");
                              }}
                              className="questionB w-24"
                           >
                              Back
                           </Button>
                        </div>
                     </div>
                  </>
               ) : (
                  
                   <CardContent>
                           <div className=" flex gap-2 items-center text-start  w-full px-2 border-[#000] dark:text-[#ffff]">
                              <h1 className="text-[17px] font-bold">
                                 Question:
                              </h1>
                              <h2 className="text-[19px] font-bold">
                                 {count}/{len}
                              </h2>
                              <Progress value={scale} className={`w-[10%]`} />
                           </div>
                        <div className="px-5 w-full  flex-col mb-2 ">
                           <div className="mb-8 border-[1px px-4">
                              <Options
                                 handleNext={handleNext}
                                 count={count}
                                 handleProgress={handleProgress}
                                 setCount={setCount}
                                 setIsFinish={setIsFinish}
                                 setScore={setScore}
                                 finish={finish}
                                 currentQ={currentQuestion}
                                 arr={currentArray.length}
                              ></Options>
                           </div>
                        </div>
                   </CardContent>
               )}
         </Card>
      </div>
   );
};

export default Qportal;
