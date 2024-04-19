import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import NodeElement from "./node-element";
import { useAuth } from "../../hooks/auth-context";
import {
  deleteRoadmapInterest,
  generateRoadmap,
  getUserRoadmap,
  saveRoadmap,
} from "../../services/roadmap";
import { Button, FloatButton, notification, Progress, Select } from "antd";
import "./roadmap.css";
import IntroSection from "../../components/templates/intro-section";
import {
  BorderHorizontalOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  SaveOutlined,
  UpCircleOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import TreeSkeleton from "../../components/skeleton/tree-skeleton";
import {
  calculateCompletionPercentage,
  completionMessage,
  downloadRoadmap,
  getProgressColorClass,
  updateNodeCompletion,
} from "../../utils/roadmapUtils";
import CelebrationAnimation from "../../components/templates/celebration-animation";
import { scrollToTop } from "../../utils/utils";

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
  const [roadmaps, setRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [typedInterest, setTypedInterest] = useState(""); // For input field
  const [selectedInterest, setSelectedInterest] = useState(""); // For dropdown selection
  const treeWrapperRef = useRef(null); // Reference to the tree wrapper for scrolling


  const scrollToBottom = () => {
    console.log("scroll to bttom")
    if (treeWrapperRef.current) {
      treeWrapperRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler for dropdown change
  const handleInterestChange = (selectedTitle) => {
    setSelectedInterest(selectedTitle);
    const interestData = roadmaps.find(
      (interest) => interest.title === selectedTitle
    );
    if (interestData) {
      setMyTreeData(JSON.parse(interestData.data));
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
        // Also update the roadmaps state to reflect this change
        const updatedRoadmaps = roadmaps.map((roadmap) => {
          if (roadmap.title === selectedInterest) {
            return { ...roadmap, data: JSON.stringify(updatedData) };
          }
          return roadmap;
        });

        setRoadmaps(updatedRoadmaps);
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

  const fetchRoadmaps = async () => {
    setLoading(true);
    const roadmapData = await getUserRoadmap(user.email);
    setLoading(false);
    if (roadmapData && roadmapData.interests) {
      setRoadmaps(roadmapData.interests);
      if (!selectedInterest && roadmapData.interests.length > 0) {
        setSelectedInterest(roadmapData.interests[0].title);
        setMyTreeData(JSON.parse(roadmapData.interests[0].data));
      }
    }
  };

  // Load interests on component mount
  useEffect(() => {
    fetchRoadmaps();
  }, [user]);

  useEffect(() => {
    if (myTreeData && myTreeData.length !== 0) {
      setShowHeading(false);
    } else {
      setShowHeading(true);
    }
  }, [myTreeData]);

  // Handler for submitting a new interest
  const handleRoadmap = async () => {
    setLoading(true);
    const data = await generateRoadmap(typedInterest);
    setSelectedInterest(typedInterest);
    setLoading(false);
    if (data) {
      setMyTreeData(data);
    }
  };
  const addRoadmap = async () => {
    setIsLoading(true); // Set loading to true when save starts
    try {
      const data = await saveRoadmap(
        user,
        selectedInterest,
        JSON.stringify(myTreeData)
      );
      notification.success({
        message: data.message,
        duration: 10,
      });
      scrollToBottom();
    } catch (error) {
      notification.error({
        message: "Failed to save the roadmap",
        description: error.message,
        duration: 10,
      });
      setIsLoading(false);
    }
    // Check if the interest is already in the roadmaps state
    const exists = roadmaps.some(
      (roadmap) => roadmap.title === selectedInterest
    );
    if (exists) {
      // Update the existing interest data
      const updatedRoadmaps = roadmaps.map((roadmap) => {
        if (roadmap.title === selectedInterest) {
          return { ...roadmap, data: JSON.stringify(myTreeData) };
        }
        return roadmap;
      });
      setRoadmaps(updatedRoadmaps);
    }

    // Update selectedInterest if it's new to keep the UI in sync
    setSelectedInterest(selectedInterest);
    setIsLoading(false); // Set loading to false after save is complete
  };

  useEffect(() => {
    if (selectedInterest) {
      scrollToBottom();
    }
  }, [selectedInterest]);

  const addChildNode = (parentNodeDatum, newNode) => {
    const updatedData = appendChildren(myTreeData, parentNodeDatum.name, [
      newNode,
    ]);
    setMyTreeData(updatedData);
    // Also update the roadmaps state to reflect this change
    const updatedRoadmaps = roadmaps.map((roadmap) => {
      if (roadmap.title === selectedInterest) {
        return { ...roadmap, data: JSON.stringify(updatedData) };
      }
      return roadmap;
    });

    setRoadmaps(updatedRoadmaps);
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

  const handleDeleteInterest = async (interestTitle) => {
    await deleteRoadmapInterest(user.email, interestTitle);
    // Update local state to reflect the change
    const updatedRoadmaps = roadmaps.filter(
      (interest) => interest.title !== interestTitle
    );
    setRoadmaps(updatedRoadmaps);
    // Reset selected interest if it was the one deleted
    if (selectedInterest === interestTitle) {
      setSelectedInterest(
        updatedRoadmaps.length > 0 ? updatedRoadmaps[0].title : ""
      );
      setMyTreeData(
        updatedRoadmaps.length > 0 ? JSON.parse(updatedRoadmaps[0].data) : []
      );
    }
  };

  const toggleOrientation = () => {
    const newOrientation =
      orientation === "vertical" ? "horizontal" : "vertical";
    setOrientation(newOrientation);
    setPathFunc(newOrientation === "vertical" ? "step" : "curved");
  };

  return (
    <div className="m-auto bg-white">
      <>
        <FloatButton.Group
          trigger="click"
          type="default"
          style={{ right: 15 }}
          icon={<InfoCircleOutlined />}
        >
          <FloatButton
            onClick={toggleOrientation}
            tooltip={`Switch to ${
              orientation === "vertical" ? "horizontal" : "vertical"
            } layout`}
            icon={
              orientation === "vertical" ? (
                <BorderHorizontalOutlined />
              ) : (
                <VerticalAlignTopOutlined />
              )
            }
          />
          <FloatButton
            onClick={addRoadmap}
            icon={isLoading ? <LoadingOutlined /> : <SaveOutlined />} // Change icon based on isLoading
            tooltip={isLoading ? "Saving..." : "Save roadmap"} // Change tooltip text based on isLoading
          />
          <FloatButton
            onClick={handleDownload}
            tooltip="download roadmap"
            icon={<CloudDownloadOutlined />}
          />
        </FloatButton.Group>

        <FloatButton
          style={{ position: 'fixed', right: 65 }} // Positioning the button at the bottom right
          onClick={scrollToTop}
          icon={<UpCircleOutlined />}
          tooltip="Scroll to top"
        />
    
      </>
      <IntroSection
        title="The Roadmap"
        description="Our vision for the future. The features we're working on. The progress we've made."
        placeholder="enter your interest"
        value={typedInterest}
        onChange={setTypedInterest}
        // onSubmit={() => handleRoadmap(interest)}
        onSubmit={handleRoadmap}
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
        <Select
          className="w-full max-w-md mx-auto my-4"
          value={selectedInterest}
          onChange={handleInterestChange}
          placeholder="Select an interest"
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div style={{ padding: "8px", textAlign: "center" }}>
                <Button type="text" onClick={(e) => e.stopPropagation()}>
                  Manage Interests
                </Button>
              </div>
            </div>
          )}
        >
          {roadmaps.map((interest) => (
            <Select.Option key={interest.title} value={interest.title}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{interest.title}</span>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent Select onChange trigger
                    handleDeleteInterest(interest.title);
                  }}
                  style={{ color: "red", marginLeft: 8 }}
                />
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>

      <div id="treeWrapper" ref={treeWrapperRef} style={{ width: "95%", height: "100vh" }}>
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
              nodeSize={{
                x: 500,
                y: 300,
              }}
              translate={{ x: 600, y: 100 }}
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
