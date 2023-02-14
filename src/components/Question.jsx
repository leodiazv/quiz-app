import React from "react"

const Question = ({ data, choose, handleChange, options, numQ }) => {
  return (
    <div className="question">
      <fieldset id="question">
        <h3>{data.question}</h3>
        <label>
          <input
            type="radio"
            name={numQ}
            value={options[0]}
            checked={choose === options[0]}
            onChange={handleChange}
          />
          {options[0]}
        </label>
        <label>
          <input
            type="radio"
            name={numQ}
            value={options[1]}
            checked={choose === options[1]}
            onChange={handleChange}
          />
          {options[1]}
        </label>
        <label>
          <input
            type="radio"
            name={numQ}
            value={options[2]}
            checked={choose === options[2]}
            onChange={handleChange}
          />
          {options[2]}
        </label>
        <label>
          <input
            type="radio"
            name={numQ}
            value={options[3]}
            checked={choose === options[3]}
            onChange={handleChange}
          />
          {options[3]}
        </label>
      </fieldset>
    </div>
  )
}

export default Question
