import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Search,
} from "react-router-dom";
import Yours from "./sideNav/Yours";
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
import { ImSpinner10 } from "react-icons/im";
const Question = React.lazy(() => import("./sideNav/Question"));

export const HomeContext = createContext<{
  userData: any;
  setShowProfile: Dispatch<SetStateAction<Boolean>>;
  showProfile: Boolean;
}>({
  userData: [],
  setShowProfile: () => {},
  showProfile: false,
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
  const [arr, setArr] = useState([]);

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

  const getSubject = async (id) => {
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
    let x = true;
    while (x) {
      let randomNum = generateRandomNum(getQuestionOnly().length);
      if (!arr.includes(randomNum)) {
        setRandom(randomNum);
        arr.push(randomNum);
        x = false;
      }
      randomNum = generateRandomNum(getQuestionOnly().length);
      if (arr.length == getQuestionOnly().length) {
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
    <div className="App w-full h-full border-[20px border-r-b2">
      <div className=" border-[5px h-full border-r-b2">
        <Routes>
          <Route
            path="/"
            element={
              <HomeContext.Provider
                value={{ userData, setShowProfile, showProfile }}>
                <Home />
              </HomeContext.Provider>
            }
          >
            <Route path="yours" element={<Yours />} />
            <Route
              path="question"
              element={
                <React.Suspense
                  fallback={
                    <div
                      className={`w-full h-screen flex justify-center items-center`}
                    >
                      <ImSpinner10 className="text-b2 w-6 h-auto animate-spin  bg-transparent"></ImSpinner10>
                    </div>
                  }
                >
                  <Question
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
                <Shared
                  setArr={setArr}
                  handleQuestion={handleQuestion}
                  getSubject={getSubject}
                  handleShowProfile={handleShowProfile}
                />
              }
            />
          </Route>
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
