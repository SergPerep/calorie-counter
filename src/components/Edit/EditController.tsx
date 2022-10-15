import { useParams } from "react-router-dom";
import { MouseEventHandler, useContext, useState } from "react";
import { RecordsContext } from "../../contexts/RecordsContext";
import { MealType, Record } from "../../types";
import EditView from "./EditView";

// VALIDATORS
import validateNutrientInput from "./validateNutrientInput";
import validateNutrientsSum from "./validateNutrientsSum";
import validatePortionSizeInput from "./validatePortionSizeInput";
import validateAllFields from "./validateAllFields";

// UTILS
import roundNumber from "../../utils/roundNumber";

const Edit = ({
  title = "Edit",
  actionButtonName = "Save changes",
  mealType,
  record,
  onClose,
  actionType,
}: {
  title: string;
  actionButtonName: string;
  record?: Record;
  onClose: Function;
  mealType?: MealType;
  actionType: "updateRecord" | "addRecord";
}) => {
  const { dateStr } = useParams();
  const { updateRecord, addRecord, isUpdating, isAdding } =
    useContext(RecordsContext);
  const isLoading = isUpdating || isAdding;

  // STATES FOR CONTROLLED INPUTS AND SELECTS
  const [nameStr, setNameStr] = useState(record?.ingredient || "");
  const [selectedPerValue, setSelectedPerValue] = useState(record?.unit || "g");
  const [fatsPer100Num, setFatsNum] = useState(record?.fats_per_100);
  const [carbsPer100Num, setCarbsPer100Num] = useState(record?.carbs_per_100);
  const [proteinsPer100Num, setProteinsPer100Num] = useState(
    record?.proteins_per_100
  );
  const [portionSizeNum, setPortionSizeNum] = useState(record?.quantity);

  // VALIDATE FIELDS
  const [isFatsInputValid, fatsHintStr] = validateNutrientInput(fatsPer100Num);
  const [isProteinsInputValid, proteinsHintStr] =
    validateNutrientInput(proteinsPer100Num);
  const [isCarbsInputValid, carbsHintStr] =
    validateNutrientInput(carbsPer100Num);
  const [isPortionSizeInputValid, portionSizeHintStr] =
    validatePortionSizeInput(portionSizeNum);
  const isSaveButtonDisabled = !validateAllFields({
    nameStr,
    isFatsInputValid,
    fatsPer100Num,
    isCarbsInputValid,
    carbsPer100Num,
    isProteinsInputValid,
    proteinsPer100Num,
    isPortionSizeInputValid,
    portionSizeNum,
  });
  const [isErrorDisplay, errorDisplayMessage] = validateNutrientsSum({
    fatsPer100Num,
    carbsPer100Num,
    proteinsPer100Num,
  });

  // HANDLE UPDATE/ADD RECORD
  const handleUpdateRecord = async () => {
    const body = {
      dateStr,
      mealType: record?.meal_type,
      nameStr,
      fatsPer100Num: roundNumber(fatsPer100Num || 0, 2),
      carbsPer100Num: roundNumber(carbsPer100Num || 0, 2),
      proteinsPer100Num: roundNumber(proteinsPer100Num || 0, 2),
      portionSizeNum,
      selectedPerValue,
    };
    const { statusCode } = await updateRecord(record?.id, body);
    if (statusCode === 200) onClose();
  };

  const handleAddRecord = async () => {
    const body = {
      dateStr,
      mealType,
      nameStr,
      fatsPer100Num: roundNumber(fatsPer100Num || 0, 2),
      carbsPer100Num: roundNumber(carbsPer100Num || 0, 2),
      proteinsPer100Num: roundNumber(proteinsPer100Num || 0, 2),
      portionSizeNum,
      selectedPerValue,
    };
    const { statusCode } = await addRecord(body);
    if (statusCode === 201) onClose();
  };

  const handleActionClick: MouseEventHandler = async (e) => {
    try {
      switch (actionType) {
        case "updateRecord":
          await handleUpdateRecord();
          break;
        case "addRecord":
          await handleAddRecord();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EditView
      {...{
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
      }}
    />
  );
};

export default Edit;
