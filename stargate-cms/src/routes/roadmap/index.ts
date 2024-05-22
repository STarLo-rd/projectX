import express from "express";
import { accessControl, checkCredits } from "../middleware";
import { generateRoadmap } from "./handler";

const roadmapRouter = express.Router();

roadmapRouter.use(checkCredits);

roadmapRouter.post("/generate", generateRoadmap)

export default roadmapRouter