import styles from "./UserProgress.module.css";

export default function UserProgress({ content, progress, onClick }) {
  const begin = 0;
  const styleProgress = {
    background: `conic-gradient(blue ${progress}deg, #cccbcb ${begin}deg )`,
  };
  return (
    <div
      onClick={onClick}
      className={`${styles["outer"]} flex-center`}
      style={styleProgress}
    >
      <div className={`${styles["inner"]} flex-center`}>
        <span className={styles["scale-big"]}>{content}</span>{" "}
      </div>
    </div>
  );
}
