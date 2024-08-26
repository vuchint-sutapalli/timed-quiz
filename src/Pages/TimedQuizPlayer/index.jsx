import React from "react";
import useQuery from "../../hooks/useQuery";
import { useParams } from "react-router-dom";
import QuizRenderer from "./QuizRenderer";

const sampleQuizData = {
  id: "quiz1",
  questions: [
    {
      id: "q1",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    },
    {
      id: "q2",
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
    },
    {
      id: "q3",
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
    },
  ],
};
const TimedQuizPlayer = () => {
  const { qId } = useParams();
  let { getParam } = useQuery();
  const sessionId = getParam("sessionId");

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* PlayTimedQuiz::{qId}:::{sessionId} */}
      <QuizRenderer game={sampleQuizData} />
    </div>
  );
};

export default TimedQuizPlayer;
