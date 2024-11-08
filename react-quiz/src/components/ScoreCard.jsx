import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ScoreCard({ children, heading }) {
  const navigate = useNavigate();
  return (
    <div className="score-card">
      <p className="heading">{heading}</p>
      {children}
      <Button onClick={() => navigate("/select-quiz")}>Take More Quiz</Button>
    </div>
  );
}
