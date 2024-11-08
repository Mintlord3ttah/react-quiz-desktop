import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Question.module.css";
import { useEffect, useRef, useState } from "react";
import OptionList from "./OptionList";
import ConfirmationWindow from "./ConfirmationWindow";
import { useDataContext } from "../ContextAPI/DataContext";
import { useTimerDataContext } from "../TimerContext/TimerDataContext";

const subjects = ["html", "css", "javascript", "react"];
const BASE_URL = "http://localhost:8000";

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popUpConfirmationWindow, setPopUpConfirmatioWindow] = useState(false);
  const [pickQuestion, setPickQuestion] = useState(0);
  const [userAns, setUserAns] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const { getQuizLength, onQuizEnded, getAccAnswer, onhashchange } = useDataContext();
  const { dispatchTimer, detectQuizEnd } = useTimerDataContext();
  const { subject } = useParams();
  const subjectKey = subjects.indexOf(subject);
  const questionEntryPoint = questions[pickQuestion];
  const options = questionEntryPoint?.options;
  const navigate = useNavigate();
  const timerRef = useRef("");
  let interval;

  function nextQuestion() {
    setPickQuestion((p) => p + 1);
    setUserAns("");
    setCorrectAnswer(null);
  }

  function getUserAnswer(option) {
    setUserAns(option);
  }
  function endQuiz() {
    navigate("score");
    onQuizEnded(subject);
    detectQuizEnd();
  }

  function handleConfirmation() {
    setPopUpConfirmatioWindow(true);
  }


  useEffect(() => {
    onhashchange()
  }, [])
  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/${subjectKey}`);
        const data = await res.json();
        setQuestions(data.questions);
        getQuizLength(data.questions);
      } catch (err) {
        console.log(err.message());
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, [subject]);

  useEffect(() => {
    if (!questionEntryPoint) return;
    setCorrectAnswer(options[questionEntryPoint.answer]);
    getAccAnswer(options[questionEntryPoint.answer]);
  }, [questionEntryPoint]);

  useEffect(() => {
    if (!questions) return;
    let minuites = 0,
      seconds = 0;

    function quizDuration() {
      let min = 2;
      let sec = 60;
      interval = setInterval(() => {
        seconds = sec <= 0 ? (sec = 59) : --sec;
        minuites = sec <= 0 && min > 0 ? min-- : min;
        timerRef.current = `${`${minuites}`.padStart(
          2,
          0
        )}:${`${seconds}`.padStart(2, 0)}`;
        dispatchTimer(timerRef.current);
        if (minuites <= 0 && seconds <= 0)
          return (() => {
            clearInterval(interval);
            navigate("score");
            detectQuizEnd();
            onQuizEnded(subject);
          })();
      }, 1000);
    }
    quizDuration();
    return () => clearInterval(interval);
  }, [questions]);

  if (!questions.length) return;

  return (
    <>
      {isLoading ? (
        <h2>LOADING</h2>
      ) : (
        <div className={styles["question"]}>
          {popUpConfirmationWindow && (
            <ConfirmationWindow
              setPopUpConfirmatioWindow={setPopUpConfirmatioWindow}
              interval={interval}
            />
          )}
          <h2 className={styles["q-heading"]}>
            {pickQuestion + 1}) {questionEntryPoint.q}?
          </h2>
          <div className={styles["wrap-up"]}>
            <ul className={styles["q-options"]}>
              {options.map((v, i) => {
                return (
                  <OptionList
                    option={options[i]}
                    getUserAnswer={getUserAnswer}
                    userAns={userAns}
                    correctAnswer={correctAnswer}
                    pickQuestion={pickQuestion}
                    key={i}
                  />
                );
              })}
            </ul>
            <div className={styles["ctrls-btn"]}>
              <div onClick={handleConfirmation}>
                <Button>👈 Quit</Button>
              </div>
              {userAns &&
                (pickQuestion + 1 < questions.length ? (
                  <Button onClick={() => nextQuestion()}>👉 Next</Button>
                ) : (
                  <Button onClick={() => endQuiz()}>👉 Finsh</Button>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
