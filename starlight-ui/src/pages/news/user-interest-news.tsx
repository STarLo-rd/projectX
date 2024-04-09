/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Input, Card, Typography, Space, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ results: Article[] }>(
          "https://newsdata.io/api/1/news",
          {
            params: {
              apiKey: "pub_41485a751a20da677765a206b5537b348292b",
              q: userInterest,
              language: "en",
            },
          }
        );
        setArticles(response.data.results);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [userInterest]);

  const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInterest(event.target.value);
  };

  return (
    <Layout>
      <Header style={{ background: "#001529", padding: "1rem 2rem" }}>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          News Based on Your Interest
        </Title>
      </Header>
      <Content style={{ padding: "2rem" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Enter your interest"
            value={userInterest}
            onChange={handleInterestChange}
            prefix={<SearchOutlined />}
            style={{ maxWidth: "600px" }}
          />
          {loading ? (
            <Spin size="large" tip="Loading news..." />
          ) : (
            <Space direction="vertical" style={{ width: "100%" }}>
              {articles.map((article, index) => (
                <Card
                  key={index}
                  hoverable
                  cover={
                    article.image_url ? (
                      <img
                        alt={article.title}
                        src={article.image_url}
                        style={{ objectFit: "cover", height: "250px" }}
                      />
                    ) : null
                  }
                >
                  <Card.Meta
                    title={
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    }
                    description={
                      <>
                        <Text>{article.description}</Text>
                        <br />
                        <Text type="secondary">
                          Source: {article.source.name} | Published:{" "}
                          {article.pubDate}
                        </Text>
                      </>
                    }
                  />
                </Card>
              ))}
            </Space>
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default UserInterestNews;
