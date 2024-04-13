import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="grid grid-cols-2 gap-8 mb-12">
      <div className="col-span-1">
        <img
          alt="Featured"
          className="rounded-lg w-full h-auto"
          height="300"
          src="/image.png"
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width="400"
        />
      </div>
      <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          {/* <TvIcon className="w-6 h-6 text-red-600 mr-2" /> */}
          <span className="text-sm text-gray-500">12 minutes ago</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          TCG World Proudly Announces Partnership With STYNGR & Downtown
        </h2>
        <p className="text-gray-500 mb-4">
          In partnership with STYNGR, XRP Ledger, and the iconic Downtown is set
          to launch music digital collectibles in Q2 2024 featuring artist
          exclusives, in-world activations, and more LOS ANGELES, April 10, 2024
          – The virtual realm will soon pulse to the rhythm of music. TCG World,
          the fast-growing and immersive Web3 online open world metaverse, […]{" "}
        </p>
        <div className="text-sm text-[#bd1e59]">Movies · 4 min read</div>
      </div>
    </section>
  );
};

export default Banner;
