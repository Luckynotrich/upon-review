function SubmitModal() {
    return ( 
    <>
    <div id="shim"></div>
    <div id="msgbx">
        <div id="msg">click &#39Save&#39 to finish</div>
        <div id="parent">
            <div className="saveBtn" onclick="hidePopup()">cancel</div>
            <input className="saveBtn" type="submit" onclick="hidePopup();" value="Save"></input>
        </div>
    </div> 
    </>
    );
    
}

export default SubmitModal;