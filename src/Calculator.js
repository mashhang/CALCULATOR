import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [currentOperator, setCurrentOperator] = useState(null);
  const [previousInput, setPreviousInput] = useState(null);

  const updateInput = () => {
    document.getElementById("input").textContent = currentInput || "0";
  };

  const clear = () => {
    setCurrentInput("");
    setCurrentOperator(null);
    setPreviousInput(null);
    updateInput();
  };

  const handleButtonClick = (value) => {
    if (value === "C") {
      clear();
    } else if (["+", "-", "×", "÷"].includes(value)) {
      handleOperatorClick(value);
    } else {
      handleNumberClick(value);
    }
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
    <div
      className="calculator"
      onClick={(e) => handleButtonClick(e.target.textContent)}
    >
      <div className="input" id="input"></div>
      <div className="buttons">
        <div className="operators">
          <div>+</div>
          <div>-</div>
          <div>×</div>
          <div>÷</div>
        </div>
        <div className="leftPanel">
          <div className="numbers">
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
          <div className="numbers">
            <div>4</div>
            <div>5</div>
            <div>6</div>
          </div>
          <div className="numbers">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          <div className="numbers">
            <div>0</div>
            <div>.</div>
            <div id="clear">C</div>
          </div>
        </div>
        <div className="equal" id="result" onClick={calculate}>
          =
        </div>
      </div>
    </div>
  );
};

export default Calculator;
