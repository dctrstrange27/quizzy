import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
const SideNav = () => {
  const Navigate = useNavigate()

  function clearItems() {
    localStorage.setItem("currentQ", JSON.stringify([]));
  }
  return (
    <>
      <div
        className="flex md:mt-28 gap-5 
                            md:flex-col md:gap-2
                             border-[1px]"
      >
        <div className="sidenav">
          <FaGlobeAmericas className="sidenavicon"></FaGlobeAmericas>
          <Link to="shared" className="nav" onClick={()=>{
              //  localStorage.setItem("currentQ", JSON.stringify([]))
                Navigate('/shared')
              // window.location.reload();
          }}>
            {" "}
            Shared
          </Link>
        </div>
        <div className="sidenav">
          <FaPenNib className="sidenavicon"></FaPenNib>
          <Link to="yours" className="nav">
            {" "}
            add Subject
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
