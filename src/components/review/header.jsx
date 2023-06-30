import React from "react";

const Header = ({title}) => {
    return (
        <header>
            <h1 id="review-title" className="right-90">{title}</h1>
            
        </header>
    )
    }
Header.defaultProps = {
    title: 'Review'
}
export default Header;
