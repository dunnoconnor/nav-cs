import React from 'react';

function SearchZip({handleChange, zipcode, range}) {
    return (
        <div className="row">
            <input
                id="zipcode"
                type="text"
                placeholder="zipcode"
                title="5 digit postal code"
                pattern="[0-9]{5}"
                onChange={handleChange}
                value={zipcode}
            />
            
            <select id="range" onChange={handleChange} value={range}>
                <option value='10mi'>{`\u003C`} 10 m</option>
                <option value='20mi'>{`\u003C`} 20 m</option>
                <option value='50mi'>{`\u003C`} 50 m</option>
                <option value='100mi'>{`\u003C`} 100 m</option>
                <option value='250mi'>{`\u003C`} 250 m</option>
            </select>
            <label htmlFor="zipcode"></label>
            
        </div>
    );
}

export default SearchZip;