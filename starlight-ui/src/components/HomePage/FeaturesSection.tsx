import { useEffect, useRef } from "react";
// import { BsBoxes, BsClipboardData, BsGraphUp } from 'react-icons/bs';
import {
  DeploymentUnitOutlined,
  ForkOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Container from "../Container";
import FeaturesItem from "./FeaturesItem";

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isCurrent = location.hash == "#features";

  useEffect(() => {
    if (!isCurrent || !ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
    window.location.hash = "#";
  }, [isCurrent, ref.current]);

  return (
    <Container
      className="flex max-w-6xl flex-col items-center px-24 py-24"
      ref={ref}
      id="features"
    >
      <h2 className="mb-32 text-center text-4xl font-bold">
        Explore Our Features
      </h2>
      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3">
        <FeaturesItem icon={<ForkOutlined />} title="AI-Powered Roadmaps">
          <span className="spanningElements">Personalized Learning paths</span>
          <br />
          Generate custom roadmaps tailored to your goals. Track progress and
          add custom nodes for a personalized learning experiences.
        </FeaturesItem>
        <FeaturesItem icon={<GlobalOutlined />} title="Personalized News Feed">
          <span className="spanningElements">Stay informed, Stay ahead</span>
          <br />
          Recieve curated news and updates based on your interests and domain
          expertise. Stay with technologically informed and ahead of the curve.
        </FeaturesItem>
        <FeaturesItem
          icon={<DeploymentUnitOutlined />}
          title="Simplify Complex Topic"
        >
          <span className="spanningElements">Demystify Learning</span>
          <br />
          Utilized prompt engineering to simplify complex topics. Gains insights
          through analogy-based explanations and engaging storytelling.
        </FeaturesItem>
      </div>
    </Container>
  );
}
export default FeaturesSection;
