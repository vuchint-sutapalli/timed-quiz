import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import dbService from "../../../appWrite/databaseConfig";
import RulesPage from "./Rules";
import { authState, quizMetaData } from "../../../Atoms";

const RulesWrapper = ({ quizId }) => {
  const quizMeta = useRecoilValue(quizMetaData);
  const { userData } = useRecoilValue(authState);
  const navigate = useNavigate();

  if (!quizId) {
    return null;
  }

  const handleStartQuiz = async () => {
    try {
      const quizSession = await dbService.createQuizSession({
        quiz_id: quizMeta.$id,
        user_id: userData.$id,
        started_at: new Date().toISOString(),
      });

      console.log("quizsession", quizSession);
      navigate(`/play-quiz/${quizMeta.$id}?sessionId=${quizSession.$id}`);
    } catch (error) {
      console.error("Error starting quiz:: handleStartQuiz()", error);
    }
  };

  return (
    <div className="w-full">
      {quizMeta?.$id ? (
        <RulesPage quizData={quizMeta} onStart={handleStartQuiz} />
      ) : null}
    </div>
  );
};

export default RulesWrapper;
