import React from "react";
import "./commonstyles.css";

const CommonInputField = ({
  label,
  name,
  onChange,
  type,
  value,
  error,
  style,
  mandatory,
}) => {
  return (
    <div className="commonInputfield_container" style={style}>
      {label && (
        <div style={{ display: "flex" }}>
          <label className="commonfield_label">{label}</label>
          {mandatory ? (
            <p style={{ color: "red", marginLeft: "4px" }}>*</p>
          ) : (
            ""
          )}
        </div>
      )}
      <input
        className={
          error
            ? "form-control common_errorinputfield"
            : "form-control common_inputfield"
        }
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
      <div
        className={
          error
            ? "commoninput_errormessage_activediv"
            : "commoninput_errormessagediv"
        }
      >
        <p
          style={{
            color: "rgb(255, 77, 79)",
            marginTop: "2px",
            fontSize: "14px",
          }}
        >
          {label + error}
        </p>
      </div>
    </div>
  );
};
export default CommonInputField;
