import express from "express";
import logRequests from "./utils/logRequests";
import recordsAPI from "./components/records/recordsAPI";
import handleErrors from "./components/errors/handleErrors";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

app.use(cors());
app.use(logRequests);
app.use(express.json());

app.use("/records", recordsAPI);

// Return index.html with first request
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"), (err) => {
    if (err) res.status(500).send(err);
  });
});

// Catch call
app.get("*", (req, res) => {
  // Feedback to client
  res.json("404. Sorry couldn't find the page.");
});

app.use(handleErrors);

export default app;
