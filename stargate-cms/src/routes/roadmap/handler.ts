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
            name: "web dev",
            children: [
              {
                name: "HTML",
                children: [
                  {
                    name: "Introduction to HTML",
                    children: [
                      {
                        name: "What is HTML?",
                      },
                      {
                        name: "HTML Document Structure",
                      },
                      {
                        name: "Elements and Tags",
                      },
                      {
                        name: "Attributes",
                      },
                      {
                        name: "Headings and Paragraphs",
                      },
                      {
                        name: "Lists",
                      },
                      {
                        name: "Links",
                      },
                      {
                        name: "Images",
                      },
                      {
                        name: "Tables",
                      },
                      {
                        name: "Forms",
                      },
                    ],
                  },
                  {
                    name: "Advanced HTML",
                    children: [
                      {
                        name: "Semantic HTML",
                      },
                      {
                        name: "Responsive Web Design",
                      },
                      {
                        name: "Accessibility",
                      },
                      {
                        name: "HTML5",
                      },
                    ],
                  },
                ],
              },
              {
                name: "CSS",
                children: [
                  {
                    name: "Introduction to CSS",
                    children: [
                      {
                        name: "What is CSS?",
                      },
                      {
                        name: "CSS Syntax",
                      },
                      {
                        name: "Selectors",
                      },
                      {
                        name: "Properties",
                      },
                      {
                        name: "Values",
                      },
                      {
                        name: "Units",
                      },
                      {
                        name: "Color",
                      },
                      {
                        name: "Background",
                      },
                      {
                        name: "Text",
                      },
                      {
                        name: "Display",
                      },
                      {
                        name: "Positioning",
                      },
                      {
                        name: "Float",
                      },
                      {
                        name: "Clear",
                      },
                      {
                        name: "Overflow",
                      },
                    ],
                  },
                  {
                    name: "Advanced CSS",
                    children: [
                      {
                        name: "CSS3",
                      },
                      {
                        name: "Responsive Web Design",
                      },
                      {
                        name: "CSS Preprocessors",
                      },
                      {
                        name: "CSS Frameworks",
                      },
                    ],
                  },
                ],
              },
              {
                name: "JavaScript",
                children: [
                  {
                    name: "Introduction to JavaScript",
                    children: [
                      {
                        name: "What is JavaScript?",
                      },
                      {
                        name: "JavaScript Syntax",
                      },
                      {
                        name: "Variables",
                      },
                      {
                        name: "Operators",
                      },
                      {
                        name: "Control Flow",
                      },
                      {
                        name: "Functions",
                      },
                      {
                        name: "Arrays",
                      },
                      {
                        name: "Objects",
                      },
                      {
                        name: "Events",
                      },
                      {
                        name: "Document Object Model (DOM)",
                      },
                    ],
                  },
                  {
                    name: "Advanced JavaScript",
                    children: [
                      {
                        name: "ES6",
                      },
                      {
                        name: "Asynchronous Programming",
                      },
                      {
                        name: "Object-Oriented JavaScript",
                      },
                      {
                        name: "Design Patterns",
                      },
                      {
                        name: "JavaScript Frameworks",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Back-End Development",
                children: [
                  {
                    name: "Introduction to Back-End Development",
                    children: [
                      {
                        name: "What is Back-End Development?",
                      },
                      {
                        name: "Server-Side Programming",
                      },
                      {
                        name: "Databases",
                      },
                      {
                        name: "APIs",
                      },
                      {
                        name: "Deployment",
                      },
                    ],
                  },
                  {
                    name: "Popular Back-End Languages",
                    children: [
                      {
                        name: "Node.js",
                      },
                      {
                        name: "Python",
                      },
                      {
                        name: "Java",
                      },
                      {
                        name: "PHP",
                      },
                    ],
                  },
                  {
                    name: "Popular Back-End Frameworks",
                    children: [
                      {
                        name: "Express.js",
                      },
                      {
                        name: "Flask",
                      },
                      {
                        name: "Django",
                      },
                      {
                        name: "Laravel",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Full-Stack Development",
                children: [
                  {
                    name: "What is Full-Stack Development?",
                  },
                  {
                    name: "Skills Required for Full-Stack Development",
                  },
                  {
                    name: "Popular Full-Stack Frameworks",
                    children: [
                      {
                        name: "MEAN Stack",
                      },
                      {
                        name: "MERN Stack",
                      },
                      {
                        name: "LAMP Stack",
                      },
                    ],
                  },
                ],
              },
              {
                name: "Other Essential Skills",
                children: [
                  {
                    name: "Version Control",
                  },
                  {
                    name: "Git",
                  },
                  {
                    name: "GitHub",
                  },
                  {
                    name: "Testing",
                  },
                  {
                    name: "Debugging",
                  },
                  {
                    name: "Performance Optimization",
                  },
                  {
                    name: "Security",
                  },
                  {
                    name: "Deployment",
                  },
                  {
                    name: "Communication",
                  },
                  {
                    name: "Problem-Solving",
                  },
                ],
              },
            ],
          },
        ];
        
        generate in the form stringified object in an array form
        do not endcode in like md 
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
