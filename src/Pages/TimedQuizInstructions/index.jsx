import React, { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import RulesWrapper from "./RulesWrapper/index.jsx";
import dbService from "../../appWrite/databaseConfig";
import { authState, quizMetaData } from "../../Atoms";

import { useRecoilState, useRecoilValue } from "recoil";
import ResultsView from "./Results";
import { useNavigate } from "react-router-dom";
import ResumeQuiz from "./ResumeQuiz";

const TimedQuizInstructions = () => {
  let { getParam } = useQuery();
  const [quizMeta, setQuizMeta] = useRecoilState(quizMetaData);

  const quizId = getParam("id");
  const [quizState, setQuizState] = useState(null);
  const [sessionObj, setSessionObj] = useState({});

  const { userData } = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId && userData?.$id) {
      checkSession(userData.$id, quizId);
    }
  }, [quizId, userData]);

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

  async function checkSession(userId, quizId) {
    const sObject = await dbService.checkQuizSessionState({
      user_id: userId,
      quiz_id: quizId,
    });
    const { state } = sObject;
    setQuizState(state);
    setSessionObj(sObject);
    console.log("sessionObject", sObject);
  }

  const onResume = () => {
    navigate(`/play-quiz/${quizId}?sessionId=${sessionObj.session_id}`);
  };

  return (
    <>
      {quizState === "not_started" ? <RulesWrapper quizId={quizId} /> : null}
      {quizState === "in_progress" ? (
        <ResumeQuiz
          quizTitle={quizMeta?.quizTitle}
          quizId={quizId}
          startedAt={sessionObj.started_at}
          onResume={onResume}
        />
      ) : null}
      {quizState === "completed" ? (
        <ResultsView score={quizState.score} quizTitle={quizMeta?.quizTitle} />
      ) : null}
    </>
  );
};

export default TimedQuizInstructions;
