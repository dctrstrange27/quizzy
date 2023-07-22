import { useEffect, useState } from "react";
import { API } from "../utils";
import { getUser } from "../utils";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toastSuccess, toastFailed } from "../utils";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../src/utils/ContextTypes";

const AddSubject = () => {
  const { handleShowAddQ, showAddQ } = useContext(GlobalContext);

  interface subject {
    subjectCode: string;
    accessCount: number;
    addedBy: string;
    picture: string;
    usersAccessedList: [];
    questions: [];
  }
  //generate new unique ID
  const uniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<any>([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [questionID, setQuestionID] = useState(1);

  const QuestionTypes = ["true or false", "Multiple choice", "identification"];
  const [options, setOptions] = useState<any>([{value:""}]);
  const [answerKey, setAnswerKey] = useState<any>("");

  const [key, setKey] = useState<number>();
  const [identificationKey, setIdentificationKey] = useState("");
  const [TFkey, setTFkey] = useState(null);
  const [multipleChoiceKey, setMultipleChoiceKey] = useState("");
  const [anskeyVal, setAnsKeyVal] = useState("");


  //generating new Subject
  const newSubject: subject = {
    subjectCode: `${subjectCode}`,
    usersAccessedList: [],
    accessCount: 0,
    addedBy: getUser().name,
    picture: getUser().profile_picture,
    questions: [],
  };
  // console.log(getUser().name)
  // getting Subject Code

  const getSubject = (e) => {
    setSubjectCode(e.target.value);
  };

  const Navigate = useNavigate();
  //adding subject function
  const addSubject = async (data, questions) => {
    try {
      await API.post("/addsubject", {
        subjectCode: data.subjectCode,
        accessCount: data.accessCount,
        addedBy: data.addedBy,
        picture: data.picture,
        usersAccessedList: data.userAccessedList,
        questions: questions,
      });
      toastSuccess("successfully added Subject!!");
      window.location.reload();
      Navigate("/shared");
    } catch (err) {
      toastFailed(err.response.data.messge);
      // console.log(e  rr.response.data);
    }
  };
  //handling question onchange
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };
  // for adding question
  const addQuestion = () => {
    if (question === "") return toastFailed("Please add question");
    if(anskeyVal === "")  return toastFailed("Please provide a answer");
    toastSuccess("question added!");
    setQuestionID(questionID + 1);
    setQuestions(() => [
      ...questions,
      {
        id: questionID,
        question: question,
        answerKey: answerKey,
        questionType: key,
        options: key === 1 ? options : "",
        answerKeyValue: anskeyVal,
      },
    ]);
    setQuestion("");
    setOptions([]);
    setIdentificationKey("");
    setAnswerKey("");
    setTFkey(undefined);
    setAnsKeyVal("")
  };
  
  //adding choices for Multiple choice
  const addChoices = () => {
    setOptions(() => [...options, {value:"", key: uniqueId() }]);
  };
  //this is for handling Indentification text box
  const handleIdentification = (e) => {
    setIdentificationKey(e.target.value);
  };
  // this is for deleting choices or options
  const deleteOneOption = (key) => {
    setOptions(options.filter((options) => options.key != key));
    setAnsKeyVal("")
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((quest, idx) => idx != id));
  };

  //this is for handling onchange of each option
  const handleMultChoices = (key: string, value: "") => {
    const updatedOptions = options.map((opt) => {
      return opt.key === key ? { ...opt, value:value } : opt;
    });
    // console.log(options)
    setOptions(updatedOptions);
  };
  // this will run again and again if meet atleast one on the dependencies
  useEffect(() => {
    if (key === 0) setAnswerKey(TFkey);
    if (key === 1) setAnswerKey(multipleChoiceKey);
    if (key === 2) {
      setAnswerKey(identificationKey);
      setAnsKeyVal(identificationKey);
    }
    //console.log("this is the answer key: "+answerKey)
  }, [identificationKey, TFkey, multipleChoiceKey, key]);

  return (
    <div className="h-[80vh] border-[1px  duration-700 ease-in-out">
      {!showAddQ ? (
        <div className="w-full h-[70vh] border-[1px">
          <div className="flex flex-col gap-5 m-auto w-[70%] md:w-[50%] lg:w-[25%] border-[1px items-center justify-center">
            <h1 className="text-[1.5rem] font-mulish font-bold dark:text-[#ededed] text-[#181818] ">
              Subject Code
            </h1>
            <input
              value={subjectCode}
              onChange={getSubject}
              className="w-[100%] border-[2.5px] dark:bg-[#ffffff01] dark:text-[#Fff] dark:focus:outline-none  dark:border-[#1d69a4f5] dark:border-[1px] rounded-2xl h-11 px-4"
            ></input>
            <div className="flex justify-center w-full border-[1px">
              <button
                disabled={subjectCode.length === 0 ? true : false}
                onClick={() => {
                  handleShowAddQ();
                }}
                className={` ${
                  subjectCode.length === 0
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
          <div className="addSubjCont h-auto border-[1px text-b1 dark:text-white5 flex flex-col items-center border-[1px">
            <div className="flex flex-col  gap-2 w-[90%] md:w-[70%] lg:w-[50%]">
              <div className="flex border-[1px]  rounded-xl dark:bg-[#ffffff01] p-2 dark:text-[#Fff] dark:outline-none  dark:border-[#1d69a4f5] dark:border-[1px] ">
                <label className="text-start w-fit font-grot text-xl text-b1 dark:text-white5">
                  Subject code:
                </label>
                <input
                  onChange={getSubject}
                  value={subjectCode}
                  className="font-grot grow border-[1px w-full text-start  text-2xl font-semibold bg-[#fff0] outline-none text-b1 dark:text-white5"
                />
              </div>
              {questions.length == 0 ? (
                <p className="text-[#34313184] dark:text-white5">
                  No Questions!
                </p>
              ) : (
                <div className="flex flex-col gap-2 border-[1px rounded-lg shadow-md px-3 py-5 overflow-y-auto max-h-60 ">
                  {questions.map((question, idx) => (
                    <div
                      className="flex border-[1px relative px-3 flex-col bg-[#f8f8f8]  dark:text-white5 dark:bg-[#24252681] shadow-sm py-1 rounded-lg border-[1px border-[#0000002b] text-b1 text-start px-2 w-full h-auto"
                      key={idx}
                    >
                      <h1 className="font-semibold">
                        {idx + 1}.{question.question}
                      </h1>
                      {question.options === "" ? (
                        ""
                      ) : (
                        <div className="border-[1px">
                          <h1>options:</h1>
                          {question.options.map((opt, idx) => (
                            <div
                              className="flex flex-col pl-14 gap-2"
                              key={idx}
                            >
                              <p className=" bg-[#27282b1f] dark:bg-[#242526d8]  text-sm p-2 mt-1 rounded-lg">
                                {opt.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2 items-center">
                        <p className="text-[#3c3c3cd0] dark:text-white5">
                          Answer key:
                        </p>
                        <p className="font-bold font-nuni text-[#479d0d] text-md">
                          {question.answerKeyValue}
                        </p>
                      </div>
                      <button className="absolute right-2 top-2  border-[1px">
                        <MdDelete
                          onClick={() => {
                            deleteQuestion(idx);
                            console.log(idx);
                          }}
                          className="w-5 h-5 text-[#f37676] hover:scale-125 ease-out duration-200"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="text-start font-grot text-xl text-b1 dark:text-white5">
                Question
              </label>
              <textarea
                value={question}
                onChange={handleQuestion}
                placeholder="input your question here.."
                className="py-2 dark:bg-[#ffffff01] dark:text-[#Fff] dark:outline-none  dark:border-[#1d69a4f5] dark:border-[1px]  border-[2.5px] font-nsans overflow-hidden h-auto overscroll-none rounded-2xl px-4"
              ></textarea>
              <label className="text-start font-grot text-lg">Types</label>
              <div className="flex flex-col gap-2">
                {QuestionTypes.map((q, idx: number) => (
                  <div className="flex gap-2 items-center" key={idx}>
                    {key === idx ? (
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
                        key === idx
                          ? "text-b2 dark:text-[#1d69a4]"
                          : "text-[#1c1c1c] dark:text-[#e7e7e7]"
                      } font-grot text-lg `}
                    >
                      {q}
                    </h1>
                  </div>
                ))}
              </div>
              {key === 0 ? (
                <div className="flex flex-col border-[1px px-5 text-start w-[30%]">
                  {["true", "false"].map((e, idx) => (
                    <div className="flex gap-2" key={idx}>
                      {TFkey === e ? (
                        <ImCheckboxChecked
                          onClick={() => {
                            setTFkey(e);
                            setAnswerKey(TFkey);
                            setAnsKeyVal(e);
                           
                          }}
                          className="TcheckedBox min-w-[20px] h-auto"
                        ></ImCheckboxChecked>
                      ) : (
                        <ImCheckboxUnchecked
                          onClick={() => {
                            setTFkey(e);
                            setAnswerKey(TFkey);
                            setAnsKeyVal(e);
                            // console.log(anskeyVal);
                          }}
                          className="uncheckedBox min-w-[20px] h-auto"
                        ></ImCheckboxUnchecked>
                      )}
                      <h1 className="uppercase font-pop font-bold">{e}</h1>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              {key === 1 ? (
                <div className="border-[1px px-5 text-start w-[80%] md:w-[50%]">
                  {options.map((opt, idx) => {
                    return (
                      <div
                        className="flex items-center w-full border-[1px gap-2 my-1"
                        key={idx}
                      >
                        {TFkey === opt.key ? (
                          <ImCheckboxChecked
                            onClick={() => {
                              setTFkey(opt.key);
                              setAnswerKey(opt.value);
                              setMultipleChoiceKey(opt.key);
                              setAnsKeyVal(opt.value);
                            }}
                            className="TcheckedBox"
                          />
                        ) : (
                          <ImCheckboxUnchecked
                            onClick={() => {
                              setTFkey(opt.key);
                              setAnswerKey(opt.value);
                              setMultipleChoiceKey(opt.key);
                              setAnsKeyVal(opt.value);
                            }}
                            className="uncheckedBox"
                          />
                        )}
                        <input
                          type="text"
                          value={opt.value}
                          onChange={(event:any) =>
                            handleMultChoices(opt.key, event.target.value)
                          }
                          placeholder="input choices here.."
                          className={` ${
                            TFkey === opt.key
                              ? "border-[#479d0d]  dark:border-[#217afff5] dark:border-[2.5px] border-[3px] "
                              : ""
                          } border-[2px] dark:text-[#Fff] dark:outline-none bg-[#ffffff01] dark:border-[#1d69a4f5] dark:border-[1px]   w-full py-1 h-8 px-2 font-nuni font-semibold rounded-lg`}
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
                  {options.length === 0 ? (
                    <div className="w-full border-[1px bg-[#8e8e8e5c py-5 rounded-xl flex justify-center">
                      <p className="text-[#34313184] dark:text-[#dedede]">
                        No Options to Show!
                      </p>
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
                      <FiPlus className={` ${options.length > 10 ? "cursor-not-allowed hover:scale-none text-Tabs_bg":"cursor-pointer hover:scale-125"} w-7 h-7  ease-out duration-200`} />
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              {key === 2 ? (
                <div className="flex flex-col border-[1px my-4 text-start w-[100%] md:w-[80%] lg:w-[50%]">
                  <input
                    placeholder="Enter Answer here.."
                    value={identificationKey}
                    onChange={handleIdentification}
                    className="px-2 border-[1px] rounded-lg h-8 dark:text-[#Fff] dark:outline-none bg-[#ffffff01] dark:border-[#1d69a4f5] dark:border-[1px] "
                  ></input>
                </div>
              ) : (
                ""
              )}
              <div className="w-full flex justify-end py-4">
                <button
                  className="questionB w-32"
                  onClick={() => {
                    addQuestion();
                  }}
                >
                  Add Question
                </button>
              </div>
              <button
                disabled={questions.length === 0 ? true: false}
                className="addQuestionB"
                onClick={() => {
                  if (questions.length !== 0) {
                    addSubject(newSubject, questions);
                    Navigate("/Shared");
                  } else {
                    toastFailed("No Questions added!!");
                  }
                }}
              >
                Save Subject
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddSubject;
