import  { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const CelebrationAnimation = ({ completionPercentage }) => {
  const [runConfetti, setRunConfetti] = useState(false);

  useEffect(() => {
    if (completionPercentage === 100) {
      setRunConfetti(true);
      setTimeout(() => setRunConfetti(false), 8000); // run confetti for 5 seconds
    }
  }, [completionPercentage]);

  return (
    <>
      {runConfetti && <Confetti  numberOfPieces={400}/>}
    </>
  );
};
export default CelebrationAnimation;