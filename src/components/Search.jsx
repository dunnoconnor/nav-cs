import React, { useState } from 'react';

function Search({resolveSearch}) {
    const initialState = {
        stateCode: 'MA'
    };

    const stateAbbreviations = [
        'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
    ];

    // const cipCodes = [
    //     {title: "Computer and Information Sciences", code:"1101"},
    //     {title: "Computer Programming", code:"1102"},
    //     {title: "Computer Science", code:"1107"},
    //     {title: "Computer Engineering", code:"1409"},
    // ];

    const [formState, setFormState] = useState(initialState);

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        resolveSearch(formState.stateCode);
        setFormState(initialState);
    };

    return (
        <form className ="Form" onSubmit={handleSubmit}>
            <div className="row">
                
                <label htmlFor="stateCode">Filter by State:</label>
                <select id="stateCode" onChange={handleChange} value={formState.stateCode}>
                {stateAbbreviations.map(i => (
                    <option key={i} value={i}>{i}</option>
                ))} 
                </select>
            
            <button type="submit">Search</button>
            </div>
        </form>

    );
}

export default Search;