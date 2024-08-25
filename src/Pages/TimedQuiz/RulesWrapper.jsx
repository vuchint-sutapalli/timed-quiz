import React, { useEffect } from "react";
// import useQuery from "../../hooks/useQuery";
import dbService from "../../appWrite/databaseConfig";

import RulesPage from "./Rules";
import { authState, quizMetaData } from "../../Atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const RulesWrapper = ({ quizId }) => {
  //   let { getParam } = useQuery();
  //   const quizId = getParam("id");

  const [quizMeta, setQuizMeta] = useRecoilState(quizMetaData);
  const { userData } = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) {
      init(quizId);
    }
  }, [quizId]);

  if (!quizId) {
    return null;
  }

  async function init(qid) {
    const quizData = await dbService.getQuizMetadata(qid);
    setQuizMeta(quizData);
  }

  const handleStartQuiz = async () => {
    try {
      const quizSession = await dbService.createQuizSession({
        quiz_id: quizMeta.$id,
        user_id: userData.$id,
        started_at: new Date().toISOString(),
      });
      console.log(quizSession);

      // Redirect to the quiz interface
      navigate(`/quiz/${quizMeta.$id}`, {
        state: { sessionId: quizSession.$id },
      });
    } catch (error) {
      console.error("Error starting quiz:: handleStartQuiz()", error);
      // Handle errors (e.g., show an error message)
    }
  };

  return (
    <div>
      {quizMeta?.$id ? (
        <RulesPage quizData={quizMeta} onStart={handleStartQuiz} />
      ) : null}
    </div>
  );
};

export default RulesWrapper;
