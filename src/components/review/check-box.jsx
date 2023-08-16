import React,{useContext} from "react";
import SelectedDataContext from "../contexts/selected-data-context";


function CheckBox({ id, text, toggleProp}) {
    const {isItemSelected} = useContext(SelectedDataContext)
   
        
    return (
        
            <div className="row">
                <div className="right-75">
                    <label value={id} className="checkbox">
                        <input
                            type="checkbox"
                            id={id}
                            onClick={()=>  isItemSelected(id)}
                            onChange={() =>{
                                toggleProp(id)
                            }}
                            className="checkbox">
                        </input>
                        <span className="checkbox">{text}</span>
                    </label>
                </div>
            </div>
        
    );
}

export default CheckBox;
