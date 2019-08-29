import React from "react";
import styles from "./Input.module.css";

const input = props => {
  let inputElement = null;
  let inputStyles = [styles.inputElement];

  if(props.invalid && props.shouldValidate && props.touched){
      inputStyles.push(styles.invalid);
  }

  inputStyles = inputStyles.join(' ');
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputStyles}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputStyles}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputStyles} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputStyles}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={styles.input}>
      <label className={styles.label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
