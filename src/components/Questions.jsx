import React, { useEffect, useState } from "react";
import RadioBtns from "./RadioBtns/RadioBtns";

const API_URL = `https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple`;

const addInfo = (array) => {
  const newArray = array.map((item, index) => ({
    ...item,
    id: index,
    answers: item.incorrect_answers,
  }));

  newArray.forEach((item) => {
    item.answers.splice(
      Math.floor(Math.random() * item.incorrect_answers.length),
      0,
      item.correct_answer
    );
  });

  return newArray;
};

function Questions() {
  const [questionsData, setQuestionsData] = useState([]);
  const [correctedAnswers, setCorrectedAnswers] = useState({});
  const [score, setScore] = useState();
  const [showAnswer, setShowAnswer] = useState(false);

  const getQuestions = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setQuestionsData(addInfo(data.results));
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const checkAnswer = (userAnswer, correctAnswer, questionId) => {
    if (userAnswer === correctAnswer) {
      setCorrectedAnswers({ ...correctedAnswers, [questionId]: "correct" });
    } else {
      setCorrectedAnswers({ ...correctedAnswers, [questionId]: "incorrect" });
    }
  };

  const setFinalScore = (e) => {
    e.preventDefault();
    let correct = 0;
    for (const key in correctedAnswers) {
      if (correctedAnswers[key] === "correct") correct++;
    }
    setScore(correct);
    setShowAnswer(true);
  };

  const resetQuestions = () => {
    setQuestionsData([]);
    setCorrectedAnswers({});
    setScore();
    setShowAnswer(false);
    getQuestions();
  };

  return (
    <div>
      <h1>Preguntas</h1>
      {questionsData.length === 0 && <p>Loading...</p>}
      <form onSubmit={setFinalScore}>
        {questionsData.map((question) => (
          <fieldset key={question.id}>
            <legend>{question.question}</legend>
            <RadioBtns
              question={question}
              checkAnswer={checkAnswer}
              showAnswer={showAnswer}
            />
          </fieldset>
        ))}
        {!showAnswer && <button type="submit">Comprobar</button>}
      </form>
      {score && (
        <p>{`Respuestas correctas ${score}/${questionsData.length}`} </p>
      )}
      <button type="button" onClick={resetQuestions}>
        Reiniciar
      </button>
    </div>
  );
}

export default Questions;
