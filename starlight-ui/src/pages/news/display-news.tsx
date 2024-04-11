import React from "react";

const DisplayNews: React.FC = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Latest News</h1>
          <p className="text-lg text-center text-gray-600">
            Stay updated with the latest news from around the world
          </p>
        </header>
        <main>
          <article className="mb-8">
            <img
              alt="From Rural Web Developer to Globally Renowned eCommerce Coach: The Story of Jeffrey Schipper"
              className="w-full h-48 bg-gray-200 object-cover mb-4"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/200",
                objectFit: "cover",
              }}
              width="600"
            />
            <h2 className="text-2xl font-bold mb-2">
              From Rural Web Developer to Globally Renowned eCommerce Coach: The
              Story of Jeffrey Schipper
            </h2>
            <p className="text-gray-700 mb-4">
              Jeffrey Schipper is a co-founder and co-owner of the premier
              business coaching platform Ecom Education specializing in helping
              students kickstart their business adventures. Jeffrey is
              internationally recognized among the most successful webshop
              coaches across all compass points.
            </p>
            <a className="text-blue-500 hover:underline" href="#">
              Read more
            </a>
          </article>
        </main>
      </div>
    </div>
  );
};

export default DisplayNews;
