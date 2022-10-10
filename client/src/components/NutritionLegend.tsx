const NutritionLegendItem = ({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className: string;
}) => {
  return (
    <div className={`nutrition-legend-item ${className}`}>
      <div className="spot"></div>
      <span>
        <span className="title">{title}: </span>
        <span className="value">{value} g</span>
      </span>
    </div>
  );
};

const NutritionLegend = ({
  fatsNum,
  carbsNum,
  proteinsNum,
}: {
  fatsNum: number;
  carbsNum: number;
  proteinsNum: number;
}) => {
  return (
    <div className="nutrition-legend">
      <NutritionLegendItem title="Fats" className="fats" value={fatsNum} />
      <NutritionLegendItem title="Carbs" className="carbs" value={carbsNum} />
      <NutritionLegendItem
        title="Proteins"
        className="proteins"
        value={proteinsNum}
      />
    </div>
  );
};

export default NutritionLegend;
