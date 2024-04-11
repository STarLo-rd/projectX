import React from "react";
import UserInterestNews from "./user-interest-news";
import DisplayNews from "./display-news";
import Header from "./header";
import Banner from "./banner";
import ListNews from "./list-news";

const News: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto my-8">
      <Header />
      <Banner />
      {/* <ListNews /> */}
      <UserInterestNews />
    </div>
  );
};

export default News;
