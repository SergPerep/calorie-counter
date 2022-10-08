import express from "express";
import logRequests from "./utils/logRequests";
const app = express();

app.use(logRequests);

app.get("/", async (req, res, next) => {
  try {
    const recordsColl = app.locals.recordsColl;
    const data = await recordsColl.find({}).toArray();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
export default app;
