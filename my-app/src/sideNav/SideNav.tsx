import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { useContext } from "react";
import { HomeContext } from "../App";
const SideNav = () => {
  const Navigate = useNavigate()
  const {setShowAddQ } = useContext(HomeContext);
  
  function clearItems() {
    localStorage.setItem("currentQ", JSON.stringify([]));
  }

  return (
    <> 
    <div className="flex gap-5 md:flex-col md:gap-2 border-[1px">
        <div className="sidenav">
          <FaGlobeAmericas className="sidenavicon"></FaGlobeAmericas>
          <Link to="shared" className="nav cursor-pointer" onClick={()=>{
              setShowAddQ(false)
              console.log("hellow")
              Navigate('/shared')
          }}>
            {" "}
            Shared
          </Link>
        </div>
        <div className="sidenav">
          <FaPenNib className="sidenavicon"></FaPenNib>
          <Link to="addSubject" onClick={()=>{  setShowAddQ(false)}} className="nav cursor-pointer">
            {" "}
            add Subject
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
