import { useNavigate } from "react-router-dom";
import { useDataContext } from "../ContextAPI/DataContext";
import Button from "./Button";

export default function PageDivider() {
  const navigate = useNavigate();
  const {
    navSubjectInfo,
    handleIsMouseLeaveOnPageDivider,
    handleIsMouseOnPageDivider,
    selectedQuiz,
    unselectQuizfn,
    dismissNav,
  } = useDataContext();

  function gotoQuiz() {
    unselectQuizfn();
    dismissNav();
    if (!selectedQuiz) return;
    navigate(`/quiz/${selectedQuiz}`);
  }
  return (
    <div className="page-divider">
      <div className="custom-shape-divider-bottom-1727941372">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div
        className="divider-cont flex-center"
        onMouseLeave={handleIsMouseLeaveOnPageDivider}
        onMouseEnter={handleIsMouseOnPageDivider}
      >
        <h2 className="page-div-heading">{navSubjectInfo.heading}</h2>
        <p>{navSubjectInfo.description.a}</p>
        <p>{navSubjectInfo.description.b}</p>
        <Button onClick={gotoQuiz}>start quiz</Button>
      </div>
    </div>
  );
}
