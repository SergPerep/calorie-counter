import Button from "./BaseUI/Button";
import Icon from "./BaseUI/Icon";
import Input from "./BaseUI/Input";
import Select from "./BaseUI/Select";
import { MouseEventHandler, useContext, useState } from "react";
import { Record } from "../types";
import calcEnergy from "../utils/calcEnergy";
import roundNumber from "../utils/roundNumber";
import NutritionBar from "./NutritionBar";
import NutritionLegend from "./NutritionLegend";
import { useParams } from "react-router-dom";
import { RecordsContext } from "../scss/contexts/RecordsContext";

const Edit = ({ record, onClose }: { record: Record; onClose: Function }) => {
  const { updateRecord } = useContext(RecordsContext);
  const { dateStr } = useParams();
  const [nameStr, setNameStr] = useState(record.ingredient);
  const [selectedPerValue, setSelectedPerValue] = useState(record.unit);
  const [fatsPer100Num, setFatsNum] = useState(record.fats_per_100);
  const [carbsPer100Num, setCarbsPer100Num] = useState(record.carbs_per_100);
  const [proteinsPer100Num, setProteinsPer100Num] = useState(
    record.proteins_per_100
  );
  const [portionSizeNum, setPortionSizeNum] = useState(record.quantity);
  const totalFatsNum = (fatsPer100Num * (portionSizeNum || 0)) / 100 || 0;
  const totalCarbsNum = (carbsPer100Num * (portionSizeNum || 0)) / 100 || 0;
  const totalProteinsNum =
    (proteinsPer100Num * (portionSizeNum || 0)) / 100 || 0;
  const totalEnergy =
    calcEnergy(totalFatsNum, totalCarbsNum, totalProteinsNum) || 0;

  const checkIfNumberFieldValid = (value: number): [boolean, string] => {
    let isValid = true;
    let hintStr = "";
    if (value < 0) {
      isValid = false;
      hintStr = "Cannot be less than 0";
    }
    return [isValid, hintStr];
  };

  const [areFatsValid, fatsHintStr] = checkIfNumberFieldValid(fatsPer100Num);
  const [areProteinsValid, proteinsHintStr] =
    checkIfNumberFieldValid(proteinsPer100Num);
  const [areCarbsValid, carbsHintStr] = checkIfNumberFieldValid(carbsPer100Num);
  const [isPortionSizeValid, portionSizeHintStr] =
    checkIfNumberFieldValid(portionSizeNum);

  const isSaveButtonDisabled =
    nameStr &&
    fatsPer100Num > 0 &&
    carbsPer100Num > 0 &&
    proteinsPer100Num > 0 &&
    portionSizeNum
      ? false
      : true;

  const handleSaveClick: MouseEventHandler = async (e) => {
    try {
      const body = {
        dateStr,
        mealType: record.meal_type,
        nameStr,
        fatsPer100Num: roundNumber(fatsPer100Num, 2),
        carbsPer100Num: roundNumber(carbsPer100Num, 2),
        proteinsPer100Num: roundNumber(proteinsPer100Num, 2),
        portionSizeNum,
        selectedPerValue,
      };
      const { statusCode } = await updateRecord(record.id, body);
      if (statusCode === 200) onClose(e);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="overlay edit-overlay">
      <div className="edit">
        <div className="edit-header">
          <div className="edit-title">Edit</div>
          <button
            className="edit-header__close-button"
            onClick={onClose as MouseEventHandler}
          >
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
            hintStr={fatsHintStr}
            isValid={areFatsValid}
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
            isValid={areCarbsValid}
            hintStr={carbsHintStr}
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
            isValid={areProteinsValid}
            hintStr={proteinsHintStr}
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
            hintStr={portionSizeHintStr}
            isValid={isPortionSizeValid}
          />
          <div className="edit-food-view">
            <div className="edit-food-view__header">
              <span>{nameStr || "Food name"}</span>
              <span>
                {roundNumber(portionSizeNum, 2) || 0} {selectedPerValue}
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
          <Button onClick={handleSaveClick} isDisabled={isSaveButtonDisabled}>
            Save changes
          </Button>
          <Button type="secondary" onClick={onClose as MouseEventHandler}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
