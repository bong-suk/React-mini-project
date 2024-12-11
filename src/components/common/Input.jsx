import React from "react";

const Input = ({ label, type = "text", value, onChange, error, ...props }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? "input-error" : ""}`}
        {...props}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
