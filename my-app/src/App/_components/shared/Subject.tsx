import { useContext, useEffect, useState } from "react";
import moment from "moment";
import {
   getUser,
   saveCurrentArray,
   saveCurrentSubject,
   shuffleRandomArray,
} from "@/utils";
import { API } from "@/utils";
import { BiGridVertical } from "react-icons/bi";
import { MdLibraryAddCheck } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "@/utils/ContextTypes";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Subject = ({ quest }) => {
   const Navigate = useNavigate();

   const {  setInQportal} = useContext(GlobalContext);
  
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
   let len = quest?.questions?.length;
   let accessLen = quest.usersAccessedList?.length;
   
   return (
      <Card
      onClick={() => {
         Navigate("/Qportal");
         saveCurrentSubject(quest);
         saveCurrentArray(shuffleRandomArray(quest.questions.length));
         checkAccess(quest._id, getUser());
         setInQportal(true);
      }}
         className={`cursor-pointer w-full  hover:scale-105 ease-in-out duration-200 shadow-md`}
      >
         <CardHeader>
            <CardTitle className="flex text-md items-center justify-between">
               <div className="flex items-center space-x-2">
               <BiGridVertical className="text-two dark:text-[#fff]" />
               <div className="border-[1px items-center flex gap-2">
                  <span className="Author font-extrabold text-[#656363]  ">
                     Author:
                  </span>
                  <Avatar>
                     <AvatarImage className="" src={quest.picture} alt="@shadcn" />
                     <AvatarFallback>
                        {quest.addedBy.charAt(1)}
                     </AvatarFallback>
                  </Avatar>
               </div>
               </div>
               <span className={cn("text-md font-bold pointer-events-none bg-transparent")} >{len} Questions</span>
            </CardTitle>
            <CardDescription className="flex items-center space-x-2">
               <span className="font-bold text-[#434242]  dark:text-[#f1f1f1]">
                  Mixed
               </span>
               <MdLibraryAddCheck className="text-two dark:text-[#fff]" />
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div
               className={`${len == 0 ? "blur-[1.5px]" : ""}`}
            >
               <div className="flex justify-start gap-2"></div>
               <h1 className="font-bold text-xl text-start  ">
                  {quest.subjectCode}
               </h1>
            </div>
         </CardContent>
           <CardFooter className="flex justify-between w-full text-muted-foreground text-sm">
            <p>{moment(quest.createdAt).format("MMMM Do YYYY")}</p>
           Accessed by student {accessLen}x
           </CardFooter>
         {/* <div
            className={`${
               len == 0
                  ? "border-[1px z-50 hidden rounded-sm  flex-col justify-center -translate-x-4 -translate-y-4 items-center absolute w-full h-full"
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
         </div> */}
         {/* <div className="border-[1px absolute z-50 top-4 right-4 border-b1">
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
         </div> */}
      </Card>
   );
};

export default Subject;
