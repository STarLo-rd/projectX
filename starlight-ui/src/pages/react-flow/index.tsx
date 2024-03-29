import React, { useEffect, useState } from "react";
import "reactflow/dist/style.css";
import Graphs from "./data-visualization";

const ReactFlowPage: React.FC = () => {
  return (
    <>
      <h1>React Flow</h1>
      <div>
        <Graphs />
      </div>
    </>
  );
};

export default ReactFlowPage;
