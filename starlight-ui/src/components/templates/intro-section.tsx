import React from "react";
import { Typography, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

interface IntroSectionProps {
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  showHeading: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  title,
  description,
  placeholder,
  value,
  onChange,
  onSubmit,
  showHeading,
}) => {
  return (
    <div className="relative bg-white py-12">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-10">
        <div className="space-y-3 z-10">
          <h1
            className={`text-3xl font-bold tracking-tighter text-gray-800 sm:text-4xl md:text-5xl transition-transform ${
              showHeading ? "translate-y-0" : "-translate-y-6"
            }`}
          >
            {title}
          </h1>
          {showHeading && (
            <Typography className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </Typography>
          )}
        </div>

        <Form
          className={`flex flex-col max-w-sm gap-2 z-10 ${
            showHeading ? "translate-y-0" : "-translate-y-8"
          }`}
        >
          <Input.TextArea
            className="mx-auto w-full h-12 p-3 pr-10 bg-gray-100 text-gray-800"
            placeholder={placeholder}
            autoSize={{ minRows: 2, maxRows: 6 }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: "400px", overflow: "hidden" }}
          />
          <button
            type="submit"
            className="absolute right-2 bottom-2 bg-transparent hover:bg-gray-200 rounded-full p-1 text-gray-600"
            onClick={onSubmit}
          >
            <ArrowRightOutlined className="h-5 w-5 text-gray-600" />
          </button>
        </Form>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animated-bg"></div>
      </div>

      <style>{`
.animated-bg {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: linear-gradient(to bottom, #fff, #fff 20%, #f0f0f0 80%, #fff 100%);
animation: animate 10s linear infinite;
}

.animated-bg::before {
content: '';
position: absolute;
top: 0;
left: 50%;
width: 100%;
height: 100%;
background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.733), transparent);
animation: animate 5s linear infinite;
}

.animated-bg::after {
content: '';
position: absolute;
top: 0;
left: 50%;
width: 100%;
height: 100%;
background: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.733), transparent);
animation: animate 7s linear infinite;
}

@keyframes animate {
0% {
transform: translateX(-100%);
}
100% {
transform: translateX(100%);
}
}
`}</style>
    </div>
  );
};

export default IntroSection;
