import request from "supertest";
import app from "../../app";
import connectToDB, { mongod } from "../../db";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  // Connect to DB
  await connectToDB();
});

afterAll(async () => {
  // Disconnect from DB
  if (mongod) await mongod.stop();
});

const testForStatusCode = (
  uri: string,
  method: "get" | "post" | "put" | "delete",
  code: number,
  body?: object
) => {
  it(`Status code is ${code}`, async () => {
    const response = await request(app)[method](uri).send(body);
    expect(response.statusCode).toBe(code);
  });
};

const getRandomItem = (items: unknown[]) =>
  items[Math.floor(Math.random() * items.length)];

// GET RECORDS FOR A DATE
describe("GET /", () => {
  const method = "get";
  const uri = "/records?date=2022-10-10";
  testForStatusCode(uri, method, 200);
});

// CREATE A RECORD
describe("POST /", () => {
  const uri = "/records";

  it("OK", async () => {
    const body = {};
    const response = await request(app).post(uri).send(body);
  });
});
