import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBWABGD2ryXU63Y7qHhKEEC1SMaaIlaBIM"); // Replace "YOUR_API_KEY" with your actual API key

export const dreamList: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Based on the user dream "${prompt}", generate a list of 3 important tasks or steps that the user should complete daily to make progress towards accomplishing this dream.`
    );
    console.log(result.response.text());
    const taskList = result.response.text();
    res.json({ taskList });
  } catch (err) {
    payload.logger.error(err.message);
    payload.logger.error(err.data);
    return res.status(500).send(err.message);
  }
};
