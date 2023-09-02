import { useState } from "react";
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const signs = ["/", "X", "-", "+"];

// Função para formatar um número com separadores de milhar
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function App() {
  const [currentNum, setCurrentNum] = useState("0");
  const [prevNum, setPrevNum] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  console.log(`numero atual ${currentNum} ${typeof currentNum}`);
  console.log(`numero anterior ${prevNum} ${typeof prevNum}`);
  console.log(`resultado ${result} ${typeof result}`);
  console.log(`operador ${operator}`);

  const handleAddNumber = (ele) => {
    console.log("handleAddNumber executado");
    setCurrentNum((prev) => {
      console.log("valor naterior da função handleAddNumber" + " " + prev);
      let newValue = prev === "0" && ele !== "." ? ele : prev + ele;

      if (newValue.startsWith("00")) {
        newValue = newValue.substring(1);
      }

      if (newValue === ".") {
        newValue = "0" + newValue;
      }

      // Verifique se há mais de um ponto decimal e remova extras
      const parts = newValue.split(".");
      if (parts.length > 2) {
        newValue = parts[0] + "." + parts.slice(1).join("");
      }

      if (currentNum && result) {
        setPrevNum("");
        setOperator("");
        setResult("");
        return ele;
      }

      return newValue;
    });
  };

  const handleDeleteNumber = () => {
    console.log("handleDeleteNumber executado");
    setCurrentNum((prev) => {
      if (currentNum === "0") {
        // Não faça nada se currentNum já for "0"
        return prev;
      }
      const deleteNumber = prev.slice(0, -1);
      if (result) {
        setCurrentNum("");
        setPrevNum("");
        setOperator("");
        return;
      }

      return deleteNumber === "" ? "0" : deleteNumber;
    });
  };

  const handleSign = () => {
    console.log("handleSign executado");
    if (parseFloat(currentNum) > 0) {
      setCurrentNum((prev) => `-${prev}`);
      if (currentNum && result) {
        setCurrentNum(`-${result}`);
        setPrevNum("");
        setOperator("");
        setResult("");
      }
    }
  };

  const handlePercentage = () => {
    console.log("handlePercentage executado");
    if (currentNum !== "") {
      setCurrentNum((prev) => (parseFloat(prev) / 100).toString());
    }
  };

  const handleClear = () => {
    console.log("handleClear executado");
    setPrevNum("");
    setCurrentNum("0");
    setResult("");
    setOperator("");
  };

  const handleOperator = (ele) => {
    console.log("handleOperator executado");

    if (result) {
      console.log("Aqui foi exec");
      setOperator(ele);
      setCurrentNum("");
      setPrevNum(result);
      setResult("");
      return;
    }

    if (currentNum === "0") {
      console.log("aqui foi exec");
      setCurrentNum("0");
      setOperator(ele);
      setPrevNum(currentNum);
    } else {
      console.log("aqui foi exec");
      if (operator === ele) {
        return;
      }
      setOperator(ele);
      setPrevNum(currentNum);
      setCurrentNum("");
    }
  };

  const evaluateHandler = () => {
    console.log("evaluateHandler executado");
    if (!prevNum || !currentNum || !operator) return;
    let resultValue;

    switch (operator) {
      case "/":
        if (parseFloat(currentNum) === 0) {
          setResult("Error: Division by zero");
          return;
        }
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
      <p className="preview-values">
        {prevNum === "" ? "" : formatNumberWithCommas(prevNum)} {operator}{" "}
        {result !== ""
          ? `${currentNum && formatNumberWithCommas(currentNum) + " ="}`
          : ""}
      </p>
      {result === "" ? (
        <p style={{ fontSize: "40px", color: "red" }}>
          {currentNum === ""
            ? formatNumberWithCommas(prevNum)
            : formatNumberWithCommas(currentNum)}
        </p>
      ) : (
        <p style={{ fontSize: "40px", color: "red" }}>
          {formatNumberWithCommas(result)}
        </p>
      )}
      <button onClick={() => handlePercentage()}>%</button>
      <button onClick={() => handleClear()}>C</button>
      <button onClick={() => handleDeleteNumber()}>DEL</button>
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
