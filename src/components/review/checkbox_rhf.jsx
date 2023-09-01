// checkbox_rhf.jsx
import React from "react";
import { useController } from "react-hook-form";

export default function Checkbox({ prop, control, name }) {
    const { field } = useController({
        control,
        name,
      });
  const [value, setValue] = React.useState(field.value || []);
  
  return (
    <div className="row">
      <div className="right-75">
        {/* <label
          key={prop.id + 1}
          htmlFor={"prosChecked"}
          value={prop}
          className="checkbox"
        > */}
          <input
            name={name}
            type="checkbox"
            className="checkbox"
            id={prop.id}
      
            value={prop.id}
            // onClick={() => toggleProp(prop.id)}
            onChange={(e) => {
              let valueCopy = value;
              // update checkbox value
             valueCopy = e.target.checked ? e.target.value : null;
              // send data to react hook form
              field.onChange(valueCopy);
              // update local state
              setValue(valueCopy);
            }}
          />
          <span key ={prop.id + 10}className="checkbox">{prop.value}</span>
        {/* </label> */}
      </div>
    </div>
  );
}
