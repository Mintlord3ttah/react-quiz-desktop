import IntroductoryHome from "../components/IntroductoryHome";
import ScoreCard from "../components/ScoreCard";
import Item from "../components/Item";
import { useDataContext } from "../ContextAPI/DataContext";
import { accordUserByScores, sumUpScores } from "../utility/utility";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const accorlates = ["really top notch", "fair enough", "cool", "not cool"];
export default function OverAllProgrss() {
  const navigate = useNavigate();
  const { subjectScores } = useDataContext();
  const totalScores = sumUpScores(subjectScores);
  return (
    <div className="home">
      <IntroductoryHome>
        <h3 className="home-heading">ALL RESULTS HERE</h3>
        <p className="message">
          Your skills are {accordUserByScores(totalScores, accorlates)}. You
          have a total high score of {totalScores}.
        </p>
        <div className="wrap-score-card">
          <ScoreCard heading="All Results">
            {subjectScores.map((v) => (
              <Item
                keyName={v.subject}
                value={v.score}
                unit="%"
                key={v.subject}
              />
            ))}
          </ScoreCard>
          <Button onClick={() => navigate(-1)}>👈 Back</Button>
        </div>
      </IntroductoryHome>
    </div>
  );
}
