import { useState } from "react";
import { API } from "../utils";
import { getUser } from "../utils";
import { toast } from "react-toastify";

const AddSubject = () => {
  interface subject {
    subjectCode: string;
    accessCount: number;
    addedBy: string;
    picture: string;
    usersAccessedList: [];
    questions: [];
  }

  const [question, setQuestion] = useState<subject[]>([]);
  const [subjectCode, setSubjectCode] = useState("");

  const getSubject = (e) => {
    setSubjectCode(e.target.value);
  };

  const newSubject: subject = {
    subjectCode: `${subjectCode}`,
    accessCount: 0,
    addedBy: getUser().email_address,
    picture: getUser().profile_picture,
    usersAccessedList: [],
    questions: [],
  };

  const handleToast = () => {
    try {
      toast.success("successfully added Data!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSubjectCode("");
    } catch (error) {
      toast.error("Failed to add Data!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addSubject = async (data) => {
    try {
      const subject = await API.post("/addsubject", {
        subjectCode: data.subjectCode,
        accessCount: data.accessCount,
        addedBy: data.addedBy,
        picture: data.picture,
        usersAccessedList: data.userAccessedList,
        questions: data.question,
      });
      console.log(subject.data);
      handleToast()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[90%] border-[1px">
      <div className="flex flex-col gap-5 m-auto w-[70%] md:w-[50%] lg:w-[25%] border-[1px items-center justify-center">
        <h1 className="text-[1.5rem] font-mulish font-bold">Subject Code</h1>
        <input
          value={subjectCode}
          onChange={getSubject}
          className="w-[100%] border-[2.5px] rounded-2xl h-11 px-4"
        ></input>
        <div className="flex justify-end  w-full border-[1px">
          <button
            disabled={subjectCode.length == 0 ? true : false}
            onClick={() => {
              addSubject(newSubject);
            }}
            className={` ${
              subjectCode.length == 0 ? "disabledBtn" : "questionB"
            } questionB`}
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
