import React from "react"
import Option from "./option.jsx"

const Select = ({ categories, onSelect, key}) => {
    return (
        <>
            <div className='selectCat'>
                <label htmlFor='selectCat'>choose </label>
                <select name="selectCat" id="selectCat" onChange={onSelect}>
                    <option value="" defaultValue>Choose a Category</option>
                    {categories && categories.map((option) => (
                        <Option
                            text={option.name}
                            value={option.id}
                            key={option.id}
                         />))}

                </select>
            </div>
        </>

    )
}

export default Select
