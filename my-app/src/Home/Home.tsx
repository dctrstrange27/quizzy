import React, { useDebugValue, useEffect,useContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import Side from "../sideNav/Side";
const Home = () => {

  return (
    <>
        <div className="Home relative  bg-b border-[5px h-screen border-r-Ofive">
          <Nav></Nav>
        <div
          className="px-14 flex flex-col items-center gap-2 pt-20 py-5 w-full border-[1px
                     border-[2px border-[#700a0a] text-[#041b2d] dark:text-[#eaeaea]"
        >
          <BsFillJournalBookmarkFill className="w-5 h-5 " />
          <h1 className="font-bold text-base">Reviewers</h1>
          <p className="font-light text-center text-sm max-w-md">
            These are reviewers/questions that are created & shared by different
            students to practice for their exam.{" "}
          </p>
          {/* sample */}
        </div>
          <Side></Side>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
