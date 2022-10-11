import Edit from "./Edit";
import { useState } from "react";
import { MealType } from "../types";

const AddButtonBtn = ({ mealType }: { mealType: MealType }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsEditOpen(true)} className="add-meal-button">
        + Add food
      </button>
      {isEditOpen && (
        <Edit
          title="Add food"
          actionButtonName="Add food"
          mealType={mealType}
          actionType="addRecord"
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default AddButtonBtn;
