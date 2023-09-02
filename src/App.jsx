import { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import { btnValues } from "./utils/btnValues";
import Button from "./components/Button";

function App() {
  const [currentNum, setCurrentNum] = useState("0");
  const [prevNum, setPrevNum] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [divisionZero, setDivisionZero] = useState(false);

  console.log(`numero atual ${currentNum} ${typeof currentNum}`);
  console.log(`numero anterior ${prevNum} ${typeof prevNum}`);
  console.log(`resultado ${result} ${typeof result}`);
  console.log(`operador ${operator}`);

  const handleAddNumber = (ele) => {
    console.log("handleAddNumber executado");
    setCurrentNum((prev) => {
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

      if (!currentNum && result) {
        setPrevNum("");
        setOperator("");
        setResult("");
        return ele;
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

  const handleDeleteNumber = (ele) => {
    if (ele !== "⌫") return;
    console.log("handleDeleteNumber executado");
    setCurrentNum((prev) => {
      if (divisionZero) {
        setResult("");
        setCurrentNum("0");
        setPrevNum("");
        setOperator("");
      }

      if (currentNum === "0") {
        // Não faça nada se currentNum já for "0"
        return prev;
      }

      const deleteNumber = prev.slice(0, -1);

      if (result) {
        console.log("aqui foi executado");
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
    if (!prevNum) {
      setPrevNum(currentNum);
      setCurrentNum("0");
      return;
    }
    if (currentNum !== "0") {
      setCurrentNum((prev) => (parseFloat(prev) / 100).toString());
    }
  };

  const handleClear = () => {
    console.log("handleClear executado");
    setPrevNum("");
    setCurrentNum("0");
    setResult("");
    setOperator("");
    setDivisionZero(false);
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
      console.log("aqui foi exec bla");
      setCurrentNum(currentNum);
      setOperator(ele);
      // setPrevNum(currentNum);
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
          setResult("Não é possível dividir por zero");
          setDivisionZero(true);
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
    <Wrapper>
      <Screen
        prevNum={prevNum}
        operator={operator}
        result={result}
        currentNum={currentNum}
        divisionZero={divisionZero}
      />
      <ButtonBox>
        {btnValues.flat().map((ele, index) => {
          return (
            <Button
              key={index}
              index={index}
              className={`${ele === "=" && "equals"}`}
              ele={ele}
              onClick={
                ele === "⌫"
                  ? () => handleDeleteNumber(ele)
                  : ele === "C"
                  ? () => handleClear()
                  : ele === "%"
                  ? () => handlePercentage()
                  : ele === "+/-"
                  ? () => handleSign()
                  : ele === "="
                  ? () => evaluateHandler()
                  : ele === "/" || ele === "X" || ele === "-" || ele === "+"
                  ? () => handleOperator(ele)
                  : () => handleAddNumber(ele)
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
