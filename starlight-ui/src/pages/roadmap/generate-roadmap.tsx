import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { getAuthorizationHeader } from "../../utils/utils";
import AxiosInstance from "../../services/axios-instance";
import { renderNodeElement } from "./node-element";
import { useAuth } from "../../hooks/auth-context";

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

// const sampleData2 = [
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
  const { user } = useAuth();

  // const [sampleTree, SetSampleTree] = useState(sampleTreeData);

  // Function to append children to the respective node
  const appendChildren = (data, nodeName, children) => {
    return data.map((item) => {
      if (item.name === nodeName) {
        return {
          ...item,
          children: item.children
            ? [...item.children, ...children]
            : [...children],
        };
      } else if (item.children) {
        return {
          ...item,
          children: appendChildren(item.children, nodeName, children),
        };
      }
      return item;
    });
  };

  const handleNodeClick = async (nodeDatum) => {
    setSelectedNode(nodeDatum);
    console.log(`Clicked node: ${nodeDatum.name}`);
    console.log("hasChildren", nodeDatum.children);

    if (nodeDatum.name && !nodeDatum.children) {
      // Construct the interest based on the clicked node
      const newInterest = interest
        ? `${interest}, ${nodeDatum.name}`
        : nodeDatum.name;

      // Fetch additional data based on the new interest
      // const newData = await fetchRoadMap(newInterest);
      const newData = await fetchRoadMap(newInterest);

      // Update the tree structure by adding new data as children of the clicked node
      if (newData.length) {
        const updatedData = appendChildren(myTreeData, nodeDatum.name, newData);
        console.log("updatedData", updatedData);
        // Update the state to re-render the tree with the expanded node
        setMyTreeData(updatedData);
      }
    }
  };

  // const handleNodeClick = (nodeDatum) => {
  //   setSelectedNode(nodeDatum);
  //   console.log(`Clicked node: ${nodeDatum.name}`);
  // };

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
      // setMyTreeData(jsonObject);

      return jsonObject;
    }
  };

  const handleRoadmap = async (interest) => {
    const data = await fetchRoadMap(interest);
    setMyTreeData(data);
  };
  // useEffect(() => {
  //   // fetchRoadMap("python");
  // }, [fetchRoadMap]);
  const saveRoadmap = async () => {
    const { data } = await AxiosInstance.post(
      `/roadmaps`,
      { user: user.email, data: { data: myTreeData } },
      {
        headers: getAuthorizationHeader(),
      }
    );

    console.log(data);
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="enter your interest"
          onChange={(e) => setInterest(e.target.value)}
        />
        <input type="submit" onClick={() => handleRoadmap(interest)} />
      </div>
      <div className="App">
        <h1>org Chart</h1>
        <button onClick={saveRoadmap}>save your roadmap</button>
        <div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
          {myTreeData.length && (
            <Tree
              data={myTreeData}
              orientation="vertical"
              nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
              pathFunc="step"
              // separation={{ siblings: 50, nonSiblings: 50 }}
              nodeSize={{ x: 500, y: 300 }}
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
