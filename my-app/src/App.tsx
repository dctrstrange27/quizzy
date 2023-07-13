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
} from "./utils/index";
import { createContext } from "react";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { loadTheme } from "./utils/theme";
import Footer from "./sideNav/Footer";
const Question = React.lazy(() => import("./sideNav/Question"));

//context in Home,
export const HomeContext = createContext<{
  userData: any;
  setShowProfile: Dispatch<SetStateAction<Boolean>>;
  showProfile: Boolean;
  inQportal: Boolean;
  setInQportal: Dispatch<SetStateAction<Boolean>>;
  setShowAddQ: Dispatch<SetStateAction<Boolean>>;
}>({
  userData: [],
  setShowProfile: () => {},
  showProfile: false,
  inQportal: false,
  setInQportal: () => {},
  setShowAddQ: () => {},
});

//context in Shared,
export const SharedContext = createContext<{
  inQportal: Boolean;
  setInQportal: Dispatch<SetStateAction<Boolean>>;
  handleShowProfile: () => void;
  setArr:Dispatch<SetStateAction<number[]>>;
  getSubject:(id:string)=> void;
  handleQuestion:() => any;
  handleShowAddQ:() => void;
  setShowAddQ: Dispatch<SetStateAction<Boolean>>;
  showAddQ: Boolean;
}>({
  inQportal: false,
  setInQportal: () => {},
  handleShowProfile: () => {},
  setArr:()=>[],
  getSubject:(id:string)=>{},
  handleQuestion:()=>{},
  handleShowAddQ:()=>{},
  setShowAddQ: () => {},
  showAddQ: false,
});

const App = () => {
 interface user {
    email: number;
    name: string;
    picture: string;
  }

  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<user[]>([]);
  const [hasUser, setHasUser] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [questionsOnly, setQuestionOnly] = useState([]);
  const [currentQ, setCurrentQ] = useState([]);
  const Navigate = useNavigate();
  const [disabled, setDisable] = useState(false);
  const [random, setRandom] = useState(0);
  const [arr, setArr] = useState<number[]>([]);
  const [inQportal, setInQportal] = useState(false);
  const [showAddQ, setShowAddQ] = useState(false);

  const handleShowAddQ=(subject:any)=>{
   setShowAddQ(true)
    
  }


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
  const getSubject = async (id:string) => {
    try {
      const data = await API.post("/getQuestion", {
        id: id,
      });
      setQuestionOnly(data.data.questions);
      saveQuestionOnly(data.data.questions);
      saveCurrentQuestion(data.data);
      Navigate("/question");
    } catch (error) {
      console.log(error);
    }
  };
  function handleHideQuestions() {
    setDisable(true);
  }
  //handling questions every next
  const handleQuestion = () => {
    const len = getQuestionOnly().length
   //console.log(currentQ.question)    
    let x = 1;
    while (x == 1) {
      let randomNum = generateRandomNum(len);
      if (!arr.includes(randomNum)) {
        setRandom(randomNum);
        arr.push(randomNum);
        x = 0;
      }
      randomNum = generateRandomNum(len);
      if (arr.length == len) {
        handleHideQuestions();
        return;
      }
    }
    const currentQuestion = questionsOnly.find((e, idx) => idx == random);
    setCurrentQ(currentQuestion);
    saveCurrentQ(currentQuestion);
    return currentQuestion;
  };
  
  return (
    <div className="App w-full relative h-fit duration-700 ease-in-out bg-white5 dark:bg-five border-b2">
      <div className=" border-[5px h-auto border-[#fe8a8a]">
        <Routes>
          <Route
            path="/"
            element={
              <HomeContext.Provider
                value={{
                  userData,
                  setShowProfile,
                  showProfile,
                  inQportal,
                  setInQportal,
                  setShowAddQ,
                }}>
                <Home />
              </HomeContext.Provider>
            }
          >
            <Route path="addSubject" element={
            <SharedContext.Provider
                  value={{inQportal,handleShowAddQ,showAddQ,setShowAddQ,setInQportal, handleShowProfile, setArr, getSubject,handleQuestion}}>
                  <AddSubject />
                </SharedContext.Provider>
            }/>
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
                    questions={questions}
                    setQuestion={setQuestion}
                    setArr={setArr}
                    setCurrentQ={setCurrentQ}
                    handleHideQuestions={handleHideQuestions}
                    arr={arr}
                  />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="shared"
              element={
                <SharedContext.Provider
                  value={{inQportal,handleShowAddQ,showAddQ,setShowAddQ,setInQportal, handleShowProfile, setArr, getSubject,handleQuestion}}>
                  <Shared />
                </SharedContext.Provider>
              }
            />
          </Route>
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
     <Footer/>
    </div>
  );
};

export default App;
