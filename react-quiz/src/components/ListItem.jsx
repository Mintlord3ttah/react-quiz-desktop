import { useDataContext } from "../ContextAPI/DataContext";
import styles from "./Nav.module.css";

export default function ListItem({
  color,
  type,
  keyNumb,
  mouseEnter,
  mouseLeave,
  mouseOver,
}) {
  const { getSelectedQuiz } = useDataContext();
  function navSelection() {
    mouseEnter();
    getSelectedQuiz(type);
  }
  return (
    <li onMouseLeave={mouseLeave} onMouseEnter={navSelection}>
      <div
        className={styles["list-wrap"]}
        onMouseOver={() => mouseOver(keyNumb)}
      >
        <span className={`${styles["dot"]} ${styles[`${color}`]}`}></span>
        <span>{type}</span>
      </div>
      {/* <div className={styles["placeholder"]}></div> */}
    </li>
  );
}
