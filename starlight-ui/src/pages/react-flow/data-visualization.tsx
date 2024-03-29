import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { getAuthorizationHeader } from "../../utils/utils";
import AxiosInstance from "../../services/axios-instance";

const myTreeData = [
  {
    name: "Frontend Development",
    children: [
      {
        name: "HTML",
        attributes: {
          description:
            "The foundation of web pages, responsible for content structure.",
        },
      },
      {
        name: "CSS",
        attributes: {
          description: "Controls the appearance and styling of web pages.",
        },
      },
      {
        name: "JavaScript",
        attributes: {
          description: "Adds interactivity and dynamic behavior to web pages.",
        },
      },
      {
        name: "React",
        attributes: {
          description: "A JavaScript library for building user interfaces.",
        },
      },
      {
        name: "Angular",
        attributes: {
          description:
            "A JavaScript framework for building complex web applications.",
        },
      },
      {
        name: "Vue",
        attributes: {
          description:
            "A JavaScript framework for building web applications with a focus on simplicity.",
        },
      },
    ],
  },
  {
    name: "Backend Development",
    children: [
      {
        name: "Node.js",
        attributes: {
          description:
            "A JavaScript runtime environment for building scalable server-side applications.",
        },
      },
      {
        name: "Express.js",
        attributes: {
          description:
            "A web framework for Node.js that simplifies server-side development.",
        },
      },
      {
        name: "Python",
        attributes: {
          description:
            "A programming language widely used for data science, machine learning, and web development.",
        },
      },
      {
        name: "Django",
        attributes: {
          description:
            "A Python web framework that promotes rapid development and clean, pragmatic design.",
        },
      },
      {
        name: "Flask",
        attributes: {
          description:
            "A Python web framework known for its simplicity and flexibility.",
        },
      },
      {
        name: "SQL",
        attributes: {
          description:
            "A structured query language used to interact with relational databases.",
        },
      },
      {
        name: "MongoDB",
        attributes: {
          description:
            "A NoSQL database that stores data in a flexible, document-oriented format.",
        },
      },
    ],
  },
  {
    name: "Full-Stack Development",
    children: [
      {
        name: "MERN Stack",
        attributes: {
          description:
            "A combination of MongoDB, Express.js, React, and Node.js for building full-stack applications.",
        },
      },
      {
        name: "MEAN Stack",
        attributes: {
          description:
            "A combination of MongoDB, Express.js, Angular, and Node.js for building full-stack applications.",
        },
      },
      {
        name: "LAMP Stack",
        attributes: {
          description:
            "A combination of Linux, Apache, MySQL, and PHP for building full-stack applications.",
        },
      },
    ],
  },
  {
    name: "Tools and Technologies",
    children: [
      {
        name: "Git",
        attributes: {
          description:
            "A distributed version control system for tracking changes to code.",
        },
      },
      {
        name: "GitHub",
        attributes: {
          description:
            "A code hosting platform for collaboration and version control.",
        },
      },
      {
        name: "DevTools",
        attributes: {
          description:
            "Browser-based tools for debugging and inspecting web pages.",
        },
      },
      {
        name: "Package Managers",
        attributes: {
          description:
            "Tools for managing and installing dependencies for web development projects.",
        },
      },
      {
        name: "Cloud Platforms",
        attributes: {
          description: "Services for hosting and deploying web applications.",
        },
      },
    ],
  },
];
const Graphs = () => {
  const [myTreeData, setMyTreeData] = useState([]);
  useEffect(() => {
    console.log("called");
    const fetchRoadMap = async () => {
      const response = await AxiosInstance.post(
        "/roadmap/generate",
        { interest: "web development" },
        {
          headers: getAuthorizationHeader(),
        }
      );

      console.log(response.data);
      const data = response.data.text;
      console.log(data);
      if (data) {
        // Parsing the JSON string into a JavaScript object
        const jsonObject = JSON.parse(data);
        console.log(jsonObject);
        setMyTreeData(jsonObject);
      }
    };
    fetchRoadMap();
  }, []);
  return (
    <div>
      <div className="App">
        <h1>ORG Chart</h1>
        <div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
          {myTreeData.length && (
            <Tree
              data={myTreeData}
              // nodeSvgShape={svgSquare}
              orientation="vertical"
              nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
              pathFunc="step"
              separation={{ siblings: 2, nonSiblings: 2 }}
              translate={{ x: 650, y: 100 }}
              allowForeignObjects={true}
              initialDepth={0.02}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Graphs;
