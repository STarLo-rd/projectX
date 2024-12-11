import express from "express";
import { accessControl, checkCredits } from "../middleware";
import { explainTopic, geneateQuestions, summarizeText } from "./handler";

const explainRouter = express.Router();

explainRouter.use(checkCredits);

// explainRouter.use(accessControl);


explainRouter.post("/topic", explainTopic)
explainRouter.post("/summarize", summarizeText)
explainRouter.post("/generate-questions", geneateQuestions)


export default explainRouter