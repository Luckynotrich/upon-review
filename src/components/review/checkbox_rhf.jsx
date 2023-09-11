// checkbox_rhf.jsx
import React,{useContext} from "react";
import { useController } from "react-hook-form";
import SelectedDataContext from '../contexts/selected-data-context';


export default function Checkbox({ prop, control, name }) {
  const { toggleProp, isItemSelected } = useContext(SelectedDataContext);
    const { field } = useController({
        control,
        name,
      });
  const [value, setValue] = React.useState(field.value || []);
  
  return (
    <div className="row">
      <div className="right-75">
        
          <input
            name={name}
            type="checkbox"
            className="checkbox"
            id={prop.id}
            onClick={() => toggleProp(prop.id)}
            value={prop.id}
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
