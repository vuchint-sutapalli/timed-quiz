import { RULES, BREAKDOWN_LABELS } from "./constants"; // Adjust the path as needed
import { quizMetaBreakdown } from "../../../Atoms";
import { useRecoilValue } from "recoil";

const RulesPage = ({ quizData, onStart }) => {
  const { quizTitle } = quizData;
  const metaBreakdown = useRecoilValue(quizMetaBreakdown);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {`Rules for Starting ${quizTitle}`}
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Quiz Rules</h3>
        <ul className="list-disc pl-5 space-y-2">
          {RULES.map((rule, index) => (
            <li key={index} className="text-gray-600">
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Quiz Breakdown
        </h3>
        <table className="w-full border-collapse border border-gray-200 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-4 text-center">Type</th>
              <th className="border border-gray-300 p-4 text-center">Count</th>
            </tr>
          </thead>
          <tbody>
            {metaBreakdown.types.map((type) => (
              <tr key={type.type}>
                <td className="border border-gray-300 p-4">
                  {BREAKDOWN_LABELS.type} {type.type?.toUpperCase()}
                </td>
                <td className="border border-gray-300 p-4">{type.count}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-300 p-4">Total Questions</td>
              <td className="border border-gray-300 p-4">
                {metaBreakdown.totalQuestions}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4">Estimated Time</td>
              <td className="border border-gray-300 p-4">
                {metaBreakdown.quizTime} minutes
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Question Difficulty Breakdown
        </h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-4 text-center">
                Difficulty
              </th>
              <th className="border border-gray-300 p-4 text-center">Count</th>
            </tr>
          </thead>
          <tbody>
            {metaBreakdown.difficulties.map((difficulty) => (
              <tr key={difficulty.difficulty}>
                <td className="border border-gray-300 p-4">
                  {BREAKDOWN_LABELS.difficulty} {difficulty.difficulty}
                </td>
                <td className="border border-gray-300 p-4">
                  {difficulty.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button
          onClick={onStart}
          className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default RulesPage;
