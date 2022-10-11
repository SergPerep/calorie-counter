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
  fatsNum = 0,
  carbsNum = 0,
  proteinsNum = 0,
}: {
  fatsNum: number | undefined;
  carbsNum: number | undefined;
  proteinsNum: number | undefined;
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
