
import { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export interface GlobalContextTypes{
  userData: any;
  setShowProfile: Dispatch<SetStateAction<Boolean>>;
  showProfile: Boolean;
  inQportal: Boolean;
  setInQportal: Dispatch<SetStateAction<Boolean>>;
  handleShowProfile: () => void;
  setArr: Dispatch<SetStateAction<number[]>>;
  getSubject: (id: string,arr:any) => void;
  handleQuestion: () => any;
  handleShowAddQ: () => void;
  handleShowAdd: () => void;
  showAddQ: Boolean;
  handlePortal: (currentQ:any,len:number,subject:any,id:any) => any;
  arr:any;
  subject: any;
  currentQuestion: any;
  currentSubject:any; 
  handleNext: (currentQ:any,arr:any) => void;
  question: string;
  options:any;
  questionType:number;
  answerKey:any;
  len:number;
  setSubject:any;
}

export const GlobalContext = createContext<GlobalContextTypes>({
    userData: [],
    setShowProfile: () => {},
    showProfile: false,
    inQportal: false,
    setInQportal: () => {},
    handleShowAdd: () => {},
    handleShowProfile: () => {},
    setArr: () => [],
    getSubject: (id: string,arr:any) => {},
    handleQuestion: () => {},
    handleShowAddQ: () => {},
    showAddQ: false,
    handlePortal: (currentQ:any,len:number,subject:any,id:any) => {},
    handleNext:(currentQ:any,arr:[]) => {},
    arr:[],
    subject: [],
    currentQuestion: [],
    currentSubject:[],
    question: "",
    options:[],
    questionType:null,
    answerKey:"",
    len:null,
    setSubject:() => {},
  });
  
