import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { DataContext } from "./ContextAPI/DataContext";
import SelectQuiz from "./pages/SelectQuiz";
import Quiz from "./pages/Quiz";
import PageNotFound from "./pages/PageNotFound";
import SubjectScore from "./pages/SubjectScore";
import { TimerDataContext } from "./TimerContext/TimerDataContext";
import OverAllProgrss from "./pages/OverAllProgrss";
import { useEffect } from "react";


function App() {
  return (
    <DataContext>
      <TimerDataContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/select-quiz" element={<SelectQuiz />} />
            <Route path="/quiz/:subject" element={<Quiz />} />
            <Route path="/quiz/:subject/score" element={<SubjectScore />} />
            <Route path="/overall-progress" element={<OverAllProgrss />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TimerDataContext>
    </DataContext>
  );
}

export default App;
