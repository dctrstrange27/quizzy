
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
  handleShowAddQ: () => void;
  handleShowAdd: () => void;
  showAddQ: Boolean;
  handlePortal: (currentQ:any,len:number,subject:any,id:any) => any;
  arr:any;
  subject: any;
  currentQuestion:any; 
  handleNext: (arr:any) => any;
  question: string;
  options:any;
  questionType:number;
  answerKey:any;
  len:number;
  setSubject:any;
  setCurrentQuestion:any;
  id:any;
  setID:any;
  getSubject:(id:any)=> any;
  setLen:any;
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
    handleShowAddQ: () => {},
    showAddQ: false,
    handlePortal: (currentQ:any,len:number,subject:any,id:any) => {},
    handleNext:(arr:[]) => {},
    arr:[],
    subject: [],
    currentQuestion:[],
    question: "",
    options:[],
    questionType:null,
    answerKey:"",
    len:null,
    setSubject:() => {},
    setCurrentQuestion:()=>{},
    id:null,
    setID:()=>{},
    getSubject:(id:any)=>{},
    setLen:()=>{},
  });
  
