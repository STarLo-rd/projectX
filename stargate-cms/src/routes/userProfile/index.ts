import express from "express";
import { accessControl } from "../middleware";
import { addUserDetails, predictCarrerPath } from "./handler";

const profileRouter = express.Router();

// profileRouter.use(accessControl);

profileRouter.post("/add-user-details", addUserDetails);
profileRouter.post("/predict-carrerpath", predictCarrerPath);

export default profileRouter;
