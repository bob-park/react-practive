import React, { useState, useEffect, useRef } from "react";
import "./RSP.css";

const rspCoords = {
  rock: "0px",
  scissor: "-142px",
  paper: "-284px"
};

const scores = {
  rock: 1,
  scissor: 0,
  paper: -1
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);

  let interval = useRef();

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  useEffect(() => {
    console.log("did mount or update");
    interval.current = setInterval(changeHand, 1000);

    return () => {
      console.log("will unmount");
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const onClickBtn = choice => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];

    console.log(`myScore : ${myScore}`);
    console.log(`cpuScore : ${cpuScore}`);

    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore(prevScore => prevScore + 1);
    } else if ([-1, 2].includes(diff)) {
      setResult("졌습니다.");
      setScore(prevScore => prevScore - 1);
    }

    setTimeout(() => {
      interval.current = setInterval(changeHand, 1000);
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("rock")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("scissor")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("paper")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점 </div>
    </>
  );
};

export default RSP;
