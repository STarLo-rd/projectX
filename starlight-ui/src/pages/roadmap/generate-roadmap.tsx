import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import NodeElement from "./node-element";
import { useAuth } from "../../hooks/auth-context";
import { jsPDF } from "jspdf";
import {
  generateRoadmap,
  getUserRoadmap,
  saveRoadmap,
} from "../../services/roadmap";
import { Button, notification, Select, Skeleton } from "antd";
import "./roadmap.css";
import IntroSection from "../../components/templates/intro-section";
import { SaveOutlined } from "@ant-design/icons";
import TreeSkeleton from "../../components/skeleton/tree-skeleton";

const RoadMap = () => {
  const [myTreeData, setMyTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [interest, setInterest] = useState("");
  const { user } = useAuth();
  const [showHeading, setShowHeading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orientation, setOrientation] = useState("vertical");
  const [pathFunc, setPathFunc] = useState("step");
  const orientationOptions = [
    { label: "Vertical", value: "vertical" },
    { label: "Horizontal", value: "horizontal" },
  ];

  const pathFuncOptions = [
    { label: "Step", value: "step" },
    { label: "Straight", value: "straight" },
    { label: "Curved", value: "curved" },
  ];
  const handleOptionChange = (option, value) => {
    if (option === "orientation") {
      setOrientation(value);
    } else if (option === "pathFunc") {
      setPathFunc(value);
    }
  };
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
    console.log(nodeDatum);

    if (nodeDatum.name && !nodeDatum.children) {
      const newInterest = interest
        ? `${interest}, ${nodeDatum.name}`
        : nodeDatum.name;

      const newData = await generateRoadmap(newInterest);

      if (newData.length) {
        const updatedData = appendChildren(myTreeData, nodeDatum.name, newData);
        setMyTreeData(updatedData);
      }
    }
  };

  const downloadRoadmap = ( ) => {
    const roadmap = myTreeData
    const doc = new jsPDF();
  
    const generateList = (items, depth: number, startY: number) => {
      let y = startY;
      items.forEach((item, index) => {
        const prefix = `${index + 1}.`;
        const indentation = "  ".repeat(depth);
        const text = `${indentation}${prefix} ${item.name}`;
  
        doc.text(text, 10, y);
        y += 7; // Increase vertical spacing
  
        if (y >= doc.internal.pageSize.height - 10) {
          doc.addPage();
          y = 10;
        }
  
        if (item.children) {
          y = generateList(item.children, depth + 1, y);
        }
      });
      return y; // Return updated y position
    };
  
    generateList(roadmap, 0, 10);
  
    doc.save("roadmap.pdf");
  };
  

  // const downloadRoadmap = () => {
  //   const treeWrapper = document.getElementById("treeWrapper");
  //   const svgElement = treeWrapper.querySelector("svg");
  //   let svgData = svgElement.outerHTML;
  
  //   // Remove React-specific attributes and elements
  //   svgData = svgData.replace(/ data-react.*?"/g, "");
  //   svgData = svgData.replace(/<foreignObject.*?<\/foreignObject>/g, "");
  
  //   const blob = new Blob([svgData], { type: "image/svg+xml" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "roadmap.svg";
  //   link.click();
  // };

  const updateCompletionStatus = (nodeDatum, isCompleted) => {
    console.log(nodeDatum);
    if (nodeDatum.children && nodeDatum.children.length > 0) {
      notification.info({
        message: "complete the child task",
        duration: 5,
      });
      return;
    }
    const updateNode = (data, nodeName) => {
      return data.map((item) => {
        if (item.name === nodeName) {
          return { ...item, isCompleted };
        } else if (item.children) {
          const updatedChildren = updateNode(item.children, nodeName);
          const allCompleted = updatedChildren.every(
            (child) => child.isCompleted
          );
          return {
            ...item,
            children: updatedChildren,
            isCompleted: allCompleted,
          };
        }
        return item;
      });
    };

    const newData = updateNode(myTreeData, nodeDatum.name);
    setMyTreeData(newData);
  };

  const getRoadmap = async () => {
    setLoading(true); // Set loading state when fetching data
    const roadmap = await getUserRoadmap(user.email);
    setLoading(false); // Reset loading state after fetching data

    if (roadmap && roadmap.data) {
      setMyTreeData(JSON.parse(roadmap.data) || []);
    }
  };

  useEffect(() => {
    if (myTreeData.length !== 0) {
      setShowHeading(false);
    } else {
      setShowHeading(true);
    }
  }, [myTreeData]);

  useEffect(() => {
    getRoadmap();
  }, [user]);

  const handleRoadmap = async (interest: string) => {
    setLoading(true); // Set loading state when fetching data
    const data = await generateRoadmap(interest);
    setLoading(false); // Reset loading state after fetching data

    setMyTreeData(data);
  };

  const addRoadmap = async () => {
    const data = await saveRoadmap(user, JSON.stringify(myTreeData));
    notification.success({
      message: data.message,
      duration: 5,
    });
  };

  return (
    <div>
      <IntroSection
        title="The Roadmap"
        description="Our vision for the future. The features we're working on. The progress we've made."
        placeholder="enter your interest"
        value={interest}
        onChange={setInterest}
        onSubmit={() => handleRoadmap(interest)}
        showHeading={showHeading}
      />
      <div className="App">
        <div className="flex justify-start mb-4 ml-3">
          <div className="ml-4">
            <label>Orientation: </label>
            <Select
              value={orientation}
              onChange={(value) => handleOptionChange("orientation", value)}
              options={orientationOptions}
            />
          </div>
          <div className="ml-4">
            <label>Path Function: </label>
            <Select
              value={pathFunc}
              onChange={(value) => handleOptionChange("pathFunc", value)}
              options={pathFuncOptions}
            />
          </div>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={addRoadmap}
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            Save Roadmap
          </Button>
          <Button
            type="primary"
            onClick={downloadRoadmap}
            className="bg-blue-500 hover:bg-blue-700 text-white ml-4"
          >
            Download Roadmap
          </Button>
        </div>
        <div id="treeWrapper" style={{ width: "95%", height: "100vh" }}>
          {loading ? ( // Render loading skeleton when loading
            // <Skeleton active />
            <TreeSkeleton />
          ) : (
            myTreeData.length > 0 && ( // Render tree if data is available
              <Tree
                data={myTreeData}
                // orientation="vertical"
                orientation={orientation}
                nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
                pathFunc={pathFunc}
                // pathFunc="step"
                nodeSize={{ x: 500, y: 300 }}
                translate={{ x: 700, y: 100 }}
                allowForeignObjects={true}
                renderCustomNodeElement={(props) => (
                  <NodeElement
                    {...props}
                    handleNodeClick={handleNodeClick}
                    selectedNode={selectedNode}
                    updateCompletionStatus={updateCompletionStatus}
                  />
                )}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
