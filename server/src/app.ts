import express from "express";
import logRequests from "./utils/logRequests";
import recordsRouter from "./components/records";
const app = express();

app.use(logRequests);

app.use("/records", recordsRouter);
export default app;
