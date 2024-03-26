import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "@/utils/ContextTypes";

const NavItems = () => {
  const Navigate = useNavigate()
  const {handleShowAdd } = useContext(GlobalContext);

  return (
    <> 
    <div className="flex space-x-2">
          <Link to="shared" className="nav cursor-pointer" onClick={()=>{
             handleShowAdd()
              Navigate('/shared')
          }}>
            {" "}
            Shared
          </Link>
          <Link to="addSubject" onClick={()=>{  handleShowAdd()}} className="nav cursor-pointer">
            {" "}
            add Subject
          </Link>
        </div>
       
    </>
  );
};

export default NavItems;