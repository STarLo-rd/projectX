import React from "react";
import "./index.css";

const TreeSkeleton = () => {
  return (
    <div className="tree-skeleton">
      <div className="node"></div>
      <div className="branch">
        <div className="node"></div>
        <div className="branch">
          <div className="node"></div>
          <div className="branch">
            <div className="node"></div>
            <div className="leaf"></div> {/* New Leaf */}
          </div>
          <div className="branch">
            <div className="node"></div>
            <div className="leaf"></div> {/* New Leaf */}
          </div>
        </div>
        <div className="leaf"></div> {/* New Leaf */}
      </div>
      <div className="branch">
        <div className="node"></div>
        <div className="branch">
          <div className="node"></div>
          <div className="leaf"></div> {/* New Leaf */}
        </div>
      </div>
    </div>
  );
};

export default TreeSkeleton;
