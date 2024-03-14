import React from 'react';
import style from "./SelectField.module.css";

const SelectField = ({ name, value, onChange, options }) => (
  <div>
    <select
      className={style.selectField}
      multiple
      value={value}
      onChange={onChange}
    >
      {options &&
        options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
    </select>
  </div>
);

export default SelectField;