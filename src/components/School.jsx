import React from 'react';

function School({school}) {
    return (
        <div className="School">
            <p>{school.name}</p>
        </div>
    );
}

export default School;