import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { deductCredits } from "../../utils";
const genAI = new GoogleGenerativeAI("AIzaSyBWABGD2ryXU63Y7qHhKEEC1SMaaIlaBIM"); // Replace "YOUR_API_KEY" with your actual API key

const getDream = async (dream) => {
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
  Design a weekly habit plan aimed at achieving ${dream}. Specify actions to be taken on designated days, along with setting milestone tasks aligned with  aspirations for ${dream}.

  structure would be like JSON structure seems to represent a set of habits with their associated days of the week for execution

  Structure the roadmap as a stringified JSON object within an array format, following this structure:
  [{
    "habits": [
      {
        dream: ${dream}
        habit: "add more relevent habit"
        days: ["fill up the days like sunday to saturday for the habit"]
      },
      {
        habit: "",
        days: []
      },
      {
        habit: "",
        days: []
      },
      {
        habit: "",
        days: []
      }[add more habits if need based on ${dream}]
    ],
    "Task": [
      {
        task: "",
        deadline: "convert month or year into required days" <required number of days to complete this task>
      },
      {
        task: "",
        deadline: ""
      },
      {
        task: "",
        deadline: ""
      },
      {
        task: "",
        deadline: ""
      }[add more if needed based on ${dream}]
    ],
    "note: [
      "",
      "",
      "",
      ""
    ][Guide me on how to achieve my dream of becoming a ${dream}, highlighting the signifance of staying information about industry developments, engaging in community service, networking]
  }
]

  Please generate the result as a stringified JSON object within an array format, without any additional text or Markdown encoding. Ensure the habits are focused on continuous learning, skill development, or any other area of personal or professional improvement.
`;
  const result = await model.generateContent(prompt);
  
  const response = result.response;
  const text = response.text();
  return text;
};
export const dreamList: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    console.log(req?.user)
    const deductionSuccessful = await deductCredits(req.user.id, 1); // Deduct 1 credit
    if (!deductionSuccessful) { 
      return res
        .status(402)
        .json({ error: "Insufficient credits to perform this operation" });
    }
    const { dream } = req.body;
    const result = await getDream(dream);
    console.log(result);
    res.json({ result: result});
  } catch (err) {
    payload.logger.error(err.message);
    payload.logger.error(err.data);
    return res.status(500).send(err.message);
  }
};
