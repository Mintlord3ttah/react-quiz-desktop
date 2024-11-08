import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BtnNavigateBack from "../components/BtnNavigateBack";
import { useState } from "react";
import { useDataContext } from "../ContextAPI/DataContext";

export default function SelectQuiz() {
  const navigate = useNavigate();
  const {
    selectedQuiz,
    getSelectedQuiz: getQuizSubject,
    unselectQuizfn,
  } = useDataContext();

  function gotoQuiz() {
    unselectQuizfn();
    navigate(`/quiz/${selectedQuiz}`);
  }
  return (
    <div className="select-quiz flex-center">
      <div className="select-quiz--wrap flex-center">
        <h2 className="select-quiz--heading">Select a Quiz</h2>
        <p className="note">
          <strong>NOTE:</strong> .....Each quiz completed will result to a score of 25%
        </p>
        <ul className="quizes">
          <ListQuizItem
            subject="html"
            onClick={getQuizSubject}
            selectedQuiz={selectedQuiz}
          />
          <ListQuizItem
            subject="css"
            onClick={getQuizSubject}
            selectedQuiz={selectedQuiz}
          />
          <ListQuizItem
            subject="js"
            onClick={getQuizSubject}
            selectedQuiz={selectedQuiz}
          />
          <ListQuizItem
            subject="react"
            onClick={getQuizSubject}
            selectedQuiz={selectedQuiz}
          />
        </ul>
        <div className="ctrls-btn">
          <BtnNavigateBack text="Back" />
          {selectedQuiz && <Button onClick={gotoQuiz}>👉 Next</Button>}
        </div>
      </div>
    </div>
  );
}
function ListQuizItem({ onClick, subject, selectedQuiz }) {
  const matchSubject = selectedQuiz === subject;
  const bg = { backgroundColor: "#0baa0b" };
  return (
    <li style={matchSubject ? bg : null}>
      <span className="quiz-tag">
        {matchSubject ? "✔ " : ""}
        {subject}
      </span>
      <Button onClick={() => onClick(subject)}>
        {matchSubject ? "Unselect" : "Select"}
      </Button>
    </li>
  );
}
