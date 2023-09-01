import { useState } from "react";
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const signs = ["%", "/", "X", "-", "+"];

function App() {
  const [currentNum, setCurrentNum] = useState("0");
  const [prevNum, setPrevNum] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  const handleAddNumber = (ele) => {
    setCurrentNum((prev) => {
      const fullValue = prev + ele;
      if (currentNum === "0") {
        return ele;
      }
      if (Number(currentNum) % 1 === 0) {
        return prev + ele;
      }
      if (fullValue.includes(",")) {
        const newValue = fullValue.replace(/,/g, ".");
        return newValue;
      }
      return fullValue;
    });
  };

  const handleDeleteNumber = () => {
    setCurrentNum((prev) => {
      const deleteNumber = prev.slice(0, -1);
      return deleteNumber;
    });
  };

  const handleSign = () => {
    if (Number(currentNum) > 0) {
      setCurrentNum((prev) => `-${prev}`);
    }
  };

  const handleClear = () => {
    setPrevNum("");
    setCurrentNum("");
    setResult("");
    setOperator("");
  };

  const handleOperator = (ele) => {
    if (result) {
      setOperator(ele);
      setCurrentNum("");
      setPrevNum(result);
      setResult("");
      return;
    }
    setOperator(ele);
    setPrevNum(currentNum);
    setCurrentNum("");
  };

  const evaluateHandler = () => {
    let resultValue;
    switch (operator) {
      case "/":
        resultValue = parseFloat(prevNum) / parseFloat(currentNum);
        setResult(resultValue.toString());
        break;
      case "X":
        resultValue = parseFloat(prevNum) * parseFloat(currentNum);
        setResult(resultValue.toString());
        break;
      case "-":
        resultValue = parseFloat(prevNum) - parseFloat(currentNum);
        setResult(resultValue.toString());
        break;
      case "+":
        resultValue = parseFloat(prevNum) + parseFloat(currentNum);
        setResult(resultValue.toString());
        break;

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
      <button onClick={() => handleDeleteNumber()}>DEL</button>

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
