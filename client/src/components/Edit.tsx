import Button from "./BaseUI/Button";
import Icon from "./BaseUI/Icon";
import Input from "./BaseUI/Input";
import Select from "./BaseUI/Select";
import { useState } from "react";

const Edit = () => {
  const [nameStr, setNameStr] = useState("");
  const [selectedPer, setSelectedPer] = useState("");
  const [fatsNum, setFatsNum] = useState("");
  const [carbsNum, setCarbsNum] = useState("");
  const [proteinsNum, setProteinsNum] = useState("");
  const [portionSizeNum, setPortionSizeNum] = useState("");
  return (
    <div className="overlay edit-overlay">
      <div className="edit">
        <div className="edit-header">
          <div className="edit-title">Edit</div>
          <Icon name="close" />
        </div>
        <div className="edit-body">
          <h3>Nutrition</h3>
          <Input
            label="Name"
            id="record-name-field"
            className="name-field"
            placeholder="e.g. White rice"
          />
          <Select
            label="Per"
            id="per-field"
            className="per-field"
            options={[
              { name: "100 g", value: "g" },
              { name: "100 ml", value: "ml" },
            ]}
          />
          <Input
            label="Fats"
            id="fats-field"
            className="nutrition-field"
            type="number"
            placeholder="e.g. 12.3"
            suffix="g"
          />
          <Input
            label="Carbs"
            id="carbs-field"
            className="nutrition-field"
            type="number"
            placeholder="e.g. 23.1"
            suffix="g"
          />
          <Input
            label="Proteins"
            id="proteins-field"
            className="nutrition-field"
            type="number"
            placeholder="e.g. 7.29"
            suffix="g"
          />
          <Input
            label="Energy"
            id="energy-field"
            className="nutrition-field"
            type="number"
            placeholder="300"
            suffix="kcal"
          />
          <h3>Portion size</h3>
          <Input
            label="Portion size"
            id="portion-size-field"
            className="portion-size-field"
            placeholder="e.g. 300"
            hideLabel={true}
            type="number"
            suffix="g"
          />
        </div>
        <div className="edit-footer">
          <Button>Save changes</Button>
          <Button type="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
