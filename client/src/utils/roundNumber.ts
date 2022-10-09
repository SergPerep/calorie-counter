const roundNumber = (inputNum: number, decimalNum = 1) => {
  const multiplier = 10 * decimalNum || 1;
  return Math.round(inputNum * multiplier) / multiplier;
};

export default roundNumber;
