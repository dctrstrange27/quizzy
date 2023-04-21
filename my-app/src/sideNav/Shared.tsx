import React, { useEffect,useContext } from "react";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import { API } from "../utils";
import { ImSpinner10 } from "react-icons/im";
import Qportal from "./Qportal";
import { SharedContext } from "../App";

const Subject = React.lazy(() => import("./Subject"));

const Shared = () => {

  const [questions, setQuestions] = useState([]);
  const {handleShowProfile} = useContext(SharedContext)
  const getQuestion = async () => {
    try {
      const getQuestion = await API.post("/getSubject");
      setQuestions(getQuestion.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);


  return (
    <div
      onClick={() => {
        handleShowProfile();
      }}
      className="flex-col px-6 w-full md:ml-[20%] md:max-w-xl border-[1px
        lg:max-w-[50rem] 2xl:max-w-[70rem] 3xl:max-w-[70rem]
         border-[2px border-[#700a0a] "
    >
      <div className="py-2 ">
        <React.Suspense
          fallback={
            <div className={`w-full h-[600px] flex justify-center items-center`}>
              <ImSpinner10 className="text-b2 w-6 h-auto animate-spin duration-[2000ms] bg-transparent"/>
            </div>
          }
        >
          {questions?.map((quest, id) => (
            <Subject
              key={id}
              quest={quest}
            ></Subject>
          ))}
        </React.Suspense>
      </div>
    </div>
  );
};

export default Shared;
