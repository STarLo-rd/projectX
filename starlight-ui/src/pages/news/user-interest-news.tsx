/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Input, Typography, Form, Skeleton } from "antd";
import ListNews from "./list-news";
const { Search } = Input;

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface Article {
  title: string;
  description: string;
  url: string;
  image_url: string;
  pubDate: string;
  source: {
    name: string;
  };
}

const UserInterestNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [userInterest, setUserInterest] = useState<string>("web development");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(true);

  const fetchNews = async (query: string) => {
    setLoading(true);
    try {
      setLoading(true);
      console.log(query);
      const response = await axios.get<{ results: Article[] }>(
        "https://newsdata.io/api/1/news",
        {
          params: {
            apiKey: "pub_41485a751a20da677765a206b5537b348292b",
            q: query,
            language: "en",
          },
        }
      );
      console.log(response.data.results);
      setArticles(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews("top news");
  }, []);

  const handleInterestChange = (value: string) => {
    setUserInterest(value);
    fetchNews(value);
  };

  return (
    <>
      <section>
        <Form name="userInterestForm" layout="inline" className="mb-4">
          <Form.Item className="mr-2">
            <Search
              placeholder="Enter your interest"
              onSearch={handleInterestChange}
              enterButton
              loading={loading}
              className="rounded-lg"
            />
          </Form.Item>
        </Form>
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <a className="text-[#bd1e59] text-sm" href="#">
            See all →
          </a>
        </header>
        {loading && <h1>Hello world</h1>}

        <Skeleton loading={loading}>
          <div className="grid grid-cols-3 gap-3">
            <ListNews articles={articles} />
          </div>
        </Skeleton>
      </section>
    </>
  );
};

export default UserInterestNews;
