import React from "react";
import PropTypes from "prop-types";
import QuizCardHeader from "./QuizCardHeader";
import { Button } from "../../../components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import QuizOptions from "./QuizOptions";

const QuizRenderer = ({ game }) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState({});

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex] || {};
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    return currentQuestion.options || [];
  }, [currentQuestion]);

  const handleNext = React.useCallback(() => {
    setQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, game.questions.length - 1)
    );
  }, [game.questions.length]);

  const handlePrev = React.useCallback(() => {
    setQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const handleOptionSelect = React.useCallback(
    (index) => {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [questionIndex]: index,
      }));
    },
    [questionIndex]
  );

  const selectedChoice = selectedOptions[questionIndex] ?? null;

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-8xl w-[90vw] top-1/2 left-1/2">
      <QuizCardHeader
        questionIndex={questionIndex} // Display question index starting from 1
        totalQuestions={game.questions.length}
        question={currentQuestion.question}
      />
      <QuizOptions
        options={options}
        selectedOption={selectedChoice}
        onSelect={handleOptionSelect}
      />

      <div className="flex flex-col sm:flex-row w-full justify-between mt-4 gap-4">
        <Button
          variant="default"
          className="w-full sm:w-auto"
          size="lg"
          onClick={handlePrev}
          disabled={questionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="default"
          className="w-full sm:w-auto"
          size="lg"
          onClick={handleNext}
          disabled={questionIndex === game.questions.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

QuizRenderer.propTypes = {
  game: PropTypes.shape({
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default QuizRenderer;
