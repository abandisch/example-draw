import React from "react";
import useInterval from "./useInterval";

const TIMER_SECONDS = 3;
const TIMER_DELAY_MS = 1000;
const MAX_NUMBER = 38;
const MIN_NUMBER = 0;

function randomNum() {
  return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER);
}

function TheAnimation({ selected }) {
  const [number, setNumber] = React.useState(randomNum());
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(100);

  useInterval(() => {
    // Stop timer
    if (count > 10) {
      setDelay(null);
    } else {
      setNumber(randomNum());
      setCount(count + 1);
    }
  }, delay);

  return (
    <div
      style={{
        border: "1px solid grey",
        width: 500,
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
      }}
    >
      <span
        style={{
          display: "block",
          marginBottom: 10,
          color: "#efefef",
          fontSize: 24,
        }}
      >
        This is where the animation will go
      </span>
      <span
        style={{
          display: "block",
          marginBottom: 10,
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Winning number: {count > 10 ? selected : number}
      </span>
    </div>
  );
}

function App() {
  const [values, setValues] = React.useState({
    time: TIMER_SECONDS,
    timerStarted: false,
    startAnimation: false,
    selected: null,
  });

  useInterval(
    () => {
      tick();
    },
    values.timerStarted ? TIMER_DELAY_MS : null
  );

  const tick = () => {
    if (values.time === 0) {
      setValues((vals) => ({
        ...vals,
        timerStarted: false,
        startAnimation: true,
        selected: randomNum(),
      }));
      return;
    }

    setValues((vals) => ({
      ...vals,
      time: vals.time - 1,
    }));
  };

  const handleToggleTime = () => {
    setValues((vals) => ({
      ...vals,
      timerStarted: !vals.timerStarted,
      time: vals.time === 0 ? TIMER_SECONDS : vals.time,
      startAnimation: vals.time === 0 ? false : vals.startAnimation,
    }));
  };

  const handleReset = () => {
    setValues((vals) => ({
      ...vals,
      time: TIMER_SECONDS,
      startAnimation: false,
    }));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        border: "1px solid red",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: 150,
        }}
      >
        <button onClick={handleToggleTime}>
          {values.timerStarted ? "STOP" : "START"}
        </button>
        <button onClick={handleReset}>RESET</button>
      </div>
      <div>
        <p>Draw in: {values.time} seconds</p>
      </div>
      <div>
        {values.startAnimation && <TheAnimation selected={values.selected} />}
      </div>
    </div>
  );
}

export default App;
