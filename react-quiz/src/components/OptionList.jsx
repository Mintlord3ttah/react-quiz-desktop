import styles from "./Question.module.css";
import { useDataContext } from "../ContextAPI/DataContext";
import { useEffect, useState } from "react";

export default function OptionList({
  option,
  correctAnswer,
  userAns,
  getUserAnswer,
  pickQuestion,
}) {
  const { quizInProgress } = useDataContext();

  function onhandleClick() {
    if (userAns) return;
    getUserAnswer(option);
    quizInProgress(option);
  }

  return (
    <li
      onClick={() => onhandleClick()}
      className={`${userAns
          ? option === userAns && userAns === correctAnswer
            ? styles["correct"]
            : option === userAns && userAns !== correctAnswer
              ? styles["wrong"]
              : option === correctAnswer
                ? styles["correct"]
                : ""
          : ""
        }`}
    >
      {option}
    </li>
  );
}
