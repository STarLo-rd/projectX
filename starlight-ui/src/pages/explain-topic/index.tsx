/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, notification } from "antd";
import AxiosInstance from "../../services/axios-instance";
import { getAuthorizationHeader } from "../../utils/utils";
import { Skeleton } from "antd";
import IntroSection from "../../components/templates/intro-section";
import Markdown from "react-markdown";
const ExplainTopic: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState([]);
  const [summarizedData, setSummarizedData] = useState("");
  const [loading, setLoading] = useState(false);

  const [showHeading, setShowHeading] = useState(true);

  useEffect(() => {
    if (data) {
      setShowHeading(false);
    } else {
      setShowHeading(true);
    }
  }, [data]);

  const handleTopicSubmit = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.post(
        "/explain/topic",
        { interest: topic },
        {
          headers: getAuthorizationHeader(),
        }
      );
      const { data } = response;
      console.log(data);
      // const compiledText = data.data
      //   .replace(/\*\*(.*?)\*\*/g, (_, p1) => p1)
      //   .replace(/\n\n/g, "\n");
      const lines = data.data.split("\n");
      console.log(lines);
      const compiledText = data.data.replace(/\n/g, "\n\n");
      setData(lines);
      setLoading(false);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleSummarize = async () => {
    try {
      const response = await AxiosInstance.post(
        "/explain/summarize",
        { data },
        {
          headers: getAuthorizationHeader(),
        }
      );
      const { data: summarizedData } = response;
      console.log(summarizedData);
      setSummarizedData(summarizedData.summary_text);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleRequestError = (error: any) => {
    notification.error({ message: error.message });
  };

  return (
    <div>
      <IntroSection
        title="Generate. Learn. Refine."
        description="Enter a topic or data and let the magic happen. Our AI will generate amazing content to help you understand even the most complex topics."
        placeholder="Enter your topic or data"
        value={topic}
        onChange={setTopic}
        onSubmit={handleTopicSubmit}
        showHeading={showHeading}
      />

      <Divider />
      {/* //   session2 */}

      <div className="container mx-auto px-4 py-2">
        {loading && (
          <div className="bg-white p-6 rounded-lg shadow">
            <Skeleton active paragraph={{ rows: 8 }} />
          </div>
        )}

        {!loading && data && (
          <div className="bg-white p-6 rounded-lg shadow">
            {/* <h2 className="text-2xl font-bold mb-4">{topic}</h2> */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 md:text-5xl ">
              {topic}
            </h2>

            <div>
              {data.map((line, index) => (
                <Markdown key={index}>{line}</Markdown>
              ))}
            </div>

            {/* <Markdown>{data}</Markdown> */}
            <Button
              type="primary"
              onClick={handleSummarize}
              // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Summarize
            </Button>
          </div>
        )}

        {summarizedData && (
          <div className="bg-white p-6 rounded-lg shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">Summarized Data</h2>
            <p className="text-gray-700">{summarizedData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplainTopic;
