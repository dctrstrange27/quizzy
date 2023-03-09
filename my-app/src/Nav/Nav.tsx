import React from "react";
import { useState } from "react";
import { BsSun } from "react-icons/bs";
import SideNav from "../sideNav/SideNav";
import { Link } from "react-router-dom";
import { getUser } from "../utils";
import Profile from "./Profile";
const Nav = ({userData,setShowProfile,handleShowProfile,showProfile}) => {
  
  return (
    <>
      <div  className="flex fixed justify-end md:px-12 md:justify-between bg-[#ffffff] shadow-lg px-2 py-3  w-full border-[1px border-[#bb3636] h-14">
        <div className="border-[1px h-full hidden md:flex items-center justify-start">
          <Link
            to="/"
            onClick={() => {
              console.log("hello");
            }}
            className="nav font-normal text-b2 font-tilt text-3xl"
          >
            Quizzy
          </Link>
        </div>
        <div className="flex justify-center items-center px-2 py-2 gap-5 border-emerald-300 border-[1px">
          <div className="gap-5  md:hidden ">
            <SideNav></SideNav>
          </div>
          <Link
            onClick={() => {
              console.log("hello");
            }}
            to="shared"
            className="nav"
          >
            {" "}
            Docs
          </Link>
          <BsSun className="w-5 h-5"></BsSun>
          {getUser() ? (
            <>
              <img
                onClick={() => {setShowProfile(!showProfile)}} className="w-8 h-8 rounded-full hover:scale-105" src={`${getUser() ? getUser().profile_picture : ""}`} />
               {showProfile && <Profile/>}
            </>
          ) : (
            <Link to="/login" className="button">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
