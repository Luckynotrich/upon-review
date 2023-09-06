import React from "react";

const Header = ({title,ID}) => {
    return (
        <header>
            <h2 id={ID} className="header-title">{title}</h2>
            
        </header>
    )
    }
Header.defaultProps = {
    title: 'Future Self'
}
export default Header;
