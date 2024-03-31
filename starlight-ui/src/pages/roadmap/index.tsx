import React from "react";
import "reactflow/dist/style.css";
import RoadMap from "./generate-roadmap";

const Roadmaps: React.FC = () => {
  return (
    <div>
      <h1>Your Roadmaps</h1>
      <div>
        <RoadMap />
      </div>
    </div>
  );
};

export default Roadmaps;
