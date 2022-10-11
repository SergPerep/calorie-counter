import express from "express";
import logRequests from "./utils/logRequests";
import recordsAPI from "./components/records/recordsAPI";
import handleErrors from "./components/errors/handleErrors";
import cors from "cors";
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(logRequests);
app.use(express.json());

app.use("/records", recordsAPI);

app.use(handleErrors);
export default app;
