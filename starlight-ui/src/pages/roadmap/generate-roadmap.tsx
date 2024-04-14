import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import NodeElement from "./node-element";
import { useAuth } from "../../hooks/auth-context";
import {
  generateRoadmap,
  getUserRoadmap,
  saveRoadmap,
} from "../../services/roadmap";
import { Button, notification, Skeleton } from "antd";
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
  const [loading, setLoading] = useState(false); // New loading state
  const [initialDepth, setInitialDepth] = useState(0);
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

  const calculateDepth = (data, nodeName) => {
    let depth = 0;
    const findDepth = (nodes, currentDepth) => {
      for (const node of nodes) {
        if (node.name === nodeName) {
          depth = currentDepth;
          return;
        }
        if (node.children) {
          findDepth(node.children, currentDepth + 1);
        }
      }
    };
    findDepth(data, 0);
    return depth;
  };
  const handleNodeClick = async (nodeDatum) => {
    setSelectedNode(nodeDatum);

    if (nodeDatum.name && !nodeDatum.children) {
      const newInterest = interest
        ? `${interest}, ${nodeDatum.name}`
        : nodeDatum.name;

      const newData = await generateRoadmap(newInterest);

      if (newData.length) {
        const updatedData = appendChildren(myTreeData, nodeDatum.name, newData);
        setInitialDepth(calculateDepth(updatedData, nodeDatum.name)); // Set the initial depth based on the new data
        setMyTreeData(updatedData);
      }
    }
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
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={addRoadmap}
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            Save Roadmap
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
                orientation="vertical"
                nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
                pathFunc="step"
                nodeSize={{ x: 500, y: 300 }}
                translate={{ x: 700, y: 100 }}
                allowForeignObjects={true}
                initialDepth={initialDepth}
                renderCustomNodeElement={(props) => (
                  <NodeElement
                    {...props}
                    handleNodeClick={handleNodeClick}
                    selectedNode={selectedNode}
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
