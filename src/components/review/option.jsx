import React from "react"
const Option = ({text,value}) => {
    console.log('text =', text,' value =',value)
    return (
        <option value={value} >
            {text}
        </option>
    )
}

export default Option
