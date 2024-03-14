import React from 'react';
import style from "./InputField.module.css";

const InputField = ({ label, type, value, onChange, name, errors }) => (
  <div className={style[`div${name.charAt(0).toUpperCase() + name.slice(1)}`]}>
    <label className={style[`label${name.charAt(0).toUpperCase() + name.slice(1)}`]}>{label}</label>
    <input
      className={style[`input${name.charAt(0).toUpperCase() + name.slice(1)}`]}
      type={type}
      value={value}
      onChange={onChange}
      name={name}
    />
    <span className={style[`error${name.charAt(0).toUpperCase() + name.slice(1)}`]}>
      {errors[name + '1'] ? <p>{errors[name + '1']}</p> : <p>{errors[name + '2']}</p>}
    </span>
  </div>
);

export default InputField;