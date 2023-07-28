import React, { useContext } from "react";
import { useState } from "react";
import { BsSun } from "react-icons/bs";
import SideNav from "../sideNav/SideNav";
import { Link } from "react-router-dom";
import { getUser } from "../utils";
import Profile from "./Profile";
import { GlobalContext} from "../../src/utils/ContextTypes";

import ToggleTheme from "../sideNav/ToggleTheme";
const Nav = () => {
  const { setShowProfile, showProfile,setInQportal } = useContext(GlobalContext);
  return (
    <>
      <div className="flex fixed z-20 opacity-80  justify-end md:px-12 md:justify-between backdrop-blur-xl dark:bg-Dark_nav_bg bg-[#ffffff] shadow-lg px-2 py-3  w-full border-[1px border-[#bb3636] h-14">
        <div className="border-[1px cursor-pointer h-full hidden md:flex items-center justify-start">
          <Link to="/shared" onClick={()=>{setInQportal(false)}} className="nav hover:text-p2 font-normal text-b2 font-tilt text-3xl">
            Quizzy
          </Link>
        </div>
        <div className="flex justify-center dark:text-one items-center px-2 py-2 gap-5 border-emerald-300 border-[1px">
          <div className="gap-5 md:hidden ">
            <SideNav></SideNav>
          </div>
          <ToggleTheme></ToggleTheme>
          {getUser() == false ? (
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
            {showProfile && <Profile />}
          </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
