import React from "react";
import { Button } from "../../../components/ui/button";

const QuizOptions = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      {options.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === index ? "default" : "outline"}
          className="justify-start w-full py-4 sm:py-8 mb-4 text-sm sm:text-base"
          onClick={() => onSelect(index)}
        >
          <div className="flex items-center justify-start w-full">
            <div className="p-1 sm:p-2 px-2 sm:px-3 mr-2 sm:mr-5 border rounded-md">
              {index + 1}
            </div>
            <div className="text-start flex-grow">{option}</div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default QuizOptions;
