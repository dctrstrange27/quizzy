import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Yours from "./sideNav/Yours";
import Shared from "./sideNav/Shared";
import Home from "./Home/Home";
import { useEffect, useState } from "react";
import Login from "./Login/Login";
import { useNavigate } from "react-router-dom";
import { API, getCurrentQuestion, saveQuestion, saveUser } from "./utils/index";
import Question from "./sideNav/Question";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
const MainApp = () => {
  const [showProfile, setShowProfile] = useState(false)

  interface user {
    email: number;
    name: string;
    picture: string;
  }

  const [userData, setUserData] = useState<user[]>([]);
  const [hasUser, setHasUser] = useState(true)


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
  const Navigate = useNavigate();
  const handleShowProfile = () => { setShowProfile(false) }

  useEffect(() => {
    if (!hasUser) {
      Navigate('/')
    }
  })

  const [questions, setQuestion] = useState([])

 
  const getSubject = async (id) => {
    try {
      const data = await API.post("/getQuestion", {
        id: id
      })
      setQuestion(data.data)
      saveQuestion(data.data)
      Navigate('/question')
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
                questions={questions}
                getSubject={getSubject}
                setQuestion={setQuestion}
              />} />
            <Route path="shared" element={
              <Shared
                setQuestion={setQuestion}
                getSubject={getSubject}
                handleShowProfile={handleShowProfile}
              />} 
              />
          </Route>
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
