import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import RulesWrapper from "./RulesWrapper";
import dbService from "../../appWrite/databaseConfig";
import { authState, quizMetaData } from "../../Atoms";

import { useRecoilValue } from "recoil";
import ResultsView from "./Results";

const TimedQuiz = () => {
  let { getParam } = useQuery();
  const quizId = getParam("id");
  const [quizState, setQuizState] = useState(null);
  const quizMeta = useRecoilValue(quizMetaData);
  const { userData } = useRecoilValue(authState);

  useEffect(() => {
    if (quizId && userData?.$id) {
      checkSession(userData.$id, quizId);
    }
  }, [quizId, userData]);

  async function checkSession(userId, quizId) {
    const { state } = await dbService.checkQuizSessionState({
      user_id: userId,
      quiz_id: quizId,
    });
    setQuizState(state);
    console.log(state);
  }

  return (
    <>
      <div>{quizMeta?.quizTitle}</div>
      {quizState === "not_started" ? <RulesWrapper quizId={quizId} /> : null}
      {quizState === "in_progress" ? <div>Quiz in progress</div> : null}
      {quizState === "completed" ? (
        <ResultsView score={quizState.score} quizTitle={quizMeta?.quizTitle} />
      ) : null}
    </>
  );
};

export default TimedQuiz;
