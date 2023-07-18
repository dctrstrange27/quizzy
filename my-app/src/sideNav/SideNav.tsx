import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "../../src/utils/ContextTypes";

const SideNav = () => {
  const Navigate = useNavigate()
  const {handleShowAdd } = useContext(GlobalContext);
  
  function clearItems() {
    localStorage.setItem("currentQ", JSON.stringify([]));
  }
 


  return (
    <> 
    <div className="flex gap-5 md:flex-col md:gap-2 border-[1px">
        <div className="sidenav">
          <FaGlobeAmericas className="sidenavicon"></FaGlobeAmericas>
          <Link to="shared" className="nav cursor-pointer" onClick={()=>{
             handleShowAdd()
              Navigate('/shared')
          }}>
            {" "}
            Shared
          </Link>
        </div>
        <div className="sidenav">
          <FaPenNib className="sidenavicon"></FaPenNib>
          <Link to="addSubject" onClick={()=>{  handleShowAdd()}} className="nav cursor-pointer">
            {" "}
            add Subject
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
