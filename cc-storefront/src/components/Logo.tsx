import React from "react";

const Logo: React.FC = () => {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }} // This ensures it scales to fit the parent
    >
      <text
        x="0"
        y="30"
        fill="black"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="30"
        letterSpacing="5"
      >
        C2S
      </text>
    </svg>
  );
};

export default Logo;
