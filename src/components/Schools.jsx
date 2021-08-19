import React, { useState, useEffect } from 'react';
import School from './School';

function Schools({resetSearch, searchProperties}) {
    
    const searchOptions = {
        key: process.env.REACT_APP_CSC_KEY,
        api: 'https://api.data.gov/ed/collegescorecard/v1',
        major: 'latest.programs.cip_4_digit.code=1107',
        credential: 'latest.programs.cip_4_digit.credential.level=2,3',
        state: searchProperties.stateCode,
        per_page: '25',
        sort: 'latest.admissions.admission_rate.overall',
        fields: [
          'id',
          'school.name',
          'school.city',
          'school.state',
          'latest.programs.cip_4_digit'
        ],
        endpoint: '/schools.json'
      };
      
      const [schools, setSchools] = useState(null);
    
      useEffect(() => {
        getSchools();
      }, []);
    
      function getSchools() {
        const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&per_page=${searchOptions.per_page}&school.state=${searchOptions.state}&${searchOptions.major}&${searchOptions.credential}&sort=${searchOptions.sort}&fields=${searchOptions.fields.join()}`;
        fetch(url)
          .then(response => response.json())
          .then(response => {
            
            let schoolResults = [];
            
            response.results.map(i =>(
              schoolResults.push({
                id : i.id,
                name : i['school.name'],
                city : i['school.city'],
                state : i['school.state'],
                graduates : i['latest.programs.cip_4_digit'][0].counts.ipeds_awards2,
                title : i['latest.programs.cip_4_digit'][0].title,
                credential : i['latest.programs.cip_4_digit'][0].credential.title,
                salary : i['latest.programs.cip_4_digit'][0].earnings.highest['2_yr'].overall_median_earnings
              })

            ));

            setSchools(schoolResults);
            console.log(schoolResults);
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
                <School 
                  key={i.id}
                  school={i}
                />
        ))}   
        </div>
        );
            }
}

export default Schools;