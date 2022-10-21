import genRandomInt from "../../utils/genRandomInt";
import getRandomArrItem from "../../utils/getRandomArrItem";
import { randText, randNumber } from "@ngneat/falso";
interface Body {
  [key: string]: any;
}

const typeCollection = ["string", "number", "boolean", "object"];

const genWrongTypeValue = (value: any) => {
  const expectedType = typeof value;
  const wrongTypeCollection = typeCollection.filter(
    (type) => type !== expectedType
  );
  const wrongType = getRandomArrItem(wrongTypeCollection);
  let wrongValue;
  switch (wrongType) {
    case "string":
      wrongValue = randText();
      break;
    case "number":
      wrongValue = randNumber();
      break;
    case "boolean":
      wrongValue = !genRandomInt(0, 1);
      break;
    case "object":
      wrongValue = { test: randText() };
  }
  return { wrongValue, expectedType, wrongType };
};

const genWrongTypeCases = (body: Body) => {
  const fieldNames = Object.keys(body);
  const finalCases = fieldNames.map((fieldName) => {
    const { wrongValue, expectedType, wrongType } = genWrongTypeValue(
      body[fieldName]
    );
    const updatedBody = { ...body };
    updatedBody[fieldName] = wrongValue;
    return {
      body: updatedBody,
      fieldName,
      expectedType,
      wrongType,
    };
  });
  return finalCases;
};

export default genWrongTypeCases;
