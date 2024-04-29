import { useEffect, useRef, useState } from "react";
import Tree, { Orientation, PathFunction, PathFunctionOption } from "react-d3-tree";
import NodeElement from "./node-element";
import { useAuth } from "../../hooks/auth-context";
import {
  deleteRoadmapInterest,
  generateRoadmap,
  getUserRoadmap,
  saveRoadmap,
} from "../../services/roadmap";
import {
  Button,
  FloatButton,
  notification,
  Popconfirm,
  Progress,
  Select,
  Spin,
} from "antd";
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

interface Roadmap {
  title: string;
  data: string;
}

interface NodeDatum {
  name: string;
  children?: NodeDatum[];
}

const RoadMap = () => {
  const [myTreeData, setMyTreeData] = useState<NodeDatum[]>([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [interest] = useState("");
  const { user, deduceCredit } = useAuth();
  const [showHeading, setShowHeading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orientation, setOrientation] = useState("vertical");
  const [pathFunc, setPathFunc] = useState("step");
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typedInterest, setTypedInterest] = useState(""); // For input field
  const [selectedInterest, setSelectedInterest] = useState(""); // For dropdown selection
  const treeWrapperRef = useRef<HTMLDivElement>(null); // Reference to the tree wrapper for scrolling
  const [controlledLoading, setControlledLoading] = useState(false);

  const scrollToBottom = () => {
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
    setControlledLoading(true);

    if (
      nodeDatum.name &&
      (!nodeDatum.children || nodeDatum.children.length == 0)
    ) {
      const newInterest = interest
        ? `${interest}, ${nodeDatum.name}`
        : nodeDatum.name;

      let newData;
      try {
        newData = await generateRoadmap(newInterest, deduceCredit);
      } catch (error) {
        setControlledLoading(false);
      }

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
        setControlledLoading(false);
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
    console.log(user.email);
    const roadmapData = await getUserRoadmap(user.email);
    console.log(roadmapData);
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
    console.log(typedInterest);
    const data = await generateRoadmap(typedInterest, deduceCredit);
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
      console.log("called form save");
      console.log();
      // setRoadmaps([...roadmaps, myTreeData])

      // Update roadmaps state to include the new or updated data
      const updatedRoadmaps = roadmaps.map((roadmap) => {
        if (roadmap.title === selectedInterest) {
          return { ...roadmap, data: JSON.stringify(myTreeData) };
        }
        return roadmap;
      });

      // If the interest doesn't exist in roadmaps, add it
      if (!roadmaps.some((roadmap) => roadmap.title === selectedInterest)) {
        updatedRoadmaps.push({
          title: selectedInterest,
          data: JSON.stringify(myTreeData),
        });
      }

      setRoadmaps(updatedRoadmaps);
      notification.success({
        message: data.message,
        duration: 10,
      });
      scrollToBottom();
    } catch (error) {
      notification.error({
        message: "Failed to save the roadmap",
        description: (error as Error).message,
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
    // setSelectedInterest(selectedInterest);
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
    console.log(interestTitle);
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
      {isLoading && (
        <div className="fixed top-4 right-4 z-50">
          <Spin size="large" />
        </div>
      )}

      <>
        <FloatButton.Group
          trigger="click"
          type="default"
          // style={{ right: 15 }}
          style={{ position: "fixed", bottom: 15, right: 15, zIndex: 999 }} // Adjust position to bottom right
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
          {roadmaps.find((interest) => interest.title === selectedInterest) && (
            <Popconfirm
              title="Are you sure you want to delete this roadmap?"
              onConfirm={() => handleDeleteInterest(selectedInterest)}
              okText="Yes"
              cancelText="No"
            >
              <FloatButton
                tooltip={`Delete the roadmap`}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          )}

          <FloatButton
            onClick={addRoadmap}
            icon={isLoading ? <LoadingOutlined /> : <SaveOutlined />} // Change icon based on isLoading
            tooltip={isLoading ? "Saving..." : "Save roadmap"} // Change tooltip text based on isLoading
          />
          <FloatButton
            onClick={handleDownload}
            tooltip="Download roadmap"
            icon={<CloudDownloadOutlined />}
          />
        </FloatButton.Group>

        <FloatButton
          style={{ position: "fixed", bottom: 15, right: 70, zIndex: 999 }} // Adjust position to bottom right
          // style={{ position: 'fixed', right: 65 }} // Positioning the button at the bottom right
          onClick={scrollToTop}
          icon={<UpCircleOutlined />}
          tooltip="Scroll to top"
        />
      </>
      <IntroSection
        title="AI Pathfinder"
        description="Our vision for the future. The features we're working on. The progress we've made."
        placeholder="enter your interest"
        value={typedInterest}
        onChange={setTypedInterest}
        // onSubmit={() => handleRoadmap(interest)}
        onSubmit={handleRoadmap}
        showHeading={showHeading}
        isLoading={loading}
      />

      <div className="App bg-white shadow-lg rounded-xl p-6 w-4/5 m-auto mt-8 text-center flex-col">
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
        <div>
          <Select
            className="w-full max-w-md my-4"
            value={selectedInterest}
            onChange={handleInterestChange}
            placeholder="Select an interest"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <div style={{ padding: "8px", textAlign: "center" }}>
                  <Button type="text" onClick={(e) => e.stopPropagation()}>
                    Manage Your Roadmaps
                  </Button>
                </div>
              </div>
            )}
          >
            {roadmaps.map((interest) => (
              <Select.Option key={interest.title} value={interest.title}>
                <div className="flex justify-between text-center px-1.5">
                  <span>{interest.title}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div
        id="treeWrapper"
        ref={treeWrapperRef}
        style={{ width: "93%", height: "100vh" }}
      >
        <CelebrationAnimation
          completionPercentage={calculateCompletionPercentage(myTreeData)}
        />
        {loading ? (
          // Render loading skeleton when loading
          <div className="my-6">
            <TreeSkeleton />
          </div>
        ) : (
          myTreeData &&
          myTreeData?.length > 0 && ( // Render tree if data is available
            <>
              <Tree
                data={myTreeData}
                orientation={orientation as Orientation} 
                pathFunc={pathFunc as PathFunctionOption | PathFunction}
                nodeSize={{
                  x: 500,
                  y: 300,
                }}
                translate={{ x: 600, y: 100 }}
                // allowForeignObjects={true}
                renderCustomNodeElement={(props) => (
                  <NodeElement
                    {...props}
                    handleNodeClick={handleNodeClick}
                    selectedNode={selectedNode}
                    updateCompletionStatus={updateCompletionStatus}
                    addChildNode={addChildNode}
                    deleteNode={deleteNode}
                    controlledLoading={controlledLoading}
                  />
                )}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default RoadMap;
