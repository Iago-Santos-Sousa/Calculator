import { formatNumberWithCommas } from "../utils/formatNumbers";

function Screen({ prevNum, operator, result, currentNum, divisionZero }) {
  return (
    <div className="screen">
      <div className="previous">
        {prevNum === "" ? "" : formatNumberWithCommas(prevNum)} {operator}{" "}
        {result !== ""
          ? `${currentNum && formatNumberWithCommas(currentNum) + " ="}`
          : ""}
      </div>
      <div className="current">
        {result === "" ? (
          <span>
            {currentNum === ""
              ? formatNumberWithCommas(prevNum)
              : formatNumberWithCommas(currentNum)}
          </span>
        ) : (
          <span className={`${divisionZero && "divisionZero"}`}>
            {formatNumberWithCommas(result)}
          </span>
        )}
      </div>
    </div>
  );
}

export default Screen;
