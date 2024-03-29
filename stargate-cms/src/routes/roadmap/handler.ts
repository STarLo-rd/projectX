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
        const prompt = `create a clean and complete detailed roadmap for ${interest} to be advanced in ${interest} everything you know
        generate  in the form of following
        sample -
        [
          {
            name: "Gaurang Torvekar",
            attributes: {
              keyA: "val A",
              keyB: "val B",
              keyC: "val C",
            },
            children: [
              {
                name: "Avadhoot",
                attributes: {
                  keyA: "val A",
                  keyB: "val B",
                  keyC: "val C",
                },
                children: [
                  {
                    name: "Richard",
                  },
                  {
                    name: "Constantine",
                    children: [
                      {
                        name: "Mia",
                      },
                    ],
                  },
                  {
                    name: "Daniel",
                  },
                ],
              },
              {
                name: "Mia",
              },
              {
                name: "Varun",
                attributes: {
                  keyA: "val A",
                  keyB: "val B",
                  keyC: "val C",
                },
                children: [
                  {
                    name: "Ivo",
                    attributes: {
                      keyA: "val A",
                      keyB: "val B",
                      keyC: "val C",
                    },
                    children: [
                      {
                        name: "Level 2: A",
                        attributes: {
                          keyA: "val A",
                          keyB: "val B",
                          keyC: "val C",
                        },
                        children: [
                          {
                            name: "Level 2: A",
                            attributes: {
                              keyA: "val A",
                              keyB: "val B",
                              keyC: "val C",
                            },
                          },
                          {
                            name: "Level 2: B",
                          },
                        ],
                      },
                      {
                        name: "Level 2: B",
                      },
                    ],
                  },
                  {
                    name: "Vijay",
                  },
                ],
              },
              {
                name: "Mohit",
                children: [
                  {
                    name: "Rohit",
                    attributes: {
                      keyA: "val A",
                      keyB: "val B",
                      keyC: "val C",
                    },
                    children: [
                      {
                        name: "Level 2: A",
                        attributes: {
                          keyA: "val A",
                          keyB: "val B",
                          keyC: "val C",
                        },
                        children: [
                          {
                            name: "Level 2: A",
                            attributes: {
                              keyA: "val A",
                              keyB: "val B",
                              keyC: "val C",
                            },
                          },
                          {
                            name: "Level 2: B",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "Pranav",
                  },
                ],
              },
            ],
          },
        ];
        
        generate in the form stringified object 
        do not endcode in like md 
        `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response);
        const text = await response.text();
        return res.json({ text });
    } catch (err) {
        payload.logger.error(err.message);
        payload.logger.error(err.data);
        return res.status(500).send(err.message);
    }
};

export { generateRoadmap };
