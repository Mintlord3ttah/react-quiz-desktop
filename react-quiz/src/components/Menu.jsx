import { useNavigate } from "react-router-dom";
import MenuListItem from "./MenuListItem";
import styles from "./Nav.module.css";
import { useState } from "react";
import { useDataContext } from "../ContextAPI/DataContext";

export default function Menu() {
  const { getSelectedQuiz } = useDataContext();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  function handleNavigate(subject) {
    navigate(`/quiz/${subject}`);
    setIsHovered(false);
  }
  return (
    <>
      <span
        className={styles["drop-down-icon"]}
        onMouseOver={() => setIsHovered(true)}
      >
        <ion-icon name="chevron-down-outline"></ion-icon>
      </span>
      <ul
        className={styles["menu"]}
        style={isHovered ? { display: "flex" } : null}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* <MenuListItem itemClick={handleNavigate} /> */}
        <List type={"html"} color={"dot-red"} />
        <List type={"css"} color={"dot-blue"} />
        <List type={"javascript"} color={"dot-yellow"} />
        <List type={"react"} color={"dot-light-blue"} />
      </ul>
    </>
  );
}

function List({ color, type, itemClick }) {
  const navigate = useNavigate();
  return (
    <li onClick={() => navigate(`/quiz/${type}`)}>
      <div
        className={styles["list-wrap"]}
        // onMouseOver={() => mouseOver(keyNumb)}
      >
        <span className={`${styles["dot"]} ${styles[`${color}`]}`}></span>
        <span>{type}</span>
      </div>
    </li>
  );
}
