import express from "express";
import { accessControl } from "../middleware";
import { explainTopic } from "./handler";

const explainRouter = express.Router();

// roadmapRouter.use(accessControl);

explainRouter.post("/topic", explainTopic)

export default explainRouter