import React from 'react'

function LabelTextInput({type, name, handleChange, id, placeholder}) {
    let value
    return (
        <div className="row">
        <label htmlFor={name}>{name}</label>
        <input
          type={type}
          value={value}
          onChange={handleChange(value)}
          aria-describedby={name}
          id={id}
          name={name}
        placeholder={placeholder}
        ></input>
      </div>
    )
}

export default LabelTextInput
