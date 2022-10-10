import { useEffect, useRef, useState } from "react";
import { Record as RecordInterface } from "../types";
import calcEnergy from "../utils/calcEnergy";
import roundNumber from "../utils/roundNumber";
import ContextMenu from "./BaseUI/ContextMenu";
import Icon from "./BaseUI/Icon";
import Edit from "./Edit";
const Record = ({ record }: { record: RecordInterface }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const moreEl = useRef<HTMLDivElement>(null);
  const quantity = record.quantity;
  const totalFatsNum = (record.fats_per_100 / 100) * quantity;
  const totalCarbsNum = (record.carbs_per_100 / 100) * quantity;
  const totalProteinsNum = (record.proteins_per_100 / 100) * quantity;
  const totalEnergyNum = calcEnergy(
    totalFatsNum,
    totalCarbsNum,
    totalProteinsNum
  );

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (moreEl.current && !moreEl.current.contains(target))
        setIsContextMenuOpen(false);
    };
    if (isContextMenuOpen)
      document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isContextMenuOpen]);

  return (
    <div className="record" key={record.id}>
      <div className="record-main">
        <div className="header">
          <span className="title">{record.ingredient}</span>
          <span className="quantity">
            {record.quantity} {record.unit}
          </span>
        </div>
        <div className="footer">
          <div className="nutrition">
            <span className="fats">Fats: {roundNumber(totalFatsNum, 2)} g</span>
            <span className="carbs">
              Carbs: {roundNumber(totalCarbsNum, 2)} g
            </span>
            <span className="proteins">
              Proteins: {roundNumber(totalProteinsNum, 2)} g
            </span>
          </div>
          <span className="energy">{roundNumber(totalEnergyNum, 0)} kcal</span>
        </div>
      </div>
      <div className="more" ref={moreEl}>
        <button
          className="more-button"
          onClick={() => setIsContextMenuOpen(true)}
        >
          <Icon name="more_vert" />
        </button>
        {isContextMenuOpen && (
          <ContextMenu
            menuButtons={[
              {
                title: "Edit",
                onClick: () => {
                  setIsEditOpen(true);
                },
              },
              {
                title: "Delete",
                onClick: () => {},
              },
            ]}
          />
        )}
      </div>
      {isEditOpen && (
        <Edit onClose={() => setIsEditOpen(false)} record={record} />
      )}
    </div>
  );
};

export default Record;
