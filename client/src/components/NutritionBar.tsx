const NutritionBar = ({
  fatsNum = 0,
  carbsNum = 0,
  proteinsNum = 0,
}: {
  fatsNum: number | undefined;
  carbsNum: number | undefined;
  proteinsNum: number | undefined;
}) => {
  const sumNum = fatsNum + carbsNum + proteinsNum;
  const fatsPercentNum = (fatsNum * 100) / sumNum;
  const carbsPercentNum = (carbsNum * 100) / sumNum;
  const proteinsPercentNum = (proteinsNum * 100) / sumNum;
  return (
    <div className="nutrition-bar">
      <div
        className="nutrition-bar__fats"
        style={{ width: fatsPercentNum + "%" }}
      ></div>
      <div
        className="nutrition-bar__carbs"
        style={{ width: carbsPercentNum + "%" }}
      ></div>
      <div
        className="nutrition-bar__proteins"
        style={{ width: proteinsPercentNum + "%" }}
      ></div>
    </div>
  );
};

export default NutritionBar;
