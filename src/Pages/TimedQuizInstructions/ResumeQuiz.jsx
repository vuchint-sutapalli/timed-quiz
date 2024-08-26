import React, { useCallback, useMemo } from "react";

import dayjs from "dayjs";

const ResumeQuiz = ({ quizTitle, startedAt, onResume, duration = 40 }) => {
  const remainingTime = useMemo(() => {
    const now = dayjs();
    const startTime = dayjs(startedAt);
    const endTime = startTime.add(duration, "minute");
    const remainingTimeInSeconds = endTime.diff(now, "second");

    if (remainingTimeInSeconds > 0) {
      const minutes = Math.floor(remainingTimeInSeconds / 60);
      const seconds = remainingTimeInSeconds % 60;
      return `${minutes} mins ${seconds} secs`;
    } else {
      return "0 seconds";
    }
  }, [startedAt, duration]);
  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Resume Quiz
      </h2>
      <div className="flex flex-col items-center">
        {quizTitle && (
          <div className="mb-4">
            <span className="font-semibold">Quiz Title: </span>
            <span className="text-gray-700">{quizTitle}</span>
          </div>
        )}

        {startedAt && (
          <>
            <div className="mb-6">
              <span className="font-semibold">Started At: </span>
              <span className="text-gray-700">
                {new Date(startedAt).toLocaleString()}
              </span>
            </div>
            <div className="mb-6">
              <span className="font-semibold">Remaining time: </span>
              <span className="text-gray-700">{remainingTime}</span>
            </div>
          </>
        )}

        <button
          onClick={onResume}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
        >
          Resume Quiz
        </button>
      </div>
    </div>
  );
};

export default ResumeQuiz;
