import { useContext, useState } from "react";
import moment from "moment";
import { getUser, saveCurrentArray, saveCurrentSubject, shuffleRandomArray } from "../utils";
import { GlobalContext } from "../../src/utils/ContextTypes";
import { MdDelete } from "react-icons/md";
import { API } from "../utils";
import { toast } from "react-toastify";
import { BiGridVertical } from "react-icons/bi";
import { MdLibraryAddCheck } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const Subject = ({ quest, handleDeleteSubj, handleShowAddQ }) => {
  const Navigate = useNavigate();
  const {getSubject,setLen } = useContext(GlobalContext);

  const [disabledDelete, setDisable] = useState(true);

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
      console.log(error);
    }
  };

  const checkAccess = async (id, user) => {
    try {
      await API.post("/checkAccessList", {
        _id: id,
        email: user.email_address,
      });
      // console.log("succesful");
    } catch (error) {
      console.log(error);
    }
  };
  let len = quest.questions.length;

  return (
    <div
      className={`subject cursor-pointer dark:bg-[#24252681] relative mb-7 bg-b font-nuni text-sm px-4 py-4 h-60 border-[1px] dark:border-[#ffffff3c shadow-Light_shadow hover:shadow-lg border-[#1e1e1e3e] rounded-lg hover:scale-105 ease-in-out duration-200`}
    >
      <div
        className={`${
          len == 0
            ? "border-[1px z-50 rounded-sm flex flex-col justify-center -translate-x-4 -translate-y-4 items-center absolute w-full h-full"
            : "hidden"
        }`}
      >
        <h1 className="font-tilt border-[1px] dark:text-[#fff] text-lg p-2">
          No Questions!
        </h1>
        <button
          onClick={() => {
            handleShowAddQ();
            Navigate("/addSubject");
          }}
          className="buttonUpdate"
        >
          update
        </button>
      </div>
      <div className="border-[1px absolute z-50 top-4 right-4 border-b1">
        {disabledDelete && (
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
            className="w-5 h-5 text-[#041b2d83] dark:text-[#fff] hover:scale-125 ease-in-out duration-300 hover:text-b1"
          ></MdDelete>
        )}
      </div>
      <div
        onClick={() => {
          Navigate('/Qportal')
          saveCurrentSubject(quest)
         // getSubject(quest._id)
          saveCurrentArray(shuffleRandomArray(quest.questions.length))
          checkAccess(quest._id, getUser());
         
        }}
        className={`${len == 0 ? "blur-[1.5px]" : ""}`}
      >
        <header className="flex gap-2 py-2 border-r-Ofive dark:text-[#fff] border-[1px justify-start items-center">
          <BiGridVertical className="text-two dark:text-[#fff]" />
          <div className="flex gap-2">
            <h1 className="Author font-extrabold text-[#656363]  ">Author:</h1>
            <p className=" font-mulish font-semibold text-[#3e6cd8]">
              {quest.addedBy}
            </p>
          </div>
        </header>
        <div className="flex justify-start gap-2">
          <h2 className="font-bold text-[#434242]  dark:text-[#f1f1f1]">
            Mixed
          </h2>
          <MdLibraryAddCheck className="text-two dark:text-[#fff]" />
        </div>
        <h1 className="font-bold text-xl dark:text-[#fff] text-start py-6 text-[#373636] ">
          {quest.subjectCode}
        </h1>
        <div className="Count px-2 py-2 flex font-nuni font-bold tracking-wide w-fit rounded-xl bg-[#041b2d] dark:bg-[#0a3657]">
          <div className="px-2 text-[#fff] rounded-lg  bg-[#004e9a] dark:bg-[#056dd5]">
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
