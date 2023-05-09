import {useContext } from "react";
import moment from "moment";
import { getUser } from "../utils";
import { SharedContext } from "../App";
import { MdDelete } from "react-icons/md";
import { API } from "../utils";
import { toast } from "react-toastify";

const Subject = ({ quest, handleDeleteSubj }) => {
  const { setArr, setInQportal, getSubject, handleQuestion } =
    useContext(SharedContext);

  const handleToast = (message) => {
    try {
      toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error)
    }
  };

  const checkAccess = async (id, user) => {
    try {
      await API.post("/checkAccessList", {
        _id: id,
        email: user.email_address,
      });
      console.log("succesful");
    } catch (error) {
      console.log(error);
    }
  };
  let len = quest.questions.length;

  return (
    <div
      className={`subject cursor-pointer relative mb-7 bg-b font-nuni text-sm px-4 py-4 h-60 border-[1px] shadow-Light_shadow hover:shadow-lg border-[#1e1e1e3e] rounded-lg hover:scale-105 ease-in-out duration-200`}
    >
      <div
        className={`${
          len == 0
            ? "border-[1px z-50 rounded-sm flex flex-col justify-center -translate-x-4 -translate-y-4 items-center absolute w-full h-full"
            : "hidden"
        }`}
        >
        <h1 className="font-tilt text-lg text-b1 p-2">No Questions</h1>
        <button className={`buttonUpdate`}>
          update
        </button>
      </div>
      <div className="border-[1px absolute z-50 top-4 right-4 border-b1">
        <MdDelete
          onClick={async () => {
            try {
              handleDeleteSubj(quest._id);
              const subj = await API.post("/deleteSubj", {
                _id: quest._id,
              });
              console.log(subj);
              handleToast("successfully deleted!");
            } catch (error) {
              console.log(error);
            }
          }}
          className="w-5 h-5 text-[#041b2d83] hover:scale-125 ease-in-out duration-300 hover:text-b1"
        ></MdDelete>
      </div>
      <div
        onClick={() => {
          setArr([]);
          setInQportal(true);
          getSubject(quest._id);
          handleQuestion();
          checkAccess(quest._id, getUser());
        }}
        className={`${len == 0 ? "blur-[1.5px]" : ""}`}
      >
        <header className="flex gap-2 py-2 border-r-Ofive border-[1px justify-start items-center">
          <svg
            viewBox="0 0 24 24"
            className="text-sm text-two"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10h4v4H7zm0-6h4v4H7zm0 12h4v4H7zm6-6h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z"></path>
          </svg>
          <div className="flex gap-2">
            <h1 className="Author font-extrabold text-[#656363]  ">Author:</h1>
            <p className=" font-mulish font-semibold text-[#3e6cd8]">
              {quest.addedBy}
            </p>
          </div>
        </header>
        <div className="flex justify-start">
          <h2 className="font-bold text-[#434242] ">Mixed</h2>
          <svg
            viewBox="0 0 24 24"
            className="ml-2 text-sm text-[#041b2d]"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm-.497 11l5.656-5.657-1.414-1.414-4.242 4.243L6.38 13.05l-1.414 1.414L8.503 18z"></path>
            </g>
          </svg>
        </div>
        <h1 className="font-bold text-xl text-start py-6 text-[#373636] ">
          {quest.subjectCode}
        </h1>
        <div className="Count px-2 py-2 flex font-nuni font-bold tracking-wide w-fit rounded-xl bg-[#041b2d]">
          <div className="px-2 text-[#fff] rounded-lg bg-[#004e9a]">
            {quest.questions.length}
          </div>
          <p className="px-2  text-[#fff] uppercase ">Questions</p>
        </div>
        <div className="Date text-sm text-[#5f5e5e] absolute bottom-2">
          {moment(quest.createdAt).format("MMMM Do YYYY")}
        </div>
        <div className="Date text-sm text-[#5f5e5e] absolute bottom-2 right-3">
          Accessed by student {quest.usersAccessedList.length}x
        </div>
      </div>
    </div>
  );
};

export default Subject;
