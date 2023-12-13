import React from "react";
import '../header/header.css'

function Header(props) {
    return (
        
        <header><h1>{props.title}</h1>
            <ul>
                <li>{props.subtitle[0]}</li>
                <li>{props.subtitle[1]}</li>
                <li>{props.subtitle[2]}</li>
            </ul>
        </header>
    );
}

export default Header;