import "./App.css";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Yours from "./sideNav/Yours";
import Shared from "./sideNav/Shared";
import Home from "./Home/Home";
import { useEffect, useState } from "react";
import Login from "./Login/Login";
import { useNavigate } from "react-router-dom";
import { API, saveUser } from "./utils/index";
import Nav from "./Nav/Nav";
import Question from "./sideNav/Question";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const [userName, setUserName] = useState();
  const [showProfile, setShowProfile] = useState(false)

  interface user {
    email: number;
    name: string;
    picture: string;
  }

  const [userData, setUserData] = useState<user[]>([]);
  const [hasUser, setHasUser] = useState(true)
  const [question, setQuestions] = useState([])


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
      console.log(error)
    }
  };

  const clickMe = () => { console.log("click me") }
  const Navigate = useNavigate();

  const handleShowProfile = () => { setShowProfile(false) }

  const [id, getId] = useState()

  useEffect(() => {
    if (!hasUser) {
      Navigate('/')
    }
  })

  const [answer, setAnswer] = useState()
  const [currentQ, setCurrentQ] = useState(0)
  const [current, setCurrent] = useState([])
  const [questions, setQuestion] = useState([])

  const handleQuestion = (id) => {
    const pickQuestion = questions.find((q, idx) => idx === id)
    setCurrent(pickQuestion)
  }
  const getSpecificQuestion = async () => {
    try {
      const data = await API.post("/getQuestion", {
        id: id
      })
      setQuestion(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!hasUser) {
      Navigate('/')
    }
  })

  return (
    <div className="App w-full h-full border-[20px border-r-b2">
      <div className=" border-[5px h-full border-r-b2">
        <Routes>
          <Route path="/" element={<Home userData={userData} setShowProfile={setShowProfile} showProfile={showProfile} handleShowProfile={handleShowProfile} />}>
            <Route path="yours" element={<Yours />} />
            <Route path="question" element={
              <Question
                getSpecificQuestion={getSpecificQuestion} 
                currentQ={currentQ}
                setCurrentQ={setCurrentQ}
                current={current}
                id={id}
                handleQuestion={handleQuestion}
              />} />

            <Route path="shared" element={
              <Shared
                setQuestion={setQuestion}
                id={id}
                getId={getId}
                handleShowProfile={handleShowProfile}
              />} />
          </Route>
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
