import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import IntroductoryHome from "../components/IntroductoryHome";
import { useDataContext } from "../ContextAPI/DataContext";
import { useTimerDataContext } from "../TimerContext/TimerDataContext";
import ScoreCard from "../components/ScoreCard";
import Item from "../components/Item";
import BtnNavigateBack from "../components/BtnNavigateBack";

export default function SubjectScore() {
  const { subjectProgress, highscore, passes, quizlength } = useDataContext();
  const { duration } = useTimerDataContext();
  const { subject } = useParams();
  const navigate = useNavigate();
  return (
    <div className="score-page home">
      <IntroductoryHome>
        <h3 className="home-heading">CONGRATULATIONS</h3>
        <p className="message">
          That was a fair try. You can do more, try harder next time!
        </p>
        <div className="wrap-score-card">
          <ScoreCard heading="Results">
            <Item keyName="High Score" value={highscore} unit="%" />
            <Item keyName="Subject" value={subject} />
            <Item keyName="Duration" value={duration} unit="sec" />
            <Item keyName="Total Passes" value={`${passes}/${quizlength}`} />
          </ScoreCard>
          <BtnNavigateBack text={"Back"} />
        </div>
      </IntroductoryHome>
    </div>
  );
}
