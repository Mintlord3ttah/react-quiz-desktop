import { useParams } from "react-router-dom";
import UserProgress from "./UserProgress";
import styles from "./QuizNav.module.css";
import { useDataContext } from "../ContextAPI/DataContext";
import { useTimerDataContext } from "../TimerContext/TimerDataContext";

export default function QuizNav() {
  const { subject } = useParams();
  const { progressUpdate, subjectProgress } = useDataContext();
  const { countDownTimer } = useTimerDataContext();
  // console.log(subjectProgress);

  return (
    <div className={styles["quiz-nav"]}>
      <h3>Your Progress: {progressUpdate}%</h3>
      <span className={styles["count-down-timer"]}>{countDownTimer}</span>
      <span className={styles["wrap"]}>
        <UserProgress
          content={`${subject === "javascript" ? "js" : subject}`}
          progress={subjectProgress}
        />
      </span>
    </div>
  );
}
