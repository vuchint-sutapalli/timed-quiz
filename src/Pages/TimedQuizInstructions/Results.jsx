import React from "react";

const ResultsView = ({ score, quizTitle }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Quiz Results
        </h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Score:</h2>
          <p className="text-gray-700">{score}</p>
        </div>
        <div className="text-center mt-6">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
