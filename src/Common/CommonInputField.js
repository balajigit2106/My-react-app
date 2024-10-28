import React from "react";
import { Input } from "antd";
import "./commonstyles.css";

const CommonInputField = ({
  label,
  placeholder,
  onChange,
  name,
  value,
  error,
  maxLength,
  mandatory,
  style,
  addonAfter,
  prefix,
  className,
  type,
  suffix,
}) => {
  return (
    <div style={style} className="commonInputfield_container">
      {label && (
        <div style={{ display: "flex" }}>
          <label className="commonfield_label">{label}</label>
          {mandatory ? (
            <p style={{ color: "red", marginLeft: "4px", margin: 0 }}>*</p>
          ) : (
            ""
          )}
        </div>
      )}
      <Input
        // className={`commonInputfield ${className}`}
        className={`${
          error === "" || error === null || error === undefined
            ? "common_inputfield"
            : "common_errorinputfield"
        } ${className}`}
        label={label}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        mandatory={mandatory}
        error={error}
        status={error ? "error" : ""}
        maxLength={maxLength}
        addonAfter={addonAfter}
        prefix={prefix}
        type={type}
        suffix={suffix}
      />
      <div
        className={
          error
            ? "commoninput_errormessage_activediv"
            : "commoninput_errormessagediv"
        }
      >
        <p style={{ color: "rgb(255, 77, 79)", marginTop: "2px", margin: 0 }}>
          {label + error}
        </p>
      </div>
    </div>
  );
};
export default CommonInputField;
