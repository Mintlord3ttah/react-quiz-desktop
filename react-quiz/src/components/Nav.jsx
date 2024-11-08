import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import styles from "./Nav.module.css";
import UserProgress from "./UserProgress";
import { useDataContext } from "../ContextAPI/DataContext";
import { useEffect, useState } from "react";
import { sumUpScores } from "../utility/utility";
import MenuListItem from "./MenuListItem";
import Menu from "./Menu";
export default function Nav() {
  const { subjectScores, quizlength } = useDataContext();
  const [degrees, setDegrees] = useState(0);
  const navigate = useNavigate();
  const userProgress = 0;
  const {
    handlemouseOver,
    handleIsMouseOnListItem,
    handleIsMouseLeaveOnListItem,
  } = useDataContext();

  useEffect(() => {
    function calcOverAllProgress() {
      const getScoes = sumUpScores(subjectScores);
      const degrees = Math.trunc(((getScoes / 100) * 360) / quizlength);
      setDegrees(degrees);
    }
    calcOverAllProgress();
  }, []);

  return (
    <nav className={styles["navigation"]}>
      <h1 className="nav-heading">
        <p className="logo">
          <span className="r">R</span>
          <span className="b">B</span>
        </p>
        <span className={styles["text"]} onClick={() => navigate("/")}>
          REACT BUILD
        </span>
      </h1>
      <div className={styles["navigation-wrap"]}>
        <ul className={styles["quiz-subjects"]}>
          <MenuListItem
            mouseLeave={handleIsMouseLeaveOnListItem}
            mouseEnter={handleIsMouseOnListItem}
            mouseOver={handlemouseOver}
          />
        </ul>
        <Menu />
        <UserProgress
          content="🏆"
          progress={degrees}
          onClick={() => navigate("/overall-progress")}
        />
      </div>
    </nav>
  );
}

// function Subjects(menu) {
//   return (

//   );
// }
