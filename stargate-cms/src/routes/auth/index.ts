import express from "express";
import { accessControl } from "../middleware";
import { SSOLogin } from "./handler";

const authRouter = express.Router();


authRouter.post("/sso", SSOLogin)

export default authRouter
