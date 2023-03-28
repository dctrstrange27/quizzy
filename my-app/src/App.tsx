import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Yours from "./sideNav/Yours";
import Shared from "./sideNav/Shared";
import Home from "./Home/Home";
import { useEffect, useState } from "react";
import Login from "./Login/Login";
import { useNavigate } from "react-router-dom";
import {
  API,
  saveCurrentQuestion,
  saveQuestionOnly,
  saveUser,
  getCurrentQ,
  getQuestionOnly,
  saveCurrentQ,
  generateRandomNum,
} from "./utils/index";
import Question from "./sideNav/Question";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const [showProfile, setShowProfile] = useState(false);
  interface user {
    email: number;
    name: string;
    picture: string;
  }

  const [userData, setUserData] = useState<user[]>([]);
  const [hasUser, setHasUser] = useState(true);

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

  const Navigate = useNavigate();
  const handleShowProfile = () => {
    setShowProfile(false);
  };

  const [questions, setQuestion] = useState([]);
  const [questionsOnly, setQuestionOnly] = useState([]);
  const [currentQ, setCurrentQ] = useState<any | null>(null);

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

  const [disabled, setDisable] = useState(false);
  const [random, setRandom] = useState(0);
  const [arr, setArr] = useState([]);

  function handleHideQuestions(){
    if (arr.length == 9) {
      setDisable(true);
    }
  }
  //handling questions every next
  const handleQuestion = (id) => {
    handleHideQuestions()
    let x = true;
    while (x) {
      let randomNum = generateRandomNum();
      if (!arr.includes(randomNum)) {
        setRandom(randomNum);
        arr.push(randomNum);
        // console.log(random)
        x = false;
      }
      randomNum = generateRandomNum();
    }
    const currentQuestion = questionsOnly.find((e, idx) => idx == id);
    setCurrentQ(currentQuestion);
    saveCurrentQ(currentQuestion);
    return currentQuestion
  };
  useEffect(() => {
    if (!hasUser) {
      Navigate("shared");
    }
  }, []);

  return (
    <div className="App w-full h-full border-[20px border-r-b2">
      <div className=" border-[5px h-full border-r-b2">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                userData={userData}
                setShowProfile={setShowProfile}
                showProfile={showProfile}
                handleShowProfile={handleShowProfile}
              />
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
                  questionsOnly={questionsOnly}
                  currentQ={currentQ}
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
                  handleQuestion={handleQuestion}
                  setQuestion={setQuestion}
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
