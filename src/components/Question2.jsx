import React, { useEffect, useState } from "react";

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

function Question2() {
  const [questionsData, setQuestionsData] = useState([]);
  const [correctedAnswers, setCorrectedAnswers] = useState({});
  const [score, setScore] = useState();

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
  };

  const resetQuestions = () => {
    setQuestionsData([]);
    setCorrectedAnswers({});
    setScore();
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
            {question.answers.map((answer, index) => (
              <div key={index}>
                <label htmlFor={answer}>{answer}</label>
                <input
                  type="radio"
                  id={answer}
                  name={question.id}
                  value={answer}
                  onChange={(e) =>
                    checkAnswer(
                      e.target.value,
                      question.correct_answer,
                      question.id
                    )
                  }
                  required
                ></input>
              </div>
            ))}
          </fieldset>
        ))}
        <button type="submit">Comprobar</button>
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

export default Question2;
