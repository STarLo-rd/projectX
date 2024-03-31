import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { getAuthorizationHeader } from "../../utils/utils";
import AxiosInstance from "../../services/axios-instance";
import { renderNodeElement } from "./node-element";

// const sampleTreeData = [
//   {
//     name: "React JS",
//     children: [
//       {
//         name: "Introduction to React JS",
//         children: [
//           {
//             name: "What is React JS?",
//           },
//           {
//             name: "Benefits of Using React JS",
//           },
//           {
//             name: "Prerequisites for Learning React JS",
//           },
//           {
//             name: "Setting up Your Development Environment",
//           },
//         ],
//       },
//       {
//         name: "Core Concepts of React JS",
//         children: [
//           {
//             name: "Components",
//           },
//           {
//             name: "Props",
//           },
//           {
//             name: "State",
//           },
//           {
//             name: "Lifecycle Methods",
//           },
//           {
//             name: "Virtual DOM",
//           },
//         ],
//       },
//       {
//         name: "Advanced Concepts of React JS",
//         children: [
//           {
//             name: "Hooks",
//           },
//           {
//             name: "Context API",
//           },
//           {
//             name: "Redux",
//           },
//           {
//             name: "React Router",
//           },
//           {
//             name: "Optimization Techniques",
//           },
//         ],
//       },
//       {
//         name: "Building Real-World Applications with React JS",
//         children: [
//           {
//             name: "Creating a Simple To-Do List App",
//           },
//           {
//             name: "Building a Dynamic Blog with React JS",
//           },
//           {
//             name: "Developing an E-commerce Website with React JS",
//           },
//           {
//             name: "Best Practices for React JS Development",
//           },
//         ],
//       },
//       {
//         name: "Advanced Topics in React JS",
//         children: [
//           {
//             name: "React Native",
//           },
//           {
//             name: "Server-Side Rendering (SSR)",
//           },
//           {
//             name: "GraphQL",
//           },
//           {
//             name: "TypeScript with React JS",
//           },
//           {
//             name: "Testing with React JS",
//           },
//         ],
//       },
//     ],
//   },
// ];

const RoadMap = () => {
  const [myTreeData, setMyTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [interest, setInterest] = useState("");

  const handleNodeClick = (nodeDatum) => {
    setSelectedNode(nodeDatum);
    console.log(`Clicked node: ${nodeDatum.name}`);
  };

  const fetchRoadMap = async (interest: string) => {
    const response = await AxiosInstance.post(
      "/roadmap/generate",
      { interest: interest },
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
  useEffect(() => {
    // fetchRoadMap("python");
  }, [fetchRoadMap]);
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="enter your interest"
          onChange={(e) => setInterest(e.target.value)}
        />
        <input type="submit" onClick={() => fetchRoadMap(interest)} />
      </div>
      <div className="App">
        <h1>org Chart</h1>
        <div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
          {myTreeData.length && (
            <Tree
              data={myTreeData}
              orientation="vertical"
              nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
              pathFunc="step"
              separation={{ siblings: 3, nonSiblings: 3 }}
              translate={{ x: 350, y: 100 }}
              allowForeignObjects={true}
              initialDepth={0.02}
              renderCustomNodeElement={(props) =>
                renderNodeElement(props, selectedNode, handleNodeClick)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
