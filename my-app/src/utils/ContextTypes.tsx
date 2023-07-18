
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
  getSubject: (id: string) => void;
  handleQuestion: () => any;
  handleShowAddQ: () => void;
  handleShowAdd: () => void;
  showAddQ: Boolean;
  handlePortal: (subject:any,len:number) => any;
  arr:any;
  subject: any;
  currentQuestion: any; 
  handleNext: (currentQ:any,arr:any) => void;
  question: string;
  options:any;
  questionType:number;
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
    getSubject: (id: string) => {},
    handleQuestion: () => {},
    handleShowAddQ: () => {},
    showAddQ: false,
    handlePortal: (subject:any,len:number) => {},
    handleNext:(currentQ:any,arr:[]) => {},
    arr:[],
    subject: [],
    currentQuestion: [],
    question: "",
    options:[],
    questionType:null
  });
  
