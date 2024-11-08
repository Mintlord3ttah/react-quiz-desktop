import { createContext, useContext, useEffect, useReducer } from "react";
const Context = createContext();

const data = [
  {
    subject: "html",
    heading: "hypertext markup language (html)",
    description: {
      a: "Do you think you are too good for HTML? Think again!",
      b: "Hahahahahaha!",
    },
  },
  {
    subject: "css",
    heading: "cascading stylesheet (css)",
    description: {
      a: "How well do you trust your design skills?",
      b: "Find out more!",
    },
  },
  {
    subject: "javascript",
    heading: "javascript",
    description: {
      a: "If you have the guts, rate your self here.",
      b: "come on, take up the challenge!",
    },
  },
  {
    subject: "react",
    heading: "react.js",
    description: {
      a: "I guess you know this is the boss  level",
      b: "You must be brave enough!",
    },
  },
];
const initialState = {
  hoveringList: false,
  navSubjectInfo: null,
  isMouseOnPD: false,
  isMouseOnLI: false,
  progressUpdate: 0,
  progressCounter: 0,
  quizlength: 0,
  status: "",
  duration: "",
  subjectProgress: 0,
  userAns: "",
  answer: "",
  highscore: 0,
  subjectProInPercentage: 0,
  passes: 0,
  overallProgress: 0,
  subject: "",
  subjectScores: [],
  selectedQuiz: "",
};

function reducer(state, action) {
  const updatedQuitProps = {
    progressCounter: 0,
    progressUpdate: 0,
    subjectProgress: 0,
    subjectProInPercentage: 0,
  }
  switch (action.type) {
    case "navigation/mouse-over":
      return {
        ...state,
        hoveringList: true,
        navSubjectInfo: data[action.payload],
      };
    case "navigation/dismiss":
      return {
        ...state,
        hoveringList: false,
      };
    case "page-divider/mouse-on":
      return {
        ...state,
        isMouseOnPD: true,
      };
    case "page-divider/mouse-leave":
      return {
        ...state,
        isMouseOnPD: false,
      };
    case "list-item/mouse-on":
      return {
        ...state,
        isMouseOnLI: true,
      };
    case "list-item/mouse-leave":
      return {
        ...state,
        isMouseOnLI: false,
      };
    case "quiz/unselected-subject":
      return {
        ...state,
        selectedQuiz: "",
      };
    case "quiz/selected-subject":
      return {
        ...state,
        selectedQuiz:
          action.payload === state.selectedQuiz ? "" : action.payload,
      };
    case "quiz/questions-loaded":
      return {
        ...state,
        passes: 0,
        quizlength: action.payload.length,
      };
    case "quiz/new-answer":
      return {
        ...state,
        answer: action.payload,
      };
    case "quiz/in-progress":
      const progressInDeg =
        state.subjectProgress + (1 / state.quizlength) * 360;
      const progressInPer =
        state.subjectProInPercentage + (1 / state.quizlength) * 100;
      const condition = state.answer === action.payload;
      return {
        ...state,
        progressCounter: state.progressCounter + 1,
        progressUpdate: ((state.progressCounter + 1) / state.quizlength) * 100,
        userAns: action.payload,
        subjectProgress: condition ? progressInDeg : state.subjectProgress,
        subjectProInPercentage: condition
          ? progressInPer
          : state.subjectProInPercentage,
        passes: condition ? state.passes++ : state.passes,
      };
    case "quiz/ended":
      const currSubject = action.payload;
      const shareableScore = state.subjectProInPercentage;
      const manageScores = state.subjectScores.map((v) => {
        console.log(v.score, v.score >= shareableScore);
        return v.subject === currSubject
          ? {
            ...v,
            score: v.score >= shareableScore ? v.score : shareableScore,
          }
          : v;
      });
      const findCurrSub = state.subjectScores.find(
        (v) => v.subject === currSubject
      );

      return {
        ...state,
        progressCounter: 0,
        progressUpdate: 0,
        subjectProgress: 0,
        subjectProInPercentage: 0,
        highscore: findCurrSub
          ? manageScores.find((v) => v.subject === currSubject).score
          : state.subjectProInPercentage,
        subject: currSubject,
        subjectScores: findCurrSub
          ? manageScores
          : [
            ...state.subjectScores,
            { subject: action.payload, score: shareableScore },
          ],
      };
    case "quiz/quit":
      return {
        ...state,
        ...updatedQuitProps
      };
    case "URL/hash-change-detected":
      return {
        ...state,
        ...updatedQuitProps
      }
  }
}

function DataContext({ children }) {
  const [
    {
      hoveringList,
      navSubjectInfo,
      isMouseOnPD,
      progressUpdate,
      quizlength,
      isMouseOnLI,
      duration,
      subjectProgress,
      userAns,
      highscore,
      passes,
      subjectScores,
      selectedQuiz,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  function getQuizLength(questions) {
    dispatch({
      type: "quiz/questions-loaded",
      payload: questions,
    });
  }

  function onhashchange() {
    dispatch({ type: "URL/hash-change-detected" })
  }
  function getSelectedQuiz(subject) {
    dispatch({ type: "quiz/selected-subject", payload: subject });
  }
  function unselectQuizfn() {
    dispatch({ type: "quiz/unselected-subject" });
  }
  function handlemouseOver(key) {
    dispatch({ type: "navigation/mouse-over", payload: key });
  }
  function getAccAnswer(accAnswer) {
    dispatch({ type: "quiz/new-answer", payload: accAnswer });
  }
  function handleMouseLeave() {
    dispatch({ type: "navigation/mouse-leave" });
  }
  function handleIsMouseOnPageDivider() {
    dispatch({ type: "page-divider/mouse-on" });
  }
  function handleIsMouseLeaveOnPageDivider() {
    dispatch({ type: "page-divider/mouse-leave" });
  }
  function handleIsMouseOnListItem() {
    dispatch({ type: "list-item/mouse-on" });
  }
  function handleIsMouseLeaveOnListItem() {
    dispatch({ type: "list-item/mouse-leave" });
  }
  function quizInProgress(option) {
    dispatch({ type: "quiz/in-progress", payload: option });
  }
  function onQuizEnded(curSubject) {
    console.log(curSubject);
    dispatch({ type: "quiz/ended", payload: curSubject });
  }
  function onQuit() {
    dispatch({ type: "quiz/quit" });
  }
  function dismissNav() {
    dispatch({ type: "navigation/dismiss" });
  }

  useEffect(() => {
    if (!isMouseOnPD && !isMouseOnLI) dismissNav();
  }, [isMouseOnLI, isMouseOnPD]);
  return (
    <Context.Provider
      value={{
        hoveringList,
        handlemouseOver,
        navSubjectInfo,
        handleMouseLeave,
        isMouseOnPD,
        isMouseOnLI,
        handleIsMouseOnListItem,
        handleIsMouseOnPageDivider,
        handleIsMouseLeaveOnListItem,
        handleIsMouseLeaveOnPageDivider,
        getQuizLength,
        quizInProgress,
        progressUpdate,
        quizlength,
        onQuizEnded,
        duration,
        subjectProgress,
        userAns,
        getAccAnswer,
        highscore,
        passes,
        subjectScores,
        getSelectedQuiz,
        selectedQuiz,
        unselectQuizfn,
        onQuit,
        dismissNav,
        onhashchange
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useDataContext() {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error("useDataContext used outside of the DataContext");
  return context;
}
export { DataContext, useDataContext };

// const filter = ["n", "g", "q"];
// const log = filter.map((v) => v === "g" && "log");
// console.log(log);
