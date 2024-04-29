import classNames from "classnames";
import HeroImage from "../../assets/image.png";
import Container from "../Container";
import HomePageActionButtons from "./HomePageActionButtons";

function Hero() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-transparent">
      <Container className="flex flex-col items-center py-28">
        <div className="max-w-2xl text-center">
          <h1 className="bg-clip-text font-extrabold text-gray-900 mb-8 text-3xl md:text-5xl w-full mx-auto tracking-wide leading-tight">
            Embrace the Future of
            <span className="text-primary"> Learning.</span>
            <br />
            Without <span className="text-primary">Fear.</span>
          </h1>
          <p className="mb-14 text-lg md:text-xl">
            Boost Your Learning journey with AI driven roadmaps.Dive into a
            world of knowledge with confidence, backed by human creativity.
          </p>
          <HomePageActionButtons />
        </div>
        <div
          className={classNames(
            "max-w-6xl overflow-hidden rounded-xl border border-gray-200 shadow-xl",
            "mt-36 hidden lg:block"
          )}
        >
          <img src={HeroImage} height={938} width={1868}></img>
        </div>
      </Container>
    </div>
  );
}
export default Hero;
