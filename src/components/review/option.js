import React from "react"
const Option = ({text,value}) => {
    return (
        <option value={value} >
            {text}
        </option>
    )
}

export default Option
