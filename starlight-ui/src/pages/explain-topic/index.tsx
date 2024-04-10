/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Input, notification } from "antd";
import AxiosInstance from "../../services/axios-instance";
import { getAuthorizationHeader } from "../../utils/utils";
import { Skeleton, Typography } from "antd";

const ExplainTopic: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState("");
  const [summarizedData, setSummarizedData] = useState("");
  const [loading, setLoading] = useState(false);

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
      const compiledText = data.data
        .replace(/\*\*(.*?)\*\*/g, (_, p1) => p1)
        .replace(/\n\n/g, "\n");
      setData(compiledText);
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
      <div>
        <Input
          placeholder="Enter your complex topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="primary" onClick={handleTopicSubmit}>
          Submit Topic
        </Button>
      </div>
      <div>
        {loading && <Skeleton active paragraph={{ rows: 8 }} />}
        {!loading && data && (
          <div>
            <h2>{topic}</h2>
            <p>{data}</p>
            <Button type="primary" onClick={handleSummarize}>
              Summarize
            </Button>
          </div>
        )}
        {summarizedData && (
          <div>
            <h2>Summarized Data</h2>
            <p>{summarizedData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplainTopic;
