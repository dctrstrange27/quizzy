import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { GlobalContext } from "@/utils/ContextTypes";
import { getUser } from "@/utils";
import NavItems from "./nav-items";

export const Navigation = () => {
   
   const { setInQportal } = useContext(GlobalContext);

   return (
      <>
         <div className="flex fixed z-20 opacity-80 border-b-2
          justify-end md:px-12 md:justify-between  bg-background  shadow-lg px-2 py-3  w-full h-14">
            <div className="border-[1px cursor-pointer h-full hidden md:flex items-center justify-start">
               <Link
                  to="/shared"
                  onClick={() => {
                     setInQportal(false);
                  }}
                  className="nav font-bold hover:text-p2    text-b2 font-tilt text-3xl"
               >
                  Quizzy
               </Link>
            </div>
            <div className="flex justify-center dark:text-one items-center px-2 py-2 gap-5  border-[1px">
               <div className="">
                  <NavItems></NavItems>
               </div>
                  <ModeToggle></ModeToggle>
                  <Profile picture={getUser() ? getUser().profile_picture : ""} name={getUser().name} />
                  <div>
                  </div>
               {/* {getUser() == false ? (
                  <Link to="/login" className="button cursor-pointer">
                     SIGN IN
                  </Link>
               ) : (
                  <>
                     <img
                        onClick={() => {
                           setShowProfile(!showProfile);
                        }}
                        className="w-10 h-10 cursor-pointer rounded-full duration-150 ease-in-out hover:scale-105 hover:border-[1px] hover:border-[#818181a6] "
                        src={`${getUser() ? getUser().profile_picture : ""}`}
                     />
                     {showProfile && <Profile picture={getUser() ? getUser().profile_picture : ""} name={getUser().name} />}
                  </>
               )} */}
            </div>
         </div>
      </>
   );
};

