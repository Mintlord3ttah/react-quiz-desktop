import { createContext, useContext, useReducer } from "react";
import React from "react";
const TimerContext = createContext();

const joinXY = (x, y) => [x, y].join("");
function convertToSec(timeLog) {
  const [min1, min2, x, sec1, sec2] = timeLog.split("");
  const minuite = Number(joinXY(min1, min2)) * 60;
  const seconds = Number(joinXY(sec1, sec2));
  const toSec = minuite + seconds;
  return toSec;
}

function converToStandardTimeLog(numb) {
  const number = numb + 1; // adding 1sec ommited by timer
  const sec = number >= 59 ? number % 60 : number;
  const min = number >= 60 ? Math.trunc(number / 60) : 0;
  const stdTimeLog = `${`${min}`.padStart(2, 0)}:${`${sec}`.padStart(2, 0)}`;
  return stdTimeLog;
}

function calcualateTimeFrame(start, end) {
  const firstLog = convertToSec(start);
  const lastLog = convertToSec(end);
  const timeFrame = firstLog - lastLog;
  const result = converToStandardTimeLog(timeFrame);
  return result;
}
calcualateTimeFrame("01:59", "00:00");
const initialState = {
  countDownTimer: "",
  timerStart: "",
  timerEnd: "",
  duration: "00:00",
};
function reducer(state, action) {
  switch (action.type) {
    case "quiz/start-timer":
      const timer = action.payload;
      return {
        ...state,
        countDownTimer: timer,
        timerStart: state.timerStart ? state.timerStart : timer,
        timerEnd: timer,
      };
    case "quiz/end-timer":
      return {
        ...state,
        duration: calcualateTimeFrame(state.timerStart, state.timerEnd),
      };
  }
}
function TimerDataContext({ children }) {
  const [{ countDownTimer, duration }, dispatch] = useReducer(
    reducer,
    initialState
  );

  if (!React.isValidElement(children))
    throw new Error("Children must be a valid React element");

  function dispatchTimer(timer) {
    dispatch({ type: "quiz/start-timer", payload: timer });
  }
  function detectQuizEnd() {
    console.log("quiz ended");
    dispatch({ type: "quiz/end-timer" });
  }

  return (
    <TimerContext.Provider
      value={{ countDownTimer, duration, dispatchTimer, detectQuizEnd }}
    >
      {children}
    </TimerContext.Provider>
  );
}

function useTimerDataContext() {
  const context = useContext(TimerContext);
  if (context === undefined)
    throw new Error(
      "useTimerDataContext used outside of TimerDataContext.Provider"
    );
  return context;
}

export { TimerDataContext, useTimerDataContext };
