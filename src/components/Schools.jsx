import React, { useState, useEffect } from 'react';
import School from './School';

function Schools() {
    
    const searchOptions = {
        key: process.env.REACT_APP_CSC_KEY,
        api: 'https://api.data.gov/ed/collegescorecard/v1',
        endpoint: '/schools'
      };
      
      const [schools, setSchools] = useState([]);
    
      useEffect(() => {
        getSchools();
      }, []);
    
      function getSchools() {
        const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}`;
        fetch(url)
          .then(response => response.json())
          .then(response => {
            setSchools(response.results);
            console.log(response.results);
          })
          .catch(console.error);
      }
      
    
    return (
        <div className="Schools">
            {schools.map(school => (
                <School key={school.id} school={school.school} />
        ))}   
        </div>
    );
}

export default Schools;