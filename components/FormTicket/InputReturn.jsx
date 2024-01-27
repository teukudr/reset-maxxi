const InputReturn = ({ value, handleChange }) => {
  return (
    <input
      value={value}
      onChange={handleChange}
      type="text"
      placeholder="From"
      className="border-b-2 border-b-bnr-secondary outline-none py-3 w-full"
    />
  );
};

export default InputReturn;
