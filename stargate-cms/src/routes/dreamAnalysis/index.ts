import express from "express";
import { accessControl, checkCredits } from "../middleware";
import { dreamList } from "./handler";

const dreamAnalysisRouter = express.Router();

// profileRouter.use(accessControl);
dreamAnalysisRouter.use(checkCredits);
// dreamAnalysisRouter.use(accessControl);

dreamAnalysisRouter.post("/process-dream", dreamList)

export default dreamAnalysisRouter
