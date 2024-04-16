import { Checkbox, Spin } from "antd";
import { useState } from "react";

const NodeElement = ({
  nodeDatum,
  toggleNode,
  handleNodeClick,
  selectedNode,
  updateCompletionStatus,
}) => {
  const [isLoadingNode, setIsLoadingNode] = useState(false);

  const handleClick = async () => {
    toggleNode();
    if (nodeDatum.name && !nodeDatum.children) {
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
          nodeDatum.isCompleted
            ? "#03c303"
            : nodeDatum.children
            ? "orange"
            : "black"
        }
        onClick={handleClick}
      />
      <text
        fill="black"
        strokeWidth="0.7"
        x={15}
        onClick={handleClick}
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
          width={380}
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
              {!nodeDatum?.children && (
                <Checkbox
                  checked={nodeDatum.isCompleted}
                  onChange={(e) =>
                    updateCompletionStatus(nodeDatum, e.target.checked)
                  }
                >
                  {nodeDatum.isCompleted ? "Completed" : "Mark as Completed"}
                </Checkbox>
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
        </foreignObject>
      )}
    </g>
  );
};

export default NodeElement;
