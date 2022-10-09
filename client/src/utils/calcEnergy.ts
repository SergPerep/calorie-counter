const calcEnergy = (fats: number, carbs: number, proteins: number) => {
  return fats * 9 + carbs * 4 + proteins * 4;
};

export default calcEnergy;
