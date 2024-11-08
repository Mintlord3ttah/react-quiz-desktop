import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import IntroductoryHome from "../components/IntroductoryHome";


export default function Home({ children }) {
  const navigate = useNavigate();
  return (
    <div className="home">
      <IntroductoryHome>
        <span className="react-icon">
          <ion-icon name="logo-react"></ion-icon>
        </span>
        <h2 className="home-heading">forent-end dev quiz</h2>
        <p className="home-description">
          What is your strength on the front-end?
        </p>
        <Button onClick={() => navigate("/select-quiz")}>take a quiz</Button>
      </IntroductoryHome>
    </div>
  );
}
