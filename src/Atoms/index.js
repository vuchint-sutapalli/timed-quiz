import { atom, selector } from "recoil";
import { TIME_PER_QUESTION } from "../Pages/TimedQuizInstructions/RulesWrapper/constants";

const authState = atom({
  key: "authState", // unique ID (with respect to other atoms/selectors)
  default: {
    status: null,
    userData: null,
  },
});

const quizMetaData = atom({
  key: "quizMetaData", // unique ID (with respect to other atoms/selectors)
  default: {},
});

const quizEstimatedTime = selector({
  key: "quizEstimatedTime",
  get: ({ get }) => {
    let qns = get(quizMetaData).questions;
    console.log("computing..........");
    if (qns) {
      return qns.reduce(
        (total, question) => total + TIME_PER_QUESTION[question.difficulty],
        0
      );
    }
    return null;
  },
});

const quizMetaBreakdown = selector({
  key: "quizMetaBreakdown",
  get: ({ get }) => {
    let quizTime = get(quizEstimatedTime);
    let qns = get(quizMetaData).questions;

    console.log("computing breakdown..........");

    const questionTypes = [...new Set(qns.map((q) => q.type))];
    const difficulties = [...new Set(qns.map((q) => q.difficulty))];

    return {
      quizTime: quizTime,
      totalQuestions: qns?.length,
      types: questionTypes.map((type) => ({
        type,
        count: qns.filter((q) => q.type === type).length,
      })),
      difficulties: difficulties.map((difficulty) => ({
        difficulty,
        count: qns.filter((q) => q.difficulty === difficulty).length,
      })),
    };
  },
});
const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

export {
  textState,
  charCountState,
  authState,
  quizMetaData,
  quizEstimatedTime,
  quizMetaBreakdown,
};
