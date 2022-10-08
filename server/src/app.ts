import express from "express";
import logRequests from "./utils/logRequests";
import recordsAPI from "./components/records/recordsAPI";
import handleErrors from "./components/errors/handleErrors";
const app = express();

app.use(logRequests);
app.use(express.json());

app.use("/records", recordsAPI);

app.use(handleErrors);
export default app;
