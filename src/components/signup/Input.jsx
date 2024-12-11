import React from "react";

function Input({ label, type, value, onChange, ...rest }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default Input;
