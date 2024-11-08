import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./ConfirmationWindow.module.css";
import { useDataContext } from "../ContextAPI/DataContext";

export default function ConfirmationWindow({
  interval,
  setPopUpConfirmatioWindow,
}) {
  const { onQuit } = useDataContext();
  const navigate = useNavigate();

  function confirmed() {
    onQuit();
    navigate("/");
    setPopUpConfirmatioWindow(false);
    clearInterval(interval);
  }
  function notConfirmed() {
    setPopUpConfirmatioWindow(false);
  }
  return (
    <div className={styles["overlay"]} onClick={() => notConfirmed()}>
      <div className={styles["confirm-box"]}>
        <h3 className={styles["confirm-box__header"]}>
          Are you sure you want to quit?
        </h3>
        <p className="more-info">You will lose all the progress!</p>
        <div className="ctrls">
          <Button onClick={() => confirmed()}>Yes</Button>
          <Button onClick={() => notConfirmed()}>No</Button>
        </div>
      </div>
    </div>
  );
}
