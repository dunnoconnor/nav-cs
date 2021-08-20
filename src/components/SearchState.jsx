import React from 'react';

function SearchState({handleChange,stateCode}) {
    
    const stateAbbreviations = [
        'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
    ];

    return (
        <div className="row">
            <label htmlFor="stateCode">Select State:</label>
            <select id="stateCode" onChange={handleChange} value={stateCode}>
            {stateAbbreviations.map(i => (
                <option key={i} value={i}>{i}</option>
            ))} 
            </select>
        </div>
    );
}

export default SearchState;