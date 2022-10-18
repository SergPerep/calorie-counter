import {
  AppError,
  CannotBeGreaterError,
  CannotBeNegativeError,
  EmptyFieldError,
  WrongTypeError,
} from "../errors/appErrors";
import sc from "../../utils/statusCodes";
import validateDateString from "./validateDateString";

type Record = {
  date: string;
  meal_type: string;
  ingredient: string;
  fats_per_100: number;
  carbs_per_100: number;
  proteins_per_100: number;
  quantity: number;
  unit: string;
};

const validateRecordBody = (record: Record) => {
  const {
    date,
    meal_type,
    ingredient,
    fats_per_100,
    carbs_per_100,
    proteins_per_100,
    quantity,
    unit,
  } = record;

  // DATE
  validateDateString(date);

  // MEAL TYPE
  if (!meal_type) throw new EmptyFieldError({ meal_type });
  if (typeof meal_type !== "string")
    throw new WrongTypeError({ meal_type }, "string");
  const isMealTypeValid = ["breakfast", "lunch", "dinner"].reduce(
    (prevVal, currVal) => currVal === meal_type || prevVal,
    false
  );
  console.log(isMealTypeValid);
  if (!isMealTypeValid)
    throw new AppError(
      `Expected meal_type to be 'breakfast', 'lunch' or 'dinner'. Instead got '${meal_type}' `,
      sc.BAD_REQUEST
    );

  // INGREDIENT
  if (!ingredient) throw new EmptyFieldError({ ingredient });
  if (typeof ingredient !== "string")
    throw new WrongTypeError({ ingredient }, "string");

  // FATS, CARBS && PROTEINS

  const nutrientsObj: { [key: string]: number } = {
    fats_per_100,
    carbs_per_100,
    proteins_per_100,
  };
  const nutrientKeys = Object.keys(nutrientsObj);
  const nutrientsArr = nutrientKeys.map((key) => ({
    fieldName: key,
    fieldValue: nutrientsObj[key],
  }));

  nutrientsArr.forEach((field) => {
    const { fieldName, fieldValue } = field;
    if (fieldValue === null || fieldValue === undefined)
      throw new EmptyFieldError({ [fieldName]: fieldValue });
    if (typeof fieldValue !== "number")
      throw new WrongTypeError({ [fieldName]: fieldValue }, "number");
    if (fieldValue < 0)
      throw new CannotBeNegativeError({ [fieldName]: fieldValue });
    if (fieldValue > 100)
      throw new CannotBeGreaterError({ [fieldName]: fieldValue }, 100);
  });
  if (fats_per_100 + carbs_per_100 + proteins_per_100 > 100)
    throw new AppError(
      "Sum of nutrients (fats, carbs and proteins) cannot be greater than 100",
      sc.BAD_REQUEST,
      "CannotBeGreaterError"
    );

  // QUANTITY
  if (!quantity) throw new EmptyFieldError({ quantity });
  if (typeof quantity !== "number")
    throw new WrongTypeError({ quantity }, "number");
  if (quantity < 0) throw new CannotBeNegativeError({ quantity });
  if (quantity > 1000) throw new CannotBeGreaterError({ quantity }, 1000);

  // UNIT
  if (!unit) throw new EmptyFieldError({ unit });
  if (unit !== "g" && unit !== "ml")
    throw new AppError(
      `Expected 'unit' to be 'g' or 'ml' instead of ${unit}`,
      sc.BAD_REQUEST
    );
};

export default validateRecordBody;
