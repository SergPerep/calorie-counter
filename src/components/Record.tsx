import { useContext, useState } from "react";
import { RecordsContext } from "../contexts/RecordsContext";
import useClickOutside from "../hooks/useClickOutside";
import { Record as RecordInterface } from "../types";
import calcEnergy from "../utils/calcEnergy";
import roundNumber from "../utils/roundNumber";
import ContextMenu from "./BaseUI/ContextMenu";
import Icon from "./BaseUI/Icon";
import EditController from "./Edit/EditController";
const Record = ({ record }: { record: RecordInterface }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    ref: moreEl,
    isOpen: isContextMenuOpen,
    setIsOpen: setIsContextMenuOpen,
  } = useClickOutside<HTMLDivElement>();
  const { deleteRecord } = useContext(RecordsContext);
  const quantity = record.quantity;
  const totalFatsNum = (record.fats_per_100 / 100) * quantity;
  const totalCarbsNum = (record.carbs_per_100 / 100) * quantity;
  const totalProteinsNum = (record.proteins_per_100 / 100) * quantity;
  const totalEnergyNum = calcEnergy(
    totalFatsNum,
    totalCarbsNum,
    totalProteinsNum
  );

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
                  setIsContextMenuOpen(false);
                },
              },
              {
                title: "Delete",
                onClick: () => {
                  deleteRecord(record.id);
                  setIsContextMenuOpen(false);
                },
              },
            ]}
          />
        )}
      </div>
      {isEditOpen && (
        <EditController
          title="Edit"
          actionButtonName="Save changes"
          record={record}
          onClose={() => setIsEditOpen(false)}
          actionType="updateRecord"
        />
      )}
    </div>
  );
};

export default Record;
