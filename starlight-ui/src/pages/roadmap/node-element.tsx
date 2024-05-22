export const renderNodeElement = (
  { nodeDatum, toggleNode },
  selectedNode,
  handleNodeClick
) => (
  <g>
    <circle
      r={10}
      fill={nodeDatum.children ? "orange" : "black"}
      onClick={() => {
        toggleNode();
        handleNodeClick(nodeDatum);
      }}
    />
    <text fill="black" strokeWidth="0.7" x={15}>
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
        </div>
      </foreignObject>
    )}
  </g>
);
