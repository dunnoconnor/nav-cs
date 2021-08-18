import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className="Header">
            <div className="row">
                <Link to='/'>
                <h1>{`\u003C`}nav-cs{`\u003E`}</h1>
                </Link>
                <h2 className="menu">{`\u2630`}</h2>
            </div>
            <div className="row">
                <p>find your computer science degree</p>
            </div>
        </div>
    );
}

export default Header;