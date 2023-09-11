// check-list.jsx
import React from 'react';
import CheckBox from './checkbox_rhf';
// import { useController } from 'react-hook-form';

export default function CheckList({
  control,
  propArr,
  propArrCount,
  name,
}) {

  return (
    <div>
      <fieldset>
        <div className="row">
          <div className="procon-label">
            <h4>{name}</h4>
          </div>
        </div>
        <div className="left-25">
          {propArr.map((prop,i) => (
            <CheckBox
              control={control}
              name={`propArray[${propArrCount + i}]`}
              prop={prop}
              key={prop.id}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
