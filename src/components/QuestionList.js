import React, { useState, useEffect } from "react";
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const allQuestions = questions.map((question) => {
    return <QuestionItem
    key={question.id}
    question={question}
    onDeleteClick={handleDeleteClick}
    onChangeClick={handleChangeClick}
    />
  })


  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
    });
  }, []);


  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  function handleChangeClick(id, eventNew) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": eventNew
       }),
    })
  }




  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
}

export default QuestionList;
