import React, { useState } from 'react';

function Search({resolveSearch}) {
    
    const initialState = {
        stateCode: 'MA',
        sortTerm : 'admissionsRate',
        degree : '2,3'
    };

    const stateAbbreviations = [
        'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
    ];

    const [formState, setFormState] = useState(initialState);

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        resolveSearch(formState);
        console.log(formState)
        setFormState(initialState);
    };

    return (
        <form className ="Form" onSubmit={handleSubmit}>

            <div className="row">
                <label htmlFor="sortTerm">Sort by:</label>
                <select id="sortTerm" onChange={handleChange} value={formState.sortTerm}>
                    <option value='acceptanceRate'>Most Selective</option>
                    <option value='salary'>Highest Post-Graduate Salary</option>
                    <option value='graduates'>Largest CS Program</option>
                    <option value='cost'>Lowest Annual Cost</option>
                </select>
            </div>

            <div className="row">
                
                <label htmlFor="degree">Filter by Degree:</label>
                <select id="degree" onChange={handleChange} value={formState.degree}>
                    <option value='2,3'>Bachelors or Associates</option>
                    <option value='3'>Bachelors</option>
                    <option value='2'>Associates</option>
                </select>
            </div>

            <div className="row">
                
                <label htmlFor="stateCode">Filter by State:</label>
                <select id="stateCode" onChange={handleChange} value={formState.stateCode}>
                {stateAbbreviations.map(i => (
                    <option key={i} value={i}>{i}</option>
                ))} 
                </select>
            </div>


            <button type="submit">Search</button>
        </form>

    );
}

export default Search;