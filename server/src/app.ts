import express from "express";
const app = express();

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
