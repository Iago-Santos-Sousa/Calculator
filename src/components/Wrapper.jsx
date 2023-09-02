const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      <h3>Calculadora</h3>
      {children}
    </div>
  );
};

export default Wrapper;
