import React, { useState } from "react";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [currentOperator, setCurrentOperator] = useState(null);
  const [previousInput, setPreviousInput] = useState(null);

  const updateInput = () => {
    // Update the input in the UI
  };

  const clear = () => {
    setCurrentInput("");
    setCurrentOperator(null);
    setPreviousInput(null);
    updateInput();
  };

  const handleNumberClick = (number) => {
    setCurrentInput((prevInput) => prevInput + number);
    updateInput();
  };

  const handleOperatorClick = (operator) => {
    if (currentOperator !== null) {
      calculate();
    }
    setCurrentOperator(operator);
    setPreviousInput(currentInput);
    setCurrentInput("");
  };

  const calculate = () => {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) {
      clear();
      return;
    }

    switch (currentOperator) {
      case "+":
        setCurrentInput((num1 + num2).toString());
        break;
      case "-":
        setCurrentInput((num1 - num2).toString());
        break;
      case "×":
        setCurrentInput((num1 * num2).toString());
        break;
      case "÷":
        if (num2 !== 0) {
          setCurrentInput((num1 / num2).toString());
        } else {
          clear();
          alert("Cannot divide by zero!");
        }
        break;
      default:
        clear();
        return;
    }

    setCurrentOperator(null);
    setPreviousInput(null);
    updateInput();
  };

  return (
    <div className="calculator">
      <div className="input">{currentInput || "0"}</div>
      <div className="buttons">
        <Operators handleOperatorClick={handleOperatorClick} />
        <LeftPanel handleNumberClick={handleNumberClick} />
        <div className="equal" onClick={calculate}>
          =
        </div>
      </div>
    </div>
  );
};

const Operators = ({ handleOperatorClick }) => {
  const operators = ["+", "-", "×", "÷"];

  return (
    <div className="operators">
      {operators.map((operator, index) => (
        <div key={index} onClick={() => handleOperatorClick(operator)}>
          {operator}
        </div>
      ))}
    </div>
  );
};

const LeftPanel = ({ handleNumberClick }) => {
  const rows = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", ".", "C"],
  ];

  return (
    <div className="leftPanel">
      {rows.map((row, rowIndex) => (
        <NumbersRow
          key={rowIndex}
          numbers={row}
          handleNumberClick={handleNumberClick}
        />
      ))}
    </div>
  );
};

const NumbersRow = ({ numbers, handleNumberClick }) => {
  return (
    <div className="numbers">
      {numbers.map((number, index) => (
        <div key={index} onClick={() => handleNumberClick(number)}>
          {number}
        </div>
      ))}
    </div>
  );
};

export default Calculator;
