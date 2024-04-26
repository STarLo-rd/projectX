import express from "express";
import { accessControl } from "../middleware";
import { dreamList } from "./handler";

const dreamAnalysisRouter = express.Router();

// profileRouter.use(accessControl);

dreamAnalysisRouter.post("/tasks", dreamList)

export default dreamAnalysisRouter
