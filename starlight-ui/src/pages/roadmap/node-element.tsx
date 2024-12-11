import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Checkbox, message, Popconfirm, Spin } from "antd";
import { useState } from "react";

const NodeElement = ({
  nodeDatum,
  toggleNode,
  handleNodeClick,
  selectedNode,
  updateCompletionStatus,
  addChildNode,
  deleteNode,
  controlledLoading,
}) => {
  const [isLoadingNode, setIsLoadingNode] = useState(false);

  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [newNodeDescription, setNewNodeDescription] = useState("");
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;

  const handleAddChildNode = () => {
    if (newNodeTitle.trim() !== "" && newNodeDescription.trim() != "") {
      addChildNode(nodeDatum, {
        name: newNodeTitle.trim(),
        description: newNodeDescription.trim(),
        isCompleted: false,
      });
      setNewNodeTitle("");
      setNewNodeDescription("");
      console.log(selectedNode);
    }
  };

  const handleClick = async () => {
    toggleNode();
    if (nodeDatum.name && !hasChildren) {
      setIsLoadingNode(true);
      await handleNodeClick(nodeDatum);
      setIsLoadingNode(false);
    }
  };

  return (
    <g>
      <circle
        r={10}
        fill={
          nodeDatum.isCompleted ? "#03c303" : hasChildren ? "orange" : "black"
        }
        onClick={handleClick}
      />
      <text
        fill="black"
        strokeWidth="0.7"
        // className="animated-text"
        x={15}
        onClick={() =>
          !controlledLoading
            ? handleClick()
            : message.info(
                "Please wait while we process your previous request."
              )
        }
        style={{
          textDecoration: nodeDatum.isCompleted ? "line-through" : "none",
        }}
      >
        {nodeDatum.name}
      </text>

      {nodeDatum.description && (
        <foreignObject
          x={15}
          y={25}
          width={420}
          height={200}
          style={{
            minWidth: "400px",
            padding: "3px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            textAlign: "justify",
          }}
        >
          <div
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              textAlign: "justify",
            }}
          >
            {nodeDatum.description}
            <div className="mt-2">
              {!hasChildren && (
                <Checkbox
                  checked={nodeDatum.isCompleted}
                  onChange={(e) =>
                    updateCompletionStatus(nodeDatum, e.target.checked)
                  }
                >
                  {nodeDatum.isCompleted ? "Completed" : "Mark as Completed"}
                </Checkbox>
              )}

              {!hasChildren && (
                <Popconfirm
                  title="Confirm Deletion"
                  description="Deleting this entry cannot be undone. Do you want to proceed?"
                  onConfirm={() => deleteNode(nodeDatum)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined
                    className="text-red-700 ml-6"
                    style={{ cursor: "pointer" }}
                  />
                </Popconfirm>
              )}
            </div>
          </div>
          {isLoadingNode && (
            <Spin
              tip="Loading..."
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            />
          )}

          {hasChildren && (
            <div>
              <g transform="translate(0, 30)" className="flex-col items-center">
                <div className="flex items-center space-x-2 w-11/12">
                  <input
                    type="text"
                    value={newNodeTitle}
                    onChange={(e) => setNewNodeTitle(e.target.value)}
                    maxLength={70}
                    placeholder="Enter new node title"
                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                  />
                  <input
                    type="text"
                    value={newNodeDescription}
                    onChange={(e) => setNewNodeDescription(e.target.value)}
                    placeholder="Enter new node description"
                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                  />

                  <PlusCircleOutlined
                    className="text-green-600"
                    onClick={handleAddChildNode}
                  />
                </div>
              </g>
            </div>
          )}
        </foreignObject>
      )}
    </g>
  );
};

export default NodeElement;
