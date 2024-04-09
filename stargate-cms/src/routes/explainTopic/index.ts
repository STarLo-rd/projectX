import express from "express";
import { accessControl } from "../middleware";
import { explainTopic, geneateQuestions, summarizeText } from "./handler";

const explainRouter = express.Router();

// roadmapRouter.use(accessControl);

explainRouter.post("/topic", explainTopic)
explainRouter.post("/summarize", summarizeText)
explainRouter.post("/generate-questions", geneateQuestions)


export default explainRouter