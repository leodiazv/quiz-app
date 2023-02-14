import Question from "./components/Question"
import { useState, useEffect } from "react"

const API_URI = `https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple`

const App = () => {
  const [trivia, setTrivia] = useState([])
  const [choose, setChoose] = useState(Array(5).fill(null))
  const [messageReview, setMessageReview] = useState("")
  console.log(choose)
  async function getTriviaQuestions() {
    const res = await fetch(API_URI)
    const data = await res.json()
    setTrivia(data.results)
  }

  function handleChange(event, i) {
    const { value, checked } = event.target
    const nextChoose = choose.slice()
    nextChoose[i] = checked ? value : false
    setChoose((prevChoose) => (prevChoose = nextChoose))
  }

  function handleSubmit(event) {
    event.preventDefault()
    let correctAnswers = 0
    for (let i = 0; i < choose.length; i++) {
      if (choose[i] === trivia[i].correct_answer) {
        correctAnswers++
      }
    }
    setMessageReview(`You scored ${correctAnswers}/5 correct answers`)
  }

  useEffect(() => {
    getTriviaQuestions()
  }, [])

  const questionsHTML = trivia.map((item, index) => {
    return (
      <Question
        key={`question${index + 1}`}
        data={item}
        choose={choose[index]}
        options={[...item.incorrect_answers, item.correct_answer].flat()}
        numQ={`question${index + 1}`}
        handleChange={(event) => {
          handleChange(event, index)
        }}
      />
    )
  })
  return (
    <div className="trivia">
      <form className="trivia-form" onSubmit={handleSubmit}>
        <legend>Choose the right answer</legend>
        {questionsHTML}
        <div>
          <button type="submit">Check your answers</button>
        </div>
      </form>
      {messageReview && <h3>{messageReview}</h3>}
    </div>
  )
}

export default App
