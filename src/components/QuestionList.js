import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((prompt) => setQuestions(prompt))
  }, [])

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleUpdatedQue(updatedQuestions) {
    const upDatedQuestions = questions.map((question) => {
      if (question.correctIndex === updatedQuestions.correctIndex) {
        return updatedQuestions
      } else {
        return question
      }
    })
    setQuestions(upDatedQuestions)

  }



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onUpdateQue={handleUpdatedQue}/>
        ))}
        </ul>
    </section>
  );
}

export default QuestionList;
