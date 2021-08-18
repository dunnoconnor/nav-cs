import React, { useState, useEffect } from 'react';
import School from './School';

function Schools({resetSearch, searchProperties}) {
    
    const searchOptions = {
        key: process.env.REACT_APP_CSC_KEY,
        api: 'https://api.data.gov/ed/collegescorecard/v1',
        major: 'latest.programs.cip_4_digit.code=1107',
        state: searchProperties.stateCode,
        per_page: '25',
        sort: 'latest.admissions.admission_rate.overall',
        fields: [
          'id',
          'school.name',
          'school.state',
          'latest.programs.cip_4_digit.code',
          'latest.programs.cip_4_digit.title',
          'latest.admissions.admission_rate.overall'
        ],
        endpoint: '/schools.json'
      };
      
      const [schools, setSchools] = useState(null);
    
      useEffect(() => {
        getSchools();
      }, []);
    
      function getSchools() {
        const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&per_page=${searchOptions.per_page}&school.state=${searchOptions.state}&${searchOptions.major}&sort=${searchOptions.sort}&fields=${searchOptions.fields.join()}`;
        //const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}`;
        fetch(url)
          .then(response => response.json())
          .then(response => {
            setSchools(response.results);
            console.log(response.results);
          })
          .catch(console.error);
      }
      
      if(schools===null){
        return(
          <div>Loading Results...</div>
        )
      } else{
    
    return (
        <div className="Schools">
          <button className="return-button" onClick={resetSearch}>{`\u003C`} Return to Search</button>
            {schools.map(i => (
                <School key={i.id} id={i.id} name={i['school.name']} state={i['school.state']} acceptance={i['latest.admissions.admission_rate.overall']}/>
        ))}   
        </div>
        );
            }
}

export default Schools;