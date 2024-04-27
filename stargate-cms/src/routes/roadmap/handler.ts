import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { deductCredits } from "../../utils";
import { GEMINI_API_KEY } from "../../config";

// Initialize GoogleGenerativeAI

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getRoadmap = async (interest) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
  At first check that ${interest} is meaningful, if not just returns null
  Please generate a comprehensive, original roadmap outlining the steps needed to advance ${interest} within the ${interest} domain. The roadmap should focus specifically on the essential concepts, techniques, and best practices related to ${interest}, without reproducing or reciting any existing copyrighted material.
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
          "description": "Description of the subsection in approximately 3 lines.",
          "isCompleted": false
        },
        {
          "name": "Subsection 1.2",
          "description": "Description of the subsection in approximately 3 lines.",
          "isCompleted": false
        },
        {
          "name": "Subsection 1.3",
          "description": "Description of the subsection in approximately 3 lines.",
          "isCompleted": false
        }[add more children if you have more content]
      ]
    },
    {
      "name": "Section 2",
      "description": "Description of the second section in approximately 3 lines.",
      "isCompleted": false
      "children": [
           {
          "name": "Subsection 2.1",
          "description": "Description of the subsection in approximately 3 lines.",
          "isCompleted": false
        },
        {
          "name": "Subsection 2.2",
          "description": "Description of the subsection in approximately 3 lines.",
          "isCompleted": false
        }[add more children if you have more content]
      ]
    }
  ][add more sections if you have more content]
}
]

Ensure that the roadmap is comprehensive, covering all essential aspects of ${interest}, and maintain a logical flow and hierarchy. Limit each description to approximately 3 lines only to keep the roadmap concise and focused.

For example, if the interest is "blockchain security," the roadmap should focus on security concerns, vulnerabilities, best practices, and techniques specific to blockchain technology, rather than providing a general introduction to blockchain.

Please generate the roadmap as a stringified JSON object within an array format, without any additional text or Markdown encoding.
`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};

const generateRoadmap: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const deductionSuccessful = await deductCredits(req.user.id, 1); // Deduct 1 credit

    if (!deductionSuccessful) { 
      return res
        .status(402)
        .json({ error: "Insufficient credits to perform this operation" });
    }
    const { interest } = req.body;
    const roadmap = await getRoadmap(interest);
    return res.json({ roadmap });
  } catch (err) {
    payload.logger.error(err.message);
    payload.logger.error(err.data);
    return res.status(500).send(err.message);
  }
};

export { generateRoadmap };
