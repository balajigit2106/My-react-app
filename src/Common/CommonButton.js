import React from "react";
import { Button } from "antd";
import "./commonstyles.css";

const CommonButton = ({ text, type, onClick, disabled, width }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{ width: width }}
      className="commonbutton"
    >
      {text}
    </Button>
  );
};
export default CommonButton;
