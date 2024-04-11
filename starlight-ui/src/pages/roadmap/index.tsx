import React from "react";
import "reactflow/dist/style.css";
import RoadMap from "./generate-roadmap";

const Roadmaps: React.FC = () => {
  return (
    <div>
      <div>
        <RoadMap />
      </div>
    </div>
  );
};

export default Roadmaps;
