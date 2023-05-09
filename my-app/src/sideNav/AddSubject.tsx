import { useState } from "react";
import { API } from "../utils";
import { getUser } from "../utils";
import { toast } from "react-toastify";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const AddSubject = () => {
  interface subject {
    subjectCode: string;
    accessCount: number;
    addedBy: string;
    picture: string;
    usersAccessedList: [];
    questions: [];
  }
  interface question {
    questions: [];
    answerKey: number;
    options: [];
    QuestionTypes: number;
  }

  // const [questions, setQuestions] = useState<question>([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [showAddQ, setShowAddQ] = useState(false);
  const [check, setCheck] = useState(false);
  const [key, setKey] = useState<number>();
  const [identificationKey, setIdentificationKey] = useState("");
  const [TFkey, setTFkey] = useState(undefined);
  const QuestionTypes = ["true or false", "Multiple choice", "identification"];
  const [options, setOptions] = useState<any>([]);
  const [answerKey, setAnswerKey] = useState<any>("");

  const uniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const getSubject = (e) => {
    setSubjectCode(e.target.value);
  };

  const handleQuestions = () => {
    if (key == 0) {
    }
  };

  const newSubject: subject = {
    subjectCode: `${subjectCode}`,
    accessCount: 0,
    addedBy: getUser().name,
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
      handleToast();
    } catch (error) {
      console.log(error);
    }
  };

  const addChoices = () => {
    setOptions(() => [...options, { key: uniqueId() }]);
  };

  const handleIdentification = (e) => {
    setIdentificationKey(e.target.value);
    console.log(identificationKey);
  };

  const deleteOneOption = (key) => {
    setOptions(options.filter((options) => options.key != key));
  };

  const handleMultChoices = (key: string, value: string) => {
    const updatedOptions = options.map((opt) => {
      return opt.key == key ? { ...opt, value: value } : opt;
    });
    setOptions(updatedOptions);
  };
  return (
    <>
      {showAddQ ? (
        <div className="w-full h-[90%] border-[1px">
          <div className="flex flex-col gap-5 m-auto w-[70%] md:w-[50%] lg:w-[25%] border-[1px items-center justify-center">
            <h1 className="text-[1.5rem] font-mulish font-bold">
              Subject Code
            </h1>
            <input
              value={subjectCode}
              onChange={getSubject}
              className="w-[100%] border-[2.5px] rounded-2xl h-11 px-4"
            ></input>
            <div className="flex justify-center w-full border-[1px">
              <button
                disabled={subjectCode.length == 0 ? true : false}
                onClick={() => {
                  console.log("hello");
                  addSubject(newSubject);
                }}
                className={` ${
                  subjectCode.length == 0
                    ? "disabledBtn px-10 py-1"
                    : "questionB px-10 py-1"
                } questionB`}
              >
                next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="addSubjCont flex justify-center h-fit border-[1px">
            <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[50%]">
              <label className="text-start font-grot text-xl">Quetion</label>
              <textarea
                placeholder="input your question here.."
                className="py-2 border-[2.5px] font-nsans overflow-hidden h-auto overscroll-none rounded-2xl px-4"
              ></textarea>
              <label className="text-start font-grot text-lg">Types</label>
              <div className="flex gap-2">
                {QuestionTypes.map((q, idx: number) => (
                  <div className="flex gap-2 items-center" key={idx}>
                    {key == idx ? (
                      <ImCheckboxChecked
                        onClick={() => {
                          setKey(idx);
                        }}
                        className="checkedBox"
                      ></ImCheckboxChecked>
                    ) : (
                      <ImCheckboxUnchecked
                        onClick={() => {
                          setKey(idx);
                        }}
                        className="uncheckedBox"
                      ></ImCheckboxUnchecked>
                    )}
                    <h1
                      className={`${
                        key == idx ? "text-b2" : ""
                      } font-grot text-lg`}
                    >
                      {q}
                    </h1>
                  </div>
                ))}
              </div>
              {key == 0 ? (
                <div className="flex flex-col border-[1px px-5 text-start w-[30%]">
                  {["true", "false"].map((e, idx) => (
                    <div className="flex gap-2" key={idx}>
                      {TFkey == e ? (
                        <ImCheckboxChecked
                          onClick={() => {
                            setTFkey(e);
                            setAnswerKey(TFkey);
                          }}
                          className="TcheckedBox"
                        ></ImCheckboxChecked>
                      ) : (
                        <ImCheckboxUnchecked
                          onClick={() => {
                            setTFkey(e);
                            setAnswerKey(TFkey);
                          }}
                          className="uncheckedBox"
                        ></ImCheckboxUnchecked>
                      )}
                      <h1 className="uppercase font-pop font-bold">{e}</h1>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              {key == 1 ? (
                <div className="border-[1px px-5 text-start w-[80%] md:w-[50%]">
                  {options.map((opt) => {
                    return (
                      <div
                        className="flex items-center w-full border-[1px gap-2 my-1"
                        key={opt.key}
                      >
                        {TFkey == opt.key ? (
                          <ImCheckboxChecked
                            onClick={() => {
                              setTFkey(opt.key);
                            }}
                            className="TcheckedBox"
                          />
                        ) : (
                          <ImCheckboxUnchecked
                            onClick={() => {
                              setTFkey(opt.key);
                            }}
                            className="uncheckedBox"
                          />
                        )}
                        <input
                          type="text"
                          value={opt.name}
                          onChange={(event) =>
                            handleMultChoices(opt.key, event.target.value)
                          }
                          placeholder="input choices here.."
                          className="border-[2px] w-full py-1 h-8 px-2 font-nuni font-semibold rounded-lg"
                        ></input>
                        <button className="border-[1px">
                          <MdDelete
                            onClick={() => {
                              deleteOneOption(opt.key);
                            }}
                            className="w-5 h-5 text-[#fb4444] hover:scale-125 ease-out duration-200"
                          />
                        </button>
                      </div>
                    );
                  })}
                  {options.length == 0 ? (
                    <div className="w-full border-[1px bg-[#8e8e8e5c py-5 rounded-xl flex justify-center">
                      <p className="">No Question to Show!</p>
                    </div>
                  ) : (
                    ""
                  )}
                  {options.length > 10 ? (
                    <div className="w-full border-[1px flex justify-center">
                      <p className="bg-[#ec5050] text-white5 px-2 py-1 rounded-lg">
                        You've reach maximum choices
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="w-[90%] border-[1px flex justify-center">
                    <button
                      className="border-[1px"
                      onClick={() => {
                        addChoices();
                      }}
                      disabled={options.length > 10 ? true : false}
                    >
                      <FiPlus className="w-7 h-7 hover:scale-125 ease-out duration-200" />
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              {key == 2 ? (
                <div className="flex flex-col border-[1px my-4 text-start w-[50%] md:w-[60%] lg:w-[40%]">
                  <input
                    placeholder="Enter Answer here.."
                    value={identificationKey}
                    onChange={handleIdentification}
                    className="px-2 border-[1px] rounded-lg h-8"
                  ></input>
                </div>
              ) : (
                ""
              )}
              <div className="w-full flex justify-end py-4">
                <button className="questionB w-32">Add Question</button>
              </div>
              <button className="addQuestionB">Save Subject</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddSubject;
