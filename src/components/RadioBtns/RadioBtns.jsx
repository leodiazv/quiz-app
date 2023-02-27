import React from "react";
import PropTypes from "prop-types";
import "../RadioBtns/RadioBtns.css";

const RadioBtns = ({ question, checkAnswer, showAnswer }) => {
  return (
    <>
      {question.answers.map((answer, index) => (
        <div key={index}>
          <input
            className={`${
              showAnswer & (answer === question.correct_answer) && "correct"
            } ${
              showAnswer & (answer !== question.correct_answer) && "incorrect"
            }`}
            type="radio"
            id={`${question.id}${answer}`}
            name={question.id}
            value={answer}
            onChange={(e) => {
              checkAnswer(e.target.value, question.correct_answer, question.id);
            }}
            required
          />
          <label htmlFor={`${question.id}${answer}`}>{answer}</label>
        </div>
      ))}
    </>
  );
};

RadioBtns.propTypes = {
  question: PropTypes.object.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
};

export default RadioBtns;
