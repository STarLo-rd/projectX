import React, { useRef } from "react";
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      onSubmit;
      if (textAreaRef.current) {
        textAreaRef.current.blur(); // Remove focus from the input field
      }
    }
  };

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
            ref={textAreaRef}
            className="mx-auto w-full h-12 p-3 pr-10 bg-gray-100 text-gray-800"
            placeholder={placeholder}
            autoSize={{ minRows: 2, maxRows: 6 }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onPressEnter={onSubmit}
            onKeyDown={handleKeyDown}
            style={{ width: "100%", minWidth: "300px", maxWidth: "100%", overflow: "hidden" }}          />
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
        <div className="animated-bg">
          <div className="inner"></div>
        </div>
      </div>
      <style>{`
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, #fff, #fff 20%, #f0f0f0 80%, #fff 100%);
          overflow: hidden;
        }

        .inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #8BC6EC, #9599E2);
          animation: animateBg 30s ease infinite;
        }

        .inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) 14.9%, transparent 15%),
            radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6) 14.9%, transparent 15%),
            radial-gradient(circle at 0% 100%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6) 14.9%, transparent 15%),
            radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6) 14.9%, transparent 15%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3) 29.9%, transparent 30%);
          background-size: 400% 400%;
          background-position: 0% 50%;
          animation: animateBgRadials 10s ease infinite;
        }

        .inner::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0 10px, rgba(255, 255, 255, 0.2) 10px 20px);
          animation: animateBgLines 15s linear infinite;
        }

        @keyframes animateBg {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.5);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes animateBgRadials {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes animateBgLines {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(50%, 50%) rotate(90deg);
          }
          50% {
            transform: translate(0, 100%) rotate(180deg);
          }
          75% {
            transform: translate(-50%, 50%) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroSection;
