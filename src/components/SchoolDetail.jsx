import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SchoolDetail({match}) {

    const detailSearchProperties = {
        key: process.env.REACT_APP_CSC_KEY,
        api: 'https://api.data.gov/ed/collegescorecard/v1',
        id: match.params.id,
        per_page: '1',
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

    const [school, setSchool] = useState(null);

    useEffect(() => {
        getSchoolDetail();
      }, []);
    
      function getSchoolDetail() {
        const url = `${detailSearchProperties.api}${detailSearchProperties.endpoint}?api_key=${detailSearchProperties.key}&per_page=${detailSearchProperties.per_page}&id=${detailSearchProperties.id}&fields=${detailSearchProperties.fields.join()}`;
        fetch(url)
          .then(response => response.json())
          .then(response => {
            setSchool(response.results[0]);
            console.log(response.results[0]);
          })
          .catch(console.error);
      }
      if(school===null){
        return(
          <div>Loading Results...</div>
        )
      } else{
          return (
            <div>
                <Link to="/">Back to Search Results</Link>
                <div className="SchoolDetail">
                    <p>{school['school.name']}</p>
                    <p>{school['school.state']}</p>
                    <p>Acceptance Rate: {school['latest.admissions.admission_rate.overall']}</p>
                    
                </div>
            </div>
            );
          }
}

export default SchoolDetail;