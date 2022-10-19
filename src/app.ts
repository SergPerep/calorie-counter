import express from "express";
import logRequests from "./utils/logRequests";
import recordsAPI from "./components/records/recordsAPI";
import handleErrors from "./components/errors/handleErrors";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

const { NODE_ENV = "development" } = process.env;

app.use(cors());
app.use(logRequests);
app.use(express.json());

// Static content when production
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => res.status(200).json({ message: "jest" }));

// ROUTES
app.use("/records", recordsAPI);

// Return index.html with first request
app.get("/*", (req, res) => {
  if (NODE_ENV === "production")
    res.sendFile(path.join(__dirname, "../client/build/index.html"), (err) => {
      if (err) res.status(500).send(err);
    });
  res.status(200).json({ message: "development build" });
});

app.use(handleErrors);

export default app;
