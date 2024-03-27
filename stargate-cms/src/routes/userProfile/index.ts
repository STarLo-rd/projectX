import express from "express";
import { accessControl } from "../middleware";
import { addUserDetails } from "./handler";

const profileRouter = express.Router();

profileRouter.use(accessControl);

profileRouter.post("/add-user-details", addUserDetails)

export default profileRouter