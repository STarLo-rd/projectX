import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-12  bg-red-10 p-6 rounded-lg">
        <div className="text-gray-600">
          <p className="uppercase text-sm tracking-widest">Stay up to date</p>
          <h1 className="text-3xl font-bold my-2">
            Craft narratives
            <span className="text-[#bd1e59]">✍️</span> that ignite inspiration
            <span className="text-[#bd1e59]"> ,knowledge 🔍</span>
            <span className="text-[#bd1e59]">📚</span>, and entertainment
            <span className="text-[#bd1e59]">🎬</span>
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;
