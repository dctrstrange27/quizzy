import React, { useEffect,useContext } from "react";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import { API } from "../utils";
import { AiOutlineLoading } from "react-icons/ai";
import Qportal from "./Qportal";
import { GlobalContext } from "../../src/utils/ContextTypes";

const Subject = React.lazy(() => import("./Subject"));

const Shared = () => {
  const [questions, setQuestions] = useState([]);
  const {handleShowProfile,handleShowAddQ,handleShowAdd} = useContext(GlobalContext)

  const getQuestion = async () => {
    try {
      const getQuestion = await API.post("/getSubject");
      setQuestions(getQuestion.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubj=(id:number)=>{
    setQuestions(questions.filter((q)=> q._id != id ))
  }

  useEffect(() => {
    getQuestion();
    handleShowAddQ()
  }, []);

  return (
    <div
      onClick={() => {
        handleShowProfile();
      }}
      className="flex-col  w-full md:ml-[20%] md:max-w-xl border-[1px
        lg:max-w-[50rem] 2xl:max-w-[70rem] 3xl:max-w-[70rem] 
         border-[2px  border-[#700a0a  "
      >
      <div className="py-2 border-[1px w-full  px-6">
        <React.Suspense
          fallback={
            <div className={`w-full h-[200px] flex justify-center items-center`}>
              <AiOutlineLoading className="text-b2 w-6 h-auto animate-spin duration-[2000ms] bg-transparent"/>
            </div>
          }
        >
          {questions.map((quest, id) => (
            <Subject 
              key={id}
              quest={quest}
              handleShowAddQ={handleShowAddQ}
              handleDeleteSubj={handleDeleteSubj}
            ></Subject>
          ))}
        </React.Suspense>
      </div>
    </div>
  );
};

export default Shared;
