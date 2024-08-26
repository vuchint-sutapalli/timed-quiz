// CardHeader.jsx
import React from "react";
import {
  Card,
  CardHeader as BaseCardHeader,
  CardDescription,
} from "../../../components/ui/card";

const QuizCardHeader = ({ questionIndex, totalQuestions, question }) => {
  return (
    <Card className="w-full mt-4">
      <BaseCardHeader className="flex flex-col sm:flex-row items-center">
        <CardDescription className="flex-grow text-lg font-bold text-center sm:text-left">
          {question}
        </CardDescription>
        <div className="flex items-center mb-4 sm:mb-0 bg-slate-100 rounded-full px-2 py-1">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold text-lg rounded-full">
            {questionIndex + 1}
          </div>
          <span className="mx-2 text-sm text-slate-500">of</span>
          <div className="text-lg font-medium text-slate-700">
            {totalQuestions}
          </div>
        </div>
      </BaseCardHeader>
    </Card>
  );
};

export default QuizCardHeader;
