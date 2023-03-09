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
  const [question,setQuestions] =useState([])


  const handleLogin = async (data: user) => {
    const gCredentials = await API.post("/createG", {
      email_address: data.email,
      name: data.name,
      picture: data.picture,
    });
    setUserData(gCredentials.data);
    saveUser(gCredentials);
    Navigate("/shared");
  };

  const clickMe=()=>{console.log("click me")}
  const Navigate = useNavigate();

  const handleShowProfile = () => { setShowProfile(false) }

  const [id, getId] = useState()

  useEffect(() => {
    if (!hasUser) {
      Navigate('/')
    }
  })
  console.log(id)
  return (
    <div className="App w-full h-full border-[20px border-r-b2">
      <div className=" border-[5px h-full border-r-b2">
        <Routes>
          <Route path="/" element={<Home  userData={userData} setShowProfile={setShowProfile} showProfile={showProfile} handleShowProfile={handleShowProfile} />}>
            <Route path="yours" element={<Yours />} />
            <Route path="question" element={<Question id={id} clickMe={clickMe} />} />
            <Route path="shared" element={<Shared getId={getId} question={question} setQuestions={setQuestions} handleShowProfile={handleShowProfile}  />} />
          </Route>
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
