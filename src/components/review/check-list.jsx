import React, {useContext} from 'react';
import CheckBox from './check-box';
import SelectedDataContext  from "../contexts/selected-data-context";


function CheckList({ name, propArray }) {
    const {toggleProp} = useContext(SelectedDataContext)
    
    return (
        <div>
            <div className="row">
                <div className="right-90">
                    <h2>{name}</h2>
                </div>
            </div>
            <div className="left-25">
            
                    {propArray.map((prop) => (
                        <CheckBox
                            text={prop.value}
                            key={prop.id}
                            id={prop.id}
                            toggleProp={toggleProp}
                        />
                    ))}
                
            </div>
        </div>
    );
}

export default CheckList;