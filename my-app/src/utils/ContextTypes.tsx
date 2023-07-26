
import { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export interface GlobalContextTypes{
  userData: any;
  setShowProfile: Dispatch<SetStateAction<Boolean>>;
  showProfile: Boolean;
  inQportal: Boolean;
  setInQportal: Dispatch<SetStateAction<Boolean>>;
  handleShowProfile: () => void;
  handleShowAddQ: () => void;
  handleShowAdd: () => void;
  showAddQ: Boolean;
  len:number;
  setLen:any;
  getSubject:(id:any)=> any;
  subjects:any;
  setSubjects:any;
}

export const GlobalContext = createContext<GlobalContextTypes>({
    userData: [],
    setShowProfile: () => {},
    showProfile: false,
    inQportal: false,
    setInQportal: () => {},
    handleShowAdd: () => {},
    handleShowProfile: () => {},
    handleShowAddQ: () => {},
    showAddQ: false,
    len:null,
    setLen:()=>{},
    getSubject:(id:any)=>{},
    setSubjects:()=>{},
    subjects:[]
  });
  
