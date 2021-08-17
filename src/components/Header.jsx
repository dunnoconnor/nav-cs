import React from 'react';

function Header(props) {
    return (
        <div className="Header">
            <div className="row">
                <h1>nav-cs</h1>
                <h2 className="menu">{`\u2630`}</h2>
            </div>
            <div className="row">
                <p>find your computer science degree</p>
            </div>
        </div>
    );
}

export default Header;