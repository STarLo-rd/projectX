import { notification } from "antd";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const CelebrationAnimation = ({ completionPercentage }) => {
  const [runConfetti, setRunConfetti] = useState(false);

  useEffect(() => {
    if (completionPercentage === 100) {
      notification.success({
        message: "you completed the roadmap",
        duration: 5,
      });
      setRunConfetti(true);
      setTimeout(() => setRunConfetti(false), 8000); // run confetti for 5 seconds
    }
  }, [completionPercentage]);

  return (
    <>
      {runConfetti && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <Confetti numberOfPieces={400} />
        </div>
      )}
    </>
  );
};
export default CelebrationAnimation;
