//import React, { Component } from "react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Ball from "./Ball";

import "./Lotto.css";

function getWinNumbers() {
  console.log("getWinNumber");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

/*class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false
  };

  timeout = [];

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeout.forEach(v => clearTimeout(v));
  }

  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      this.timeout[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          };
        });
      }, (i + 1) * 1000);

      this.timeout[6] = setTimeout(() => {
        this.setState({
          bonus: winNumbers[6],
          redo: true
        });
      }, 7000);
    }
  };

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false
    });

    this.timeout = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="result">
          {winBalls.map(v => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}*/

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  useEffect(() => {
    runTimeouts();

    return () => {
      timeouts.current.forEach(v => clearTimeout(v));
    };
  }, [timeouts.current]);

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(
        () => setWinBalls(prevWinBalls => [...prevWinBalls, winNumbers[i]]),
        (i + 1) * 1000
      );

      timeouts.current[6] = setTimeout(() => {
        setBonus(winNumbers[6]);
        setRedo(true);
      }, 7000);
    }
  };

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  };

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {winBalls.map(v => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
