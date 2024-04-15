import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI
const genAI = new GoogleGenerativeAI("AIzaSyBWABGD2ryXU63Y7qHhKEEC1SMaaIlaBIM");

const generateRoadmap: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    console.log(req.body);
    const { interest } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
Please generate a comprehensive roadmap outlining the steps needed to advance ${interest} within the ${interest} domain. The roadmap should focus specifically on the essential concepts, techniques, and best practices related to ${interest}, rather than providing a general overview of the broader topic.

Every object must contain name, description, isCompleted as false and children if needed

Structure the roadmap as a stringified JSON object within an array format, following this structure:

[
  {
    "name": "${interest}",
    "description": "High-level description of the main topic in approximately 3 lines.",
    "isCompleted": false,
    "children": [
      {
        "name": "Section 1",
        "description": "Description of the first section in approximately 3 lines.",
        "isCompleted": false,
        "children": [
          {
            "name": "Subsection 1.1",
            "description": "Description of the subsection in approximately 3 lines."
            "isCompleted": false
          },
          {
            "name": "Subsection 1.2",
            "description": "Description of the subsection in approximately 3 lines."
            "isCompleted": false
          }...
        ]
      },
      {
        "name": "Section 2",
        "description": "Description of the second section in approximately 3 lines.",
        "isCompleted": false
        "children": [
             {
            "name": "Subsection 2.1",
            "description": "Description of the subsection in approximately 3 lines."
            "isCompleted": false
          },
          {
            "name": "Subsection 2.2",
            "description": "Description of the subsection in approximately 3 lines."
            "isCompleted": false
          }...
        ]
      }
    ]
  }
]

Ensure that the roadmap is comprehensive, covering all essential aspects of ${interest}, and maintain a logical flow and hierarchy. Limit each description to approximately 3 lines to keep the roadmap concise and focused.

For example, if the interest is "blockchain security," the roadmap should focus on security concerns, vulnerabilities, best practices, and techniques specific to blockchain technology, rather than providing a general introduction to blockchain.

Please generate the roadmap as a stringified JSON object within an array format, without any additional text or Markdown encoding.
`;
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
