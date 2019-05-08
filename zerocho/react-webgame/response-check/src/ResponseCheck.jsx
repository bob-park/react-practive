import React, { useState, useRef } from "react";

import ResponseCheckResult from "./ResponseCheckResult";

import "./ResponseCheck.css";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요.");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된후 클릭하세요.");
      clearTimeout(timeout.current);
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setResult(prevResult => [...prevResult, endTime.current - startTime.current]);
      setMessage("클릭해서 시작하세요.");
    }
  };

  const onReset = () => {
    setResult([]);
  };

  // const renderAverage = () => {
  //   return (
  //     result.length !== 0 && (
  //       <div>
  //         <div>
  //           평균시간: {result.reduce((a, c) => a + c) / result.length} ms
  //         </div>
  //         <button onClick={onReset}>리셋</button>
  //       </div>
  //     )
  //   );
  // };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {/*{renderAverage()}*/}
      <ResponseCheckResult result={result} onReset={onReset} />
    </>
  );
};

export default ResponseCheck;
