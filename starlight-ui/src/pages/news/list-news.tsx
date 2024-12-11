import React from "react";
import { Image } from "antd";
import noImage from "/image.png"; // Import a default image for when image_url is not available

interface Article {
  title: string;
  description: string;
  url: string;
  image_url: string;
  pubDate: string;
  source_url?: string;
  source_icon: string;
  source: {
    name: string;
  };
}

interface ListNewsProps {
  articles: Article[];
}

const ListNews: React.FC<ListNewsProps> = ({ articles }) => {
  console.log(articles);
  const truncateDescription = (description: string) => {
    const maxLength = 250;

    if (description.length <= maxLength) {
      return description;
    }

    const truncatedDescription = description.slice(0, maxLength);
    return `${truncatedDescription}...`;
  };
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
            <Image
              alt="News"
              className="rounded-lg w-full h-auto"
              height={150}
              src={article.image_url || noImage}
              style={{
                aspectRatio: "150/150",
                objectFit: "cover",
              }}
              width={150}
              preview={false}
            />
            <div className="flex items-center text-sm text-gray-500 my-2">
              <img
                src={article.source_icon || noImage}
                className="w-4 h-4 text-red-600 mr-2"
                alt="Source Icon"
              />
              <span>{article.pubDate}</span>
            </div>
            <h3 className="font-semibold">{article.title}</h3>
            <p className="text-gray-500 mb-4">
              {article.description && truncateDescription(article.description)}
            </p>
          </a>
        ))}
    </>
  );
};

export default ListNews;
