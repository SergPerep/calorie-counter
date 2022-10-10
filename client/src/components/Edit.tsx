import Button from "./BaseUI/Button";
import Icon from "./BaseUI/Icon";
import Input from "./BaseUI/Input";
import Select from "./BaseUI/Select";
import { MouseEventHandler, useState } from "react";
import { Record } from "../types";
import calcEnergy from "../utils/calcEnergy";
import roundNumber from "../utils/roundNumber";
import NutritionBar from "./NutritionBar";
import NutritionLegend from "./NutritionLegend";

const Edit = ({
  record,
  onClose,
}: {
  record: Record;
  onClose: MouseEventHandler;
}) => {
  const [nameStr, setNameStr] = useState(record.ingredient);
  const [selectedPerValue, setSelectedPerValue] = useState(record.unit);
  const [fatsPer100Num, setFatsNum] = useState(record.fats_per_100);
  const [carbsPer100Num, setCarbsPer100Num] = useState(record.carbs_per_100);
  const [proteinsPer100Num, setProteinsPer100Num] = useState(
    record.proteins_per_100
  );
  const [portionSizeNum, setPortionSizeNum] = useState(record.quantity);
  const totalFatsNum = (fatsPer100Num * portionSizeNum) / 100 || 0;
  const totalCarbsNum = (carbsPer100Num * portionSizeNum) / 100 || 0;
  const totalProteinsNum = (proteinsPer100Num * portionSizeNum) / 100 || 0;
  const totalEnergy =
    calcEnergy(totalFatsNum, totalCarbsNum, totalProteinsNum) || 0;
  return (
    <div className="overlay edit-overlay">
      <div className="edit">
        <div className="edit-header">
          <div className="edit-title">Edit</div>
          <button className="edit-header__close-button" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="edit-body">
          <h3>Nutrition</h3>
          <Input
            label="Name"
            id="record-name-field"
            className="name-field"
            placeholder="e.g. White rice"
            value={nameStr}
            onChange={(e) => setNameStr(e.target.value)}
          />
          <Select
            label="Per"
            id="per-field"
            className="per-field"
            options={[
              { name: "100 g", value: "g" },
              { name: "100 ml", value: "ml" },
            ]}
            selectedValue={selectedPerValue}
            onChange={(e) => setSelectedPerValue(e.target.value as "g" | "ml")}
          />
          <Input
            label={`Fats (per 100 ${selectedPerValue})`}
            id="fats-field"
            className="nutrition-field"
            type="number"
            placeholder="e.g. 12.3"
            suffix="g"
            value={fatsPer100Num}
            onChange={(e) => setFatsNum(parseFloat(e.target.value))}
          />
          <Input
            label={`Carbs (per 100 ${selectedPerValue})`}
            id="carbs-field"
            className="nutrition-field"
            type="number"
            placeholder="e.g. 23.1"
            suffix="g"
            value={carbsPer100Num}
            onChange={(e) => setCarbsPer100Num(parseFloat(e.target.value))}
          />
          <Input
            label={`Proteins (per 100 ${selectedPerValue})`}
            id="proteins-field"
            className="nutrition-field"
            type="number"
            placeholder="e.g. 7.29"
            suffix="g"
            value={proteinsPer100Num}
            onChange={(e) => setProteinsPer100Num(parseFloat(e.target.value))}
          />
          <Input
            label={`Energy (per 100 ${selectedPerValue})`}
            id="energy-field"
            className="nutrition-field"
            type="number"
            placeholder="300"
            suffix="kcal"
            value={roundNumber(
              calcEnergy(fatsPer100Num, carbsPer100Num, proteinsPer100Num),
              0
            )}
            onChange={() => {}}
            isDisabled={true}
          />
          <h3>Portion size</h3>
          <Input
            label="Portion size"
            id="portion-size-field"
            className="portion-size-field"
            placeholder="e.g. 300"
            hideLabel={true}
            type="number"
            suffix={selectedPerValue}
            value={portionSizeNum}
            onChange={(e) => setPortionSizeNum(parseFloat(e.target.value))}
          />
          <div className="edit-food-view">
            <div className="edit-food-view__header">
              <span>{nameStr || "Food name"}</span>
              <span>
                {portionSizeNum || 0} {selectedPerValue}
              </span>
            </div>
            <div className="edit-food-view__energy">
              {roundNumber(totalEnergy, 0)} kcal
            </div>
            <NutritionBar
              fatsNum={roundNumber(totalFatsNum, 2)}
              carbsNum={roundNumber(totalCarbsNum, 2)}
              proteinsNum={roundNumber(totalProteinsNum, 2)}
            />
            <NutritionLegend
              fatsNum={roundNumber(totalFatsNum, 2)}
              carbsNum={roundNumber(totalCarbsNum, 2)}
              proteinsNum={roundNumber(totalProteinsNum, 2)}
            />
          </div>
        </div>
        <div className="edit-footer">
          <Button>Save changes</Button>
          <Button type="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
