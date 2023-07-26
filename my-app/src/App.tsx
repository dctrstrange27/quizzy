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
  saveUser,
 hasUser
} from "./utils/index";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Footer from "./sideNav/Footer";
import { GlobalContext } from "./utils/ContextTypes";
import LoginFirstModal from "./modal/LoginFirstModal";
const Qportal = React.lazy(() => import("./questions/Qportal"));

//context in Home,
const App = () => {
  interface user {
    email: number;
    name: string;
    picture: string;
  }
  //old
  const [subjects, setSubjects] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState<user[]>([]);
  const Navigate = useNavigate();
  const [inQportal, setInQportal] = useState(false);
  const [showAddQ, setShowAddQ] = useState(false);

  const [showModal,setShowModal] = useState(false)


  const handleShowAdd = () => {
    setShowAddQ(false);
  };

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

 

  useEffect(()=>{
    console.log(hasUser())
    if(!hasUser()) Navigate("/Login");
  },[])





  const handleShowProfile = () => {
    setShowProfile(false);
  };

  const [len, setLen] = useState(0);

  const getSubject = async (id: any) => {
    try {
      const data = await API.post("/getSubject", {
        _id: id,
      });
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App w-full relative h-screen duration-700 ease-in-out  bg-white5 dark:bg-five">
      <LoginFirstModal hasLogin={hasUser} showModal={showModal} setShowModal={setShowModal}></LoginFirstModal>
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
          len,
          setLen,
          getSubject,
          subjects,
          setSubjects,
        }}
      >
        <div className=" border-[5px h-auto border-[#fe8a8a]">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="addSubject" element={<AddSubject />} />
              <Route
                path="shared"
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
                    <Shared />
                  </React.Suspense>
                }
              />
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
