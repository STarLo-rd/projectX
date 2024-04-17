import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import NodeElement from "./node-element";
import { useAuth } from "../../hooks/auth-context";
import {
  generateRoadmap,
  getUserRoadmap,
  saveRoadmap,
} from "../../services/roadmap";
import { Button, FloatButton, notification, Progress, Select } from "antd";
import "./roadmap.css";
import IntroSection from "../../components/templates/intro-section";
import {
  CloudDownloadOutlined,
  CommentOutlined,
  CopyOutlined,
  CustomerServiceOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import TreeSkeleton from "../../components/skeleton/tree-skeleton";
import {
  calculateCompletionPercentage,
  completionMessage,
  downloadRoadmap,
  getProgressColorClass,
  orientationOptions,
  pathFuncOptions,
  updateNodeCompletion,
} from "../../utils/roadmapUtils";
import CelebrationAnimation from "../../components/templates/celebration-animation";

const RoadMap = () => {
  const [myTreeData, setMyTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [interest, setInterest] = useState("");
  const { user } = useAuth();
  const [showHeading, setShowHeading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orientation, setOrientation] = useState("vertical");
  const [pathFunc, setPathFunc] = useState("step");
  const [completionPercent, setCompletionPercent] = useState(0);
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

    if (
      nodeDatum.name &&
      (!nodeDatum.children || nodeDatum.children.length == 0)
    ) {
      const newInterest = interest
        ? `${interest}, ${nodeDatum.name}`
        : nodeDatum.name;

      const newData = await generateRoadmap(newInterest);

      if (newData && newData.length) {
        const updatedData = appendChildren(myTreeData, nodeDatum.name, newData);
        setMyTreeData(updatedData);
      }
    }
  };

  const handleDownload = () => downloadRoadmap(myTreeData);

  const updateCompletionStatus = (nodeDatum, isCompleted) => {
    if (nodeDatum.children && nodeDatum.children.length > 0) {
      notification.info({
        message: "complete the child task",
        duration: 5,
      });
      return;
    }
    const newData = updateNodeCompletion(
      myTreeData,
      nodeDatum.name,
      isCompleted
    );
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
    if (myTreeData && myTreeData.length !== 0) {
      setShowHeading(false);
      const percentage = calculateCompletionPercentage(myTreeData);
      setCompletionPercent(percentage);
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
      duration: 10,
    });
  };

  const addChildNode = (parentNodeDatum, newNode) => {
    const updatedData = appendChildren(myTreeData, parentNodeDatum.name, [
      newNode,
    ]);
    setMyTreeData(updatedData);
  };

  const deleteNode = (nodeDatum) => {
    const removeNode = (data, target) => {
      return data.reduce((acc, node) => {
        if (node.name === target.name) {
          return acc;
        }
        if (node.children) {
          node.children = removeNode(node.children, target);
        }
        acc.push(node);
        return acc;
      }, []);
    };

    const updatedData = removeNode([...myTreeData], nodeDatum); // Use a copy of myTreeData to trigger a state update
    setMyTreeData(updatedData); // Update the state with the new data
  };

  return (
    <div>
      <>
        <FloatButton.Group
          trigger="click"
          type="default"
          style={{ right: 20 }}
          icon={<CopyOutlined />}
        >
          <FloatButton onClick={addRoadmap} icon={<SaveOutlined />} tooltip="save roadmap" />
          <FloatButton onClick={handleDownload} tooltip="download roadmap" icon={<CloudDownloadOutlined />} />
        </FloatButton.Group>
      </>
      <IntroSection
        title="The Roadmap"
        description="Our vision for the future. The features we're working on. The progress we've made."
        placeholder="enter your interest"
        value={interest}
        onChange={setInterest}
        onSubmit={() => handleRoadmap(interest)}
        showHeading={showHeading}
      />
      <div className="App bg-white shadow-lg rounded-xl p-6 w-4/5 m-auto mt-8">
        <Progress
          className="w-full"
          percent={Math.round(calculateCompletionPercentage(myTreeData))}
          strokeWidth={12}
          status="active"
          strokeColor={getProgressColorClass(
            Math.round(calculateCompletionPercentage(myTreeData))
          )}
          trailColor="#f0f2f5"
        />

        <p className="text-center text-lg text-gray-700 mt-4 mb-6">
          {completionMessage(calculateCompletionPercentage(myTreeData))}
        </p>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <label className="text-gray-600 font-semibold">Orientation:</label>
            <Select
              value={orientation}
              onChange={(value) => handleOptionChange("orientation", value)}
              options={orientationOptions}
              className="w-40"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-600 font-semibold">
              Path Function:
            </label>
            <Select
              value={pathFunc}
              onChange={(value) => handleOptionChange("pathFunc", value)}
              options={pathFuncOptions}
              className="w-40"
            />
          </div>
        </div>
      </div>

      <div id="treeWrapper" style={{ width: "95%", height: "100vh" }}>
        <CelebrationAnimation
          completionPercentage={calculateCompletionPercentage(myTreeData)}
        />
        {loading ? (
          // Render loading skeleton when loading
          // <Skeleton active />
          <TreeSkeleton />
        ) : (
          myTreeData &&
          myTreeData?.length > 0 && ( // Render tree if data is available
            <Tree
              data={myTreeData}
              orientation={orientation}
              nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
              pathFunc={pathFunc}
              nodeSize={{ x: orientation === "horizontal" && pathFunc ==="step" ? 900: 500, y: 300 }}
              translate={{ x: 700, y: 100 }}
              allowForeignObjects={true}
              renderCustomNodeElement={(props) => (
                <NodeElement
                  {...props}
                  handleNodeClick={handleNodeClick}
                  selectedNode={selectedNode}
                  updateCompletionStatus={updateCompletionStatus}
                  addChildNode={addChildNode}
                  deleteNode={deleteNode}
                />
              )}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RoadMap;
