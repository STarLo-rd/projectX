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
      <text fill="gray" color="lightgrey" strokeWidth="0.7" x={15} dy={20}>
        {nodeDatum.description}
      </text>
    )}
  </g>
);
