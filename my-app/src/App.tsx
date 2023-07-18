import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Search,
} from "react-router-dom";
import AddSubject from "./sideNav/AddSubject";
import Shared from "./sideNav/Shared";
import Home from "./Home/Home";
import PageNotFound from "./pageNotFound/PageNotFound";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Login from "./Login/Login";
import { useNavigate } from "react-router-dom";
import {
  API,
  saveCurrentQuestion,
  saveQuestionOnly,
  saveUser,
  getQuestionOnly,
  saveCurrentQ,
  generateRandomNum,
  saveCurrentSubject,
  saveCurrentArray,
  getCurrentSubject,
  getCurrentArray,
} from "./utils/index";
import { createContext } from "react";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { loadTheme } from "./utils/theme";
import Footer from "./sideNav/Footer";
import Qportal from "../src/questions/Qportal";
import { shuffleRandomArray } from "./utils/index";
import { GlobalContext } from "./utils/ContextTypes";

const Question = React.lazy(() => import("./sideNav/Question"));

//context in Home,

const App = () => {
  interface user {
    email: number;
    name: string;
    picture: string;
  }
 //old
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<user[]>([]);
  const [hasUser, setHasUser] = useState(false);
  const [questionsOnly, setQuestionOnly] = useState([]);
  const [currentQ, setCurrentQ] = useState([]);
  const Navigate = useNavigate();
  const [disabled, setDisable] = useState(false);
  const [random, setRandom] = useState(0);
  const [inQportal, setInQportal] = useState(false);
  const [showAddQ, setShowAddQ] = useState(false);

  // neww
  const [arr, setArr] = useState([]);
  const [currentSubject, setCurrentSubject] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [subject, setSubject] = useState([]);
  const [questionType,setQuestionType] = useState()
  const [currentQuestion,setCurrentQuestion] = useState([])
  const [answerKey,setAnswerKey] = useState("")
  const [len,setLen] = useState(0)

  const handleShowAdd=()=>{
    setShowAddQ(false);
  }

  const handleShowAddQ = () => {
    setShowAddQ(true);
  };

  const handleLogin = async (data: user) => {
    try {
      const gCredentials = await API.post("/createG", {
        email_address: data.email,
        name: data.name,
        picture: data.picture,
      });
      setUserData(gCredentials.data);
      saveUser(gCredentials);
      Navigate("/shared");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (hasUser) {
      Navigate("/shared");
    }
  }, []);

  const handleShowProfile = () => {
    setShowProfile(false);
  };
  const getSubject = async (id: string,arr:any) => {
    try {
      const data = await API.post("/getQuestion", {
        id: id,
      });
      setCurrentSubject(data.data.questions)
      saveCurrentSubject(data.data.questions)
      setArr(arr)
      saveCurrentArray(arr)
      console.log(arr)
      console.log(data.data.questions);

    } catch (error) {
      console.log(error);
    }
  };
  function handleHideQuestions() {
    setDisable(true);
  }
  //handling questions every next
  const handleQuestion = () => {
    const len = getQuestionOnly().length;
    let randomNum = generateRandomNum(1, len);
    let x = 1;
    while (x == 1) {
      if (!arr.includes(randomNum)) {
        setRandom(randomNum);
        arr.push(randomNum);
        x = 0;
      }
      randomNum = generateRandomNum(1, len);
      if (arr.length == len) {
        handleHideQuestions();
        return;
      }
    }
    const currentQuestion = questionsOnly.find(
      (question) => question.id == random
    );
    setCurrentQ(currentQuestion);
    saveCurrentQ(currentQuestion);
    return currentQuestion;
  };

  const handleNext = (currentQ: any, arr: []) => {
    let random = arr?.pop();
    const current = currentSubject?.find((quest) => quest.id === random);
    setQuestion(current?.question);
    setOptions(current?.options)
    setQuestionType(current?.questionType)
    setCurrentQuestion(current?.question)
    setAnswerKey(current?.answerKey)
  };

  
  const handlePortal = (questions: any, len: number,subject:any,id:any) => {
    setCurrentSubject(questions)
    setSubject(subject)
    setArr(shuffleRandomArray(len));
    setLen(len)
    getSubject(id,shuffleRandomArray(len))
    Navigate("/Qportal");
  };
 

  return (
    <div className="App w-full relative h-fit duration-700 ease-in-out bg-white5 dark:bg-five border-b2">
      <GlobalContext.Provider
        value={{
          userData,
          setShowProfile,
          showProfile,
          inQportal,
          setInQportal,
          handleShowAdd,
          handleShowAddQ,
          showAddQ,
          handleShowProfile,
          setArr,
          getSubject,
          handleQuestion,
          handleNext,
          subject,
          question,
          currentQuestion,
          currentSubject,
          handlePortal,
          arr,
          options,
          questionType,
          answerKey,
          len,
          setSubject,
        }}
      >
        <div className=" border-[5px h-auto border-[#fe8a8a]">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="addSubject" element={<AddSubject />} />
              <Route
                path="question"
                element={
                  <React.Suspense
                    fallback={
                      <div
                        className={`w-full h-40 flex justify-center items-center`}
                      >
                        <AiOutlineLoading className="text-b2 w-6 h-auto animate-spin  bg-transparent"></AiOutlineLoading>
                      </div>
                    }
                  >
                    <Question
                      setInQportal={setInQportal}
                      disabled={disabled}
                      random={random}
                      handleQuestion={handleQuestion}
                      setQuestionOnly={setQuestionOnly}
                      questions={question}
                      setQuestion={setQuestion}
                      setArr={setArr}
                      setCurrentQ={setCurrentQ}
                      handleHideQuestions={handleHideQuestions}
                      arr={arr}
                    />
                  </React.Suspense>
                }
              ></Route>
              <Route path="shared" element={<Shared />} />
              <Route
                path="Qportal"
                element={
                  <React.Suspense
                    fallback={
                      <div
                        className={`w-full h-40 flex justify-center items-center`}
                      >
                        <AiOutlineLoading className="text-b2 w-6 h-auto animate-spin  bg-transparent"></AiOutlineLoading>
                      </div>
                    }
                  >
                    <Qportal />
                  </React.Suspense>
                }
              ></Route>
            </Route>

            <Route path="login" element={<Login handleLogin={handleLogin} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </GlobalContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
