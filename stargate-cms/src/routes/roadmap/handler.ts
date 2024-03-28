import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI
const genAI = new GoogleGenerativeAI("AIzaSyBWABGD2ryXU63Y7qHhKEEC1SMaaIlaBIM"); // Replace "YOUR_API_KEY" with your actual API key



const generateRoadmap: RequestHandler<DefaultParams, any, any> = async (
    req,
    res,
    _next
) => {
    try {
        console.log(req.body)
        const { interest } = req.body
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `create a complete roadmap for ${interest} in the form of plantUml code`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return res.json({ text });
    } catch (err) {
        payload.logger.error(err.message);
        payload.logger.error(err.data);
        return res.status(500).send(err.message);
    }
};

export { generateRoadmap };
