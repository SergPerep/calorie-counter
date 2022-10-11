type Nutrient = number | undefined;

const calcEnergy = (fats: Nutrient, carbs: Nutrient, proteins: Nutrient) => {
  if (fats === undefined || carbs === undefined || proteins === undefined)
    return undefined;
  return fats * 9 + carbs * 4 + proteins * 4;
};

export default calcEnergy;
