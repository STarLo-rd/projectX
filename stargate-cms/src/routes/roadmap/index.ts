import express from "express";
import { accessControl } from "../middleware";
import { generateRoadmap } from "./handler";

const roadmapRouter = express.Router();

// roadmapRouter.use(accessControl);

roadmapRouter.post("/generate", generateRoadmap)

export default roadmapRouter