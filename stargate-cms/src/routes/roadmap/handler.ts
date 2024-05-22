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
        generate  in the form of following (name ,description, children: [name, description ,children : [...]])
        sample -
        [
          {
            "name": "Your interest (eg: web development)", //title most important
            "description": "Web development involves creating web applications and websites for the internet or an intranet. It encompasses various technologies and skills to build and maintain functional and visually appealing online platforms.",
            "children": [
              {
                "name": "HTML",
                "description": "HTML (Hypertext Markup Language) is the standard markup language for creating web pages and web applications. It provides the structure and content of web pages by using a system of tags and attributes.",
                "children": [
                  {
                    "name": "Introduction to HTML",
                    "description": "An introductory section covering the basics of HTML, including its purpose, syntax, and fundamental elements.",
                    "children": [
                      {
                        "name": "What is HTML?",
                        "description": "An overview of HTML, explaining its role in web development and its key features."
                      },
                      {
                        "name": "HTML Document Structure",
                        "description": "The basic structure of an HTML document, including the essential elements required for a valid webpage."
                      },
                      {
                        "name": "Elements and Tags",
                        "description": "Explanation of HTML elements and tags, which are used to define the structure and content of a webpage."
                      },
                      {
                        "name": "Attributes",
                        "description": "Attributes provide additional information about HTML elements and are used to modify their behavior or appearance."
                      },
                      {
                        "name": "Headings and Paragraphs",
                        "description": "Usage of heading and paragraph tags to organize and format text content on a webpage."
                      },
                      {
                        "name": "Lists",
                        "description": "Different types of lists in HTML, such as ordered lists, unordered lists, and definition lists."
                      },
                      {
                        "name": "Links",
                        "description": "Creating hyperlinks to navigate between different web pages or resources."
                      },
                      {
                        "name": "Images",
                        "description": "Incorporating images into HTML documents using the <img> tag."
                      },
                      {
                        "name": "Tables",
                        "description": "Using HTML tables to display data in rows and columns."
                      },
                      {
                        "name": "Forms",
                        "description": "Creating interactive forms for user input using HTML form elements."
                      }
                    ]
                  },
                  {
                    "name": "Advanced HTML",
                    "description": "Advanced topics in HTML focusing on modern best practices and advanced features.",
                    "children": [
                      {
                        "name": "Semantic HTML",
                        "description": "Using semantic HTML elements to improve the structure and accessibility of web content."
                      },
                      {
                        "name": "Responsive Web Design",
                        "description": "Designing web pages that adapt to various screen sizes and devices using HTML and CSS."
                      },
                      {
                        "name": "Accessibility",
                        "description": "Ensuring web content is accessible to users with disabilities by following HTML accessibility guidelines."
                      },
                      {
                        "name": "HTML5",
                        "description": "Exploring new features and enhancements introduced in the latest version of HTML, HTML5."
                      }
                    ]
                  }
                ]
              },
              {
                "name": "CSS",
                "description": "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. It controls the layout, design, and appearance of web pages.",
                "children": [
                  {
                    "name": "Introduction to CSS",
                    "description": "Basic concepts and syntax of CSS for styling web pages.",
                    "children": [
                      {
                        "name": "What is CSS?",
                        "description": "An overview of CSS and its role in styling web pages."
                      },
                      {
                        "name": "CSS Syntax",
                        "description": "The syntax rules and structure of CSS rulesets."
                      },
                      {
                        "name": "Selectors",
                        "description": "Selectors are patterns used to select HTML elements to apply styles."
                      },
                      {
                        "name": "Properties",
                        "description": "CSS properties determine the visual aspects of selected elements."
                      },
                      {
                        "name": "Values",
                        "description": "Values are assigned to CSS properties to define specific styles."
                      },
                      {
                        "name": "Units",
                        "description": "Different units of measurement used in CSS for specifying lengths, sizes, and other values."
                      },
                      {
                        "name": "Color",
                        "description": "Methods of defining colors in CSS, including named colors, hexadecimal, RGB, and HSL values."
                      },
                      {
                        "name": "Background",
                        "description": "Styling the background of elements using CSS background properties."
                      },
                      {
                        "name": "Text",
                        "description": "Applying styles to text content, such as font properties, text alignment, and text decoration."
                      },
                      {
                        "name": "Display",
                        "description": "Controlling the layout and display behavior of elements using CSS display properties."
                      },
                      {
                        "name": "Positioning",
                        "description": "Techniques for positioning elements on a web page using CSS positioning properties."
                      },
                      {
                        "name": "Float",
                        "description": "Using the CSS float property to position elements horizontally."
                      },
                      {
                        "name": "Clear",
                        "description": "Preventing elements from wrapping around floated elements using the clear property."
                      },
                      {
                        "name": "Overflow",
                        "description": "Managing content overflow within containers using CSS overflow properties."
                      }
                    ]
                  },
                  {
                    "name": "Advanced CSS",
                    "description": "Advanced techniques and concepts in CSS for building complex layouts and designs.",
                    "children": [
                      {
                        "name": "CSS3",
                        "description": "Exploring new features and enhancements introduced in the latest version of CSS, CSS3."
                      },
                      {
                        "name": "Responsive Web Design",
                        "description": "Designing web pages that adapt to various screen sizes and devices using CSS media queries and flexible layouts."
                      },
                      {
                        "name": "CSS Preprocessors",
                        "description": "Tools like Sass and LESS that extend the CSS language with features like variables, mixins, and functions."
                      },
                      {
                        "name": "CSS Frameworks",
                        "description": "Pre-built libraries of CSS styles and components for accelerating web development and ensuring consistency."
                      }
                    ]
                  }
                ]
              },
              {
                "name": "JavaScript",
                "description": "JavaScript is a high-level programming language primarily used for adding interactivity and dynamic behavior to web pages. It is essential for client-side scripting and building web applications.",
                "children": [
                  {
                    "name": "Introduction to JavaScript",
                    "description": "Basic concepts and syntax of JavaScript for adding interactivity to web pages.",
                    "children": [
                      {
                        "name": "What is JavaScript?",
                        "description": "An overview of JavaScript and its role in web development, including its capabilities and use cases."
                      },
                      {
                        "name": "JavaScript Syntax",
                        "description": "The syntax rules and structure of JavaScript code."
                      },
                      {
                        "name": "Variables",
                        "description": "Declaring and using variables to store data in JavaScript."
                      },
                      {
                        "name": "Operators",
                        "description": "Operators are used for performing operations on variables and values in JavaScript."
                      },
                      {
                        "name": "Control Flow",
                        "description": "Control flow statements like if-else, switch, and loops for controlling the execution flow of JavaScript code."
                      },
                      {
                        "name": "Functions",
                        "description": "Defining reusable blocks of code as functions in JavaScript."
                      },
                      {
                        "name": "Arrays",
                        "description": "Storing and manipulating collections of data using JavaScript arrays."
                      },
                      {
                        "name": "Objects",
                        "description": "Objects are used to represent complex data structures in JavaScript."
                      },
                      {
                        "name": "Events",
                        "description": "Handling user interactions and browser events using JavaScript event handling."
                      },
                      {
                        "name": "Document Object Model (DOM)",
                        "description": "The DOM represents the structure of HTML documents as a tree of objects that JavaScript can manipulate."
                      }
                    ]
                  },
                  {
                    "name": "Advanced JavaScript",
                    "description": "Advanced topics and techniques in JavaScript for building complex web applications.",
                    "children": [
                      {
                        "name": "ES6",
                        "description": "Exploring new features and enhancements introduced in ECMAScript 6 (ES6), the latest version of JavaScript."
                      },
                      {
                        "name": "Asynchronous Programming",
                        "description": "Techniques for handling asynchronous operations in JavaScript using callbacks, promises, and async/await."
                      },
                      {
                        "name": "Object-Oriented JavaScript",
                        "description": "Applying object-oriented programming principles to JavaScript for building modular and maintainable code."
                      },
                      {
                        "name": "Design Patterns",
                        "description": "Common design patterns and best practices for structuring and organizing JavaScript code."
                      },
                      {
                        "name": "JavaScript Frameworks",
                        "description": "Popular JavaScript libraries and frameworks like React, Angular, and Vue for building scalable and maintainable web applications."
                      }
                    ]
                  }
                ]
              },
              {
                "name": "Back-End Development",
                "description": "Back-end development involves building and maintaining the server-side of web applications, including databases, server logic, and APIs.",
                "children": [
                  {
                    "name": "Introduction to Back-End Development",
                    "description": "An overview of back-end development, including its role in web development and common technologies used."
                  },
                  {
                    "name": "Popular Back-End Languages",
                    "description": "Overview of popular programming languages used for back-end development, such as Node.js, Python, Java, and PHP."
                  },
                  {
                    "name": "Popular Back-End Frameworks",
                    "description": "Overview of popular back-end frameworks and libraries used for building web applications, such as Express.js, Flask, Django, and Laravel."
                  }
                ]
              },
              {
                "name": "Full-Stack Development",
                "description": "Full-stack development involves working on both the client-side and server-side of web applications, covering both front-end and back-end technologies.",
                "children": [
                  {
                    "name": "What is Full-Stack Development?",
                    "description": "An explanation of full-stack development and the skills required to work on both the front-end and back-end of web applications."
                  },
                  {
                    "name": "Skills Required for Full-Stack Development",
                    "description": "Overview of the skills and knowledge required to become a full-stack developer, including proficiency in front-end and back-end technologies."
                  },
                  {
                    "name": "Popular Full-Stack Frameworks",
                    "description": "Overview of popular full-stack frameworks and stacks used for building web applications, such as MEAN Stack, MERN Stack, and LAMP Stack."
                  }
                ]
              },
              {
                "name": "Other Essential Skills",
                "description": "Additional skills and competencies essential for successful web development projects.",
                "children": [
                  {
                    "name": "Version Control",
                    "description": "Using version control systems like Git to track and manage changes to code repositories."
                  },
                  {
                    "name": "Git",
                    "description": "A distributed version control system used for tracking changes in source code during software development."
                  },
                  {
                    "name": "GitHub",
                    "description": "A web-based platform for hosting and collaborating on Git repositories, commonly used in open-source projects and software development teams."
                  },
                  {
                    "name": "Testing",
                    "description": "Testing methodologies and techniques for ensuring the quality and reliability of web applications."
                  },
                  {
                    "name": "Debugging",
                    "description": "Identifying and fixing errors and issues in software code during development and testing phases."
                  },
                  {
                    "name": "Performance Optimization",
                    "description": "Techniques for improving the performance and efficiency of web applications, such as code optimization and resource caching."
                  },
                  {
                    "name": "Security",
                    "description": "Implementing security measures and best practices to protect web applications from vulnerabilities and cyber threats."
                  },
                  {
                    "name": "Deployment",
                    "description": "Deploying web applications to production servers or cloud platforms for public access and use."
                  },
                  {
                    "name": "Communication",
                    "description": "Effective communication skills for collaborating with team members, clients, and stakeholders throughout the web development process."
                  },
                  {
                    "name": "Problem-Solving",
                    "description": "Critical thinking and problem-solving skills for identifying and resolving issues encountered during web development projects."
                  }
                ]
              }
            ]
          }
        ]
        
        
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
