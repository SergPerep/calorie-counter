import express from "express";
import logRequests from "./utils/logRequests";
import recordsAPI from "./components/records/recordsAPI";
import handleErrors from "./components/errors/handleErrors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(logRequests);
app.use(express.json());

app.use("/records", recordsAPI);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Calorie Counter API</h1>");
  res.end();
});

app.get("/hello", (req, res) => {
  res.send("Hello");
});

// Catch call
app.get("*", (req, res) => {
  // Feedback to client
  res.json("404. Sorry couldn't find the page.");
});

app.use(handleErrors);

export default app;
