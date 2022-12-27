const SelectButton = ({ children, selected, onClick }) => {
  const selectButtonStyle = {
    border: selected ? "1px solid #4cd137" : "1px solid #dcdde1",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "#4cd137" : "#dcdde1",
    color: selected ? "white" : "",
    fontWeight: selected ? 900 : 600,
    width: "22%",
  };

  return (
    <span onClick={onClick} style={selectButtonStyle}>
      {children}
    </span>
  );
};

export default SelectButton;
