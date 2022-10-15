// UI
import Button from "../BaseUI/Button";
import Icon from "../BaseUI/Icon";
import Input from "../BaseUI/Input";
import Select from "../BaseUI/Select";
import Spinner from "../BaseUI/Spinner";
import { MouseEventHandler } from "react";

import RecordDisplay from "./RecordDisplay";
import calcEnergy from "../../utils/calcEnergy";
import roundNumber from "../../utils/roundNumber";
import { SizeUnit } from "../../types";
import ErrorDisplay from "./ErrorDisplay";

const EditView = ({
  title,
  onClose,
  nameStr,
  setNameStr,
  selectedPerValue,
  setSelectedPerValue,
  fatsPer100Num,
  fatsHintStr,
  isFatsInputValid,
  setFatsNum,
  carbsPer100Num,
  setCarbsPer100Num,
  isCarbsInputValid,
  carbsHintStr,
  proteinsPer100Num,
  setProteinsPer100Num,
  isProteinsInputValid,
  proteinsHintStr,
  portionSizeNum,
  setPortionSizeNum,
  portionSizeHintStr,
  isPortionSizeInputValid,
  handleActionClick,
  isSaveButtonDisabled,
  isLoading,
  actionButtonName,
  isErrorDisplay,
  errorDisplayMessage,
}: {
  title: string;
  onClose: Function;
  nameStr: string | undefined;
  setNameStr: Function;
  selectedPerValue: SizeUnit;
  setSelectedPerValue: Function;
  fatsPer100Num: number | undefined;
  fatsHintStr: string | undefined;
  isFatsInputValid: boolean;
  setFatsNum: Function;
  carbsPer100Num: number | undefined;
  setCarbsPer100Num: Function;
  isCarbsInputValid: boolean;
  carbsHintStr: string | undefined;
  proteinsPer100Num: number | undefined;
  setProteinsPer100Num: Function;
  isProteinsInputValid: boolean;
  proteinsHintStr: string | undefined;
  portionSizeNum: number | undefined;
  setPortionSizeNum: Function;
  portionSizeHintStr: string | undefined;
  isPortionSizeInputValid: boolean;
  handleActionClick: MouseEventHandler;
  isSaveButtonDisabled: boolean;
  isLoading: boolean;
  actionButtonName: string | undefined;
  isErrorDisplay: boolean;
  errorDisplayMessage: string;
}) => {
  return (
    <div className="overlay edit-overlay">
      <div className="edit">
        <div className="edit-header">
          <div className="edit-title">{title}</div>
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
            isValid={isFatsInputValid}
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
            isValid={isCarbsInputValid}
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
            isValid={isProteinsInputValid}
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
          {isErrorDisplay && <ErrorDisplay>{errorDisplayMessage}</ErrorDisplay>}

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
            isValid={isPortionSizeInputValid}
          />
          <RecordDisplay
            {...{
              nameStr,
              selectedPerValue,
              fatsPer100Num,
              carbsPer100Num,
              proteinsPer100Num,
              portionSizeNum,
            }}
          />
        </div>
        <div className="edit-footer">
          <Button onClick={handleActionClick} isDisabled={isSaveButtonDisabled}>
            {!isLoading ? actionButtonName : <Spinner />}
          </Button>
          <Button type="secondary" onClick={onClose as MouseEventHandler}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditView;
