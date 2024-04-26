import React from 'react';
import './index.css';


const StepSkeleton = () => {
  return (
    <div className="step">
      <div className="node">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="connector vertical"></div>
    </div>
  );
};

const BranchSkeleton = () => {
  return (
    <div className="branch">
      <div className="node">
        <div className="line"></div>
      </div>
      <div className="connector vertical"></div>
      <div className="children">
        <StepSkeleton />
        <StepSkeleton />
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton">
      <div className="graph">
        <div className="node">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="connector vertical"></div>
        <div className="node">
          <div className="line"></div>
        </div>
        <div className="connector vertical"></div>
        <div className="node">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="connector vertical"></div>
        <div className="node">
          <div className="line"></div>
        </div>
        <div className="connector vertical"></div>
        <div className="node">
          <div className="line"></div>
        </div>
        <div className="connector horizontal"></div>
        <div className="node">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="connector vertical"></div>
        <div className="node">
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;