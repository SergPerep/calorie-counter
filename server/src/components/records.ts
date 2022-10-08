import { Router } from "express";
import app from "../app";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const recordsColl = app.locals.recordsColl;
    const data = await recordsColl.find({}).toArray();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
