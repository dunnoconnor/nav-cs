import React, { useState } from 'react';
import SearchState from './SearchState';
import SearchZip from './SearchZip';

function Search({resolveSearch}) {
    
    const initialState = {
        locationType : 'state',
        stateCode : 'MA',
        zipcode : "01609",
        range : "10mi",
        sortTerm : 'admissionsRate',
        degree : '2,3'
    };

    const [formState, setFormState] = useState(initialState);

    const handleChange = (event) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        resolveSearch(formState);
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
                
                <label htmlFor="degree">Degree:</label>
                <select id="degree" onChange={handleChange} value={formState.degree}>
                    <option value='2,3'>Bachelors or Associates</option>
                    <option value='3'>Bachelors</option>
                    <option value='2'>Associates</option>
                </select>
            </div>

            <div className="row">
                <label htmlFor="locationType">Filter Location by:</label>
                <select id="locationType" onChange={handleChange} value={formState.locationType}>
                    <option value='state'>State</option>
                    <option value='zipcode'>Zipcode</option>
                </select>
            </div>

            {(formState.locationType==='state' ? <SearchState handleChange={handleChange} stateCode={formState.stateCode}/> : <SearchZip handleChange={handleChange} zipcode={formState.zipcode} range={formState.range}/>)}

            <button type="submit">Search</button>
        </form>

    );
}

export default Search;