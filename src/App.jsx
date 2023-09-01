import { useState } from "react";
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const signs = ["%", "/", "X", "-", "+"];

function App() {
  const [currentNum, setCurrent] = useState("");
  const [prevNum, setPrev] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  console.log(prevNum);
  console.log(currentNum);
  console.log(`resultado ${result}`);

  const handleAddNumber = (ele) => {
    if (result) {
      setPrev("");
      setCurrent("");
      setResult("");
      setOperator("");
    }
    setCurrent((prev) => prev + ele);
  };

  const handleSign = () => {
    if (currentNum > 0) {
      setCurrent((prev) => `-${prev}`);
    }
  };

  const handleClear = () => {
    setPrev("");
    setCurrent("");
    setResult("");
    setOperator("");
  };

  const handleOperator = (ele) => {
    if (result) {
      setPrev(result);
      setResult("");
    }
    setOperator(ele);
    setPrev(currentNum);
    setCurrent("");
  };

  const evaluateHandler = () => {
    let resultValue = null;
    switch (operator) {
      case "/":
        resultValue = parseFloat(prevNum) / parseFloat(currentNum);
        setResult(resultValue.toString());
      case "X":
        resultValue = parseFloat(prevNum) * parseFloat(currentNum);
        setResult(resultValue.toString());
      case "-":
        resultValue = parseFloat(prevNum) - parseFloat(currentNum);
        setResult(resultValue.toString());
      case "+":
        resultValue = parseFloat(prevNum) + parseFloat(currentNum);
        setResult(resultValue.toString());
      default:
        return;
    }
  };

  return (
    <div>
      <p>
        {prevNum === "" ? "" : prevNum} {operator}{" "}
        {result !== "" ? `${currentNum} =` : ""}
      </p>
      {result === "" ? (
        <p>{currentNum === "" ? prevNum : currentNum}</p>
      ) : (
        <p>{result}</p>
      )}
      <button onClick={() => handleClear()}>AC</button>
      <button onClick={() => handleSign()}>+/-</button>

      {numbers.map((ele, index) => (
        <button key={index} onClick={() => handleAddNumber(ele)}>
          {ele}
        </button>
      ))}

      {signs.map((ele, index) => (
        <button key={index} onClick={() => handleOperator(ele)}>
          {ele}
        </button>
      ))}

      <button onClick={() => evaluateHandler()}>=</button>
    </div>
  );
}

export default App;
