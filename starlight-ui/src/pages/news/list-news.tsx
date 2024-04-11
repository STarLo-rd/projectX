import React from "react";
const ListNews: React.FC = ({ articles }) => {
  console.log(articles);
  return (
    <>
      {articles &&
        articles.map((article, index) => (
          <a
            key={index}
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-6 rounded-lg overflow-hidden shadow-md hover:shadow-lg"
          >
            <img
              alt="News"
              className="rounded-lg w-full h-auto"
              height="150"
              src={article?.image_url}
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width="150"
            />
            <div className="flex items-center text-sm text-gray-500 my-2">
              <img
                src={article?.source_icon}
                className="w-4 h-4 text-red-600 mr-2"
              />
              <span>{article?.pubDate}</span>
            </div>
            <h3 className="font-semibold">{article?.title}</h3>
            <p className="text-gray-500 mb-4">{article?.description}</p>
          </a>
        ))}
    </>
  );
};

export default ListNews;
