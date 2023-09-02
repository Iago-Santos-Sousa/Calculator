const Button = ({ className, index, ele, onClick }) => {
  return (
    <button
      className={`${className} ${
        (index >= 4 && index <= 6) ||
        (index >= 8 && index <= 10) ||
        (index >= 12 && index <= 14) ||
        (index >= 16 && index <= 18)
          ? "number"
          : ""
      }`}
      onClick={onClick}
    >
      {ele}
    </button>
  );
};

export default Button;
