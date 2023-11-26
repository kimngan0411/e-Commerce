import React from "react";

const CustomInput = (props) => {
  const { type, placeholder, className, name,value,onChange,onBlur, disabled } = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        placeholder={placeholder}
        className={`form-control ${className}`}
        // id={i_id}
       
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {/* <label htmlFor={label}>{label}</label> */}
    </div>
  );
};

export default CustomInput;
