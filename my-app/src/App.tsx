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
import Question from "./sideNav/Question";
import { createContext } from "react";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export const HomeContext = createContext<{
  userData: any;
  setShowProfile: Dispatch<SetStateAction<Boolean>>;
  showProfile: Boolean;
}>({
  userData: [],
  setShowProfile: () => {},
  showProfile: false,
});

const MainApp = () => {
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
  const [arr, setArr] = useState<any[]>([]);

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
  console.log(hasUser)
  useEffect(() => {
    if (hasUser) {
      Navigate("shared");
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
      console.log(data)
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
        console.log(arr);
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
              }
            />
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
        </Routes>
      </div>
    </div>
  );
};
export default App;
