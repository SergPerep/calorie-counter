import request, { Response } from "supertest";
import app from "../../app";
import connectToDB, { mongod } from "../../db";
import sc from "../../utils/statusCodes";
import genEmptyFieldCases from "./genEmptyFieldCases";
import genWrongTypeCases from "./genWrongTypeCases";
interface ExpectedOptions {
  statusCode: number;
  status?: "success" | "fail" | "error";
  message?: string;
  errorMessage?: string;
}

const checkBasics = (response: Response, expectedOptions: ExpectedOptions) => {
  const { statusCode, status, message, errorMessage } = expectedOptions;
  expect(response.statusCode).toBe(statusCode);
  if (status) expect(response.body.status).toBe(status);
  if (message) expect(response.body.message).toBe(message);
  if (errorMessage) expect(response.body.error).toBe(errorMessage);
};

beforeAll(async () => {
  // Connect to DB
  await connectToDB();
});

afterAll(async () => {
  // Disconnect from DB
  if (mongod) await mongod.stop();
});

const getRandomItem = (items: unknown[]) =>
  items[Math.floor(Math.random() * items.length)];

// GET RECORDS FOR A DATE
describe("GET /", () => {
  const method = "get";
  const uri = "/records?date=2022-10-10";
  it("OK", async () => {
    const response = await request(app).get(uri);
    checkBasics(response, { statusCode: sc.OK });
  });
});

// CREATE A RECORD
describe("POST /", () => {
  const uri = "/records";
  const correctBody = {
    date: "2022-10-10",
    meal_type: "breakfast",
    ingredient: "Coocoos",
    fats_per_100: 0.2,
    carbs_per_100: 4.03,
    proteins_per_100: 0.3,
    quantity: 120,
    unit: "ml",
  };

  it("OK", async () => {
    const response = await request(app).post(uri).send(correctBody);
    expect(response.statusCode).toBe(sc.CREATED);
    checkBasics(response, { statusCode: sc.CREATED });
  });

  it("Empty field", () => {
    const emptyFieldCases = genEmptyFieldCases(correctBody);
    emptyFieldCases.forEach(async (testCase) => {
      const response = await request(app).post(uri).send(testCase.body);
      checkBasics(response, {
        statusCode: sc.BAD_REQUEST,
        status: "error",
        errorMessage: `Empty field: ${testCase.emptyField}`,
      });
    });
  });

  it("Wrong type of a field", () => {
    const wrongTypeCases = genWrongTypeCases(correctBody);
    wrongTypeCases.forEach(async (testCase) => {
      const { body, fieldName, expectedType, wrongType } = testCase;
      const response = await request(app).post(uri).send(body);
      checkBasics(response, {
        statusCode: sc.BAD_REQUEST,
        status: "error",
        errorMessage: `Expected ${fieldName} to be a ${expectedType} instead of a ${wrongType}`,
      });
    });
  });
});
