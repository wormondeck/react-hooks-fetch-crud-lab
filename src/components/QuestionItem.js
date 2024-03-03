import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQue }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleUpdateQuestion(e) {
    const selectedValue = e.target.value;
    console.log(selectedValue)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": selectedValue,
      }),
    })
      .then((r) => r.json())
      .then((updatedQuestions) => onUpdateQue(updatedQuestions));
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteQuestion(question));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateQuestion}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
