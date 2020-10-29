import React, { useState } from "react";
import * as calculator from "./calculator";

const keys = [
  { key: "clear", id: "clear" },
  { key: "=", id: "equals" },
  { key: "/", id: "divide" },
  { key: "*", id: "multiply" },
  { key: "7", id: "seven" },
  { key: "8", id: "eight" },
  { key: "9", id: "nine" },
  { key: "-", id: "subtract" },
  { key: "4", id: "four" },
  { key: "5", id: "five" },
  { key: "6", id: "six" },
  { key: "+", id: "add" },
  { key: "1", id: "one" },
  { key: "2", id: "two" },
  { key: "3", id: "three" },
  { key: ".", id: "decimal" },
  { key: "0", id: "zero" },
  { key: "enter", id: "enter" },
];

const ButtonPad = ({ onClick }) => (
  <div className="button-pad">
    {keys.map((button) => (
      <button
        onClick={() => onClick(button.key)}
        key={button.key}
        id={button.id}
        className="button"
      >
        {button.key}
      </button>
    ))}
  </div>
);

const Display = ({ value }) => (
  <div className="display">
    <input id="display" value={value} className="text-box" />
  </div>
);

const App = () => {
  const [state, setState] = useState(calculator.empty);

  const handleClick = (key) => {
    if (calculator.operations.includes(key)) {
      setState(calculator.pressOperator(key)(state));
    } else if ("0123456789".split("").includes(key)) {
      setState(calculator.pressDigit(parseInt(key))(state));
    } else if (["=", "enter"].includes(key)) {
      setState(calculator.pressEquals(state));
    } else if (key === "clear") {
      setState(calculator.pressClear(state));
    } else if (key === ".") {
      setState(calculator.pressDecimal(state));
    }
  };

  return (
    <div className="calculator">
      <Display id="display" value={calculator.renderDisplay(state)} />
      <ButtonPad onClick={handleClick} />
      <div className="by-line">Olive Instruments</div>
    </div>
  );
};

export default App;
