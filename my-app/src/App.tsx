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

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const [userName, setUserName] = useState();
  const [useLocal, setUseLocal] = useState(false);
  const [useGoogle, setUseGoogle] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartCount] = useState(1);
  const [showProfile,setShowProfile]=useState(false)


  interface LoginData {
    email: string;
    name: string;
    picture: string;
    email_verified: boolean;
  }

  interface user {
    email: number;
    name: string;
    picture: string;
  }
  const [userData, setUserData] = useState<user[]>([]);
 const [hasUser,setHasUser] = useState(true)
  const handleLogin = async (data: LoginData) => {
    const gCredentials = await API.post("/createG", {
      email_address: data.email,
      customer_name: data.name,
      picture: data.picture,
    });
    setUserData(gCredentials.data);
    saveUser(gCredentials);
    Navigate("/shared");
  };

  const Navigate = useNavigate();

  const handleShowProfile=()=>{setShowProfile(!showProfile)}

  useEffect(()=>{
    if(!hasUser){
      Navigate('/')
    }
  })
  console.log(showProfile)
  return (
    <div  className="App w-full h-full border-[20px border-r-b2">
      <div className=" border-[5px h-full border-r-b2">
        <Routes>
          <Route path="/" element={<Home userData={userData} showProfile={showProfile} handleShowProfile={handleShowProfile}/>}>
            <Route path="yours" element={<Yours />} />
            <Route path="shared" element={<Shared />} />
          </Route>
          <Route path="login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
