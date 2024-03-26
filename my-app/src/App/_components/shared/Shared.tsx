import React, { useEffect, useContext } from "react";
import { API, hasUser } from "@/utils/index";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@/utils/ContextTypes";
import { useGetQuestions } from "@/App/hooks/question-hooks";
import { CloudOff, Loader2 } from "lucide-react";
const Subject = React.lazy(() => import("./Subject"));

const Shared = () => {
   const { handleShowProfile, handleShowAddQ, setSubjects, subjects } =
      useContext(GlobalContext);
   const navigate = useNavigate();

   
   const handleDeleteSubj = (id: number) => {
      setSubjects(subjects.filter((q) => q._id != id));
   };
   const { questions, isLoading} = useGetQuestions({handleShowAddQ});

   console.log(questions);

   useEffect(() => {
      if (hasUser) navigate("/shared");
      handleShowAddQ();
   }, []);


   if (isLoading)
   return (
      <div className="flex flex-col w-full lg:w-[50%] h-[50vh] p-5  space-y-2 m-auto items-center justify-center">
        <Loader2 className=" animate-spin"></Loader2>
         <p className=" animate-pulse">Loading Please wait...</p>
      </div>
   );

   if (!questions)
      return (
         <div className="flex flex-col w-full lg:w-[50%] h-[50vh] p-5  space-y-2 m-auto items-center justify-center">
            <CloudOff />
            <p>no questions Added</p>
         </div>
      );

   return (
      <div
         onClick={() => {
            handleShowProfile();
         }}
         className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full lg:w-[80%] xl:w-[70%] p-5 gap-2 m-auto items-center justify-center  "
      >
         <React.Suspense
            fallback={
               <div
                  className={`w-full h-[200px] flex justify-center items-center`}
               >
                  <AiOutlineLoading className="text-b2 w-6 h-auto animate-spin duration-[2000ms] bg-transparent" />
               </div>
            }
         >
            {questions.map((quest, id) => (
            <Subject  key={id} quest={quest}></Subject>))}
         </React.Suspense>
      </div>
   );
};

export default Shared;
