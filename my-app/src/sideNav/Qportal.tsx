import { useEffect, useState } from "react";
import Options from "./Options";

const Qportal = ({ questions, quest, random, handleQuestion, disabled }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => {
    setIsSelected(true);
  };
  return (
    <>
      <div className="border-[1px w-full flex flex-col px-2 mx-2 my-2">
        <h1 className="font-grot border-[1px py-3 text-2xl">
          {questions?.subjectCode}
        </h1>

        {quest == undefined ? (
          ""
        ) : (
          <div>
            <div className="font-grot text-2xl px-4 py-4 text-justify text-[#2c2b2b] border-[1px">
              {quest?.question}
            </div>
            <div className="mb-8 border-[1px">
              <Options
                disabled={disabled}
                handleQuestion={handleQuestion}
                random={random}
                quest={quest}
                isSelected={isSelected}
                handleSelect={handleSelect}
              ></Options>
              {/* {options?.map((opt,idx)=>(
                  <div key={idx}>
                    <Options opt={opt} isSelected={isSelected} handleSelect={handleSelect}></Options>
                  </div>  
                ))} */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Qportal;
