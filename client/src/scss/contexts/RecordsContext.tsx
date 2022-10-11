import { createContext, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Record, MealType, SizeUnit } from "../../types";

type ValuesToShare = {
  records: Record[] | undefined;
  addRecord: Function;
  deleteRecord: Function;
  updateRecord: Function;
};

export const RecordsContext = createContext<ValuesToShare>({
  records: undefined,
  addRecord: () => {},
  updateRecord: () => {},
  deleteRecord: () => {},
});
export const RecordsProvider = (props: PropsWithChildren) => {
  const url = "/.netlify/functions/api/records";
  const { dateStr: currDateStr } = useParams();
  const { data: records, setData: setRecords } = useFetch<Record[]>(
    `${url}?date=${currDateStr}`
  );

  // ADD RECORD
  const addRecord = async ({
    dateStr,
    mealType,
    nameStr,
    fatsPer100Num,
    carbsPer100Num,
    proteinsPer100Num,
    portionSizeNum,
    selectedPerValue,
  }: {
    dateStr: string;
    mealType: MealType;
    nameStr: string;
    fatsPer100Num: number;
    carbsPer100Num: number;
    proteinsPer100Num: number;
    portionSizeNum: number;
    selectedPerValue: SizeUnit;
  }) => {
    try {
      const body = {
        date: dateStr,
        meal_type: mealType,
        ingredient: nameStr,
        fats_per_100: fatsPer100Num,
        carbs_per_100: carbsPer100Num,
        proteins_per_100: proteinsPer100Num,
        quantity: portionSizeNum,
        unit: selectedPerValue,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const statusCode = response.status;
      const data = await response.json();
      if (statusCode === 201) {
        const recordId = data.recordId as string;
        setRecords([{ id: recordId, ...body }, ...(records || [])]);
      }
      return { statusCode, data };
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE A RECORD
  const updateRecord = async (
    id: string,
    {
      dateStr,
      mealType,
      nameStr,
      fatsPer100Num,
      carbsPer100Num,
      proteinsPer100Num,
      portionSizeNum,
      selectedPerValue,
    }: {
      dateStr: string;
      mealType: MealType;
      nameStr: string;
      fatsPer100Num: number;
      carbsPer100Num: number;
      proteinsPer100Num: number;
      portionSizeNum: number;
      selectedPerValue: SizeUnit;
    }
  ) => {
    try {
      const body = {
        date: dateStr,
        meal_type: mealType,
        ingredient: nameStr,
        fats_per_100: fatsPer100Num,
        carbs_per_100: carbsPer100Num,
        proteins_per_100: proteinsPer100Num,
        quantity: portionSizeNum,
        unit: selectedPerValue,
      };
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const statusCode = response.status;
      const data = await response.json();
      if (statusCode === 200) {
        const updatedRecords = records?.map((record) => {
          if (record.id === id) return { id: record.id, ...body };
          return record;
        });
        setRecords(updatedRecords);
      }
      return { statusCode, data };
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE A RECORD
  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        const updatedRecords = records?.filter((record) => record.id !== id);
        setRecords(updatedRecords);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const valuesToShare: ValuesToShare = {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
  };
  return (
    <RecordsContext.Provider value={valuesToShare}>
      {props.children}
    </RecordsContext.Provider>
  );
};
