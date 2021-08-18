import React from 'react';
import { Link } from 'react-router-dom';

function School({id,name,state,acceptance}) {
    return (
        <div className="card">
            <Link to={`/${id}`} key={id} id={id}>
                <div className="School">
                    <p>{name}, {state}</p>
                </div>
            </Link>
        </div>
    );
}

export default School;