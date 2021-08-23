import React, { useState, useEffect } from 'react';
import School from './School';

function Schools({resetSearch, searchProperties}) {
  //set location variable based on locationType in searchProperties
  let location = "";
  if(searchProperties.locationType==='state'){
    location = (`school.state=${searchProperties.stateCode}`);
  } else {
    location =(`zip=${searchProperties.zipcode}&distance=${searchProperties.range}`)
  }
  //object storing relevant parameters for api call
  const searchOptions = {
    key: process.env.REACT_APP_CSC_KEY,
    api: 'https://api.data.gov/ed/collegescorecard/v1',
    major: 'latest.programs.cip_4_digit.code=1101,1102,1107',
    credential: searchProperties.degree,
    location : location,
    per_page: '50',
    sort: 'latest.admissions.admission_rate.overall',
    fields: [
      'id',
      'school.name',
      'school.city',
      'school.state',
      'latest.cost.avg_net_price.public',
      'latest.cost.avg_net_price.private',
      'latest.admissions.admission_rate.overall',
      'latest.programs.cip_4_digit'
    ],
    endpoint: '/schools.json'
  };
  //state storing schools list
  const [schools, setSchools] = useState(null);
  //load schools list on component mount
  useEffect(() => {
    getSchools();
  }, []);
  //api fetch request
  function getSchools() {
    const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&per_page=${searchOptions.per_page}&${searchOptions.location}&${searchOptions.major}&latest.programs.cip_4_digit.credential.level=${searchOptions.credential}&sort=${searchOptions.sort}&fields=${searchOptions.fields.join()}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        createSchoolsArray(response.results);
      })
      .catch(console.error);
  }
  //convert relevant api data to array of objects
  function createSchoolsArray(results){
    let schoolResults = [];
    //map through response results, converting to object properties for easier access
    results.map(i => (
      schoolResults.push(
        {
        id : i.id,
        name : i['school.name'],
        city : i['school.city'],
        state : i['school.state'],
        cost : (i['latest.cost.avg_net_price.public'] ? i['latest.cost.avg_net_price.public'] : i['latest.cost.avg_net_price.private']),
        acceptanceRate : i['latest.admissions.admission_rate.overall'],
        graduates : i['latest.programs.cip_4_digit'][(i['latest.programs.cip_4_digit'].length-1)].counts.ipeds_awards2,
        title : i['latest.programs.cip_4_digit'][(i['latest.programs.cip_4_digit'].length-1)].title,
        credential : i['latest.programs.cip_4_digit'][(i['latest.programs.cip_4_digit'].length-1)].credential.title,
        salary : i['latest.programs.cip_4_digit'][(i['latest.programs.cip_4_digit'].length-1)].earnings.highest['2_yr'].overall_median_earnings
      }
      )));
      //filter schools to remove programs with no graduates
      const filteredResults = schoolResults.filter(s => s.graduates>1);
      sortSchoolsArray(filteredResults, searchProperties.sortTerm);
  }
  //sort schools by criterea specified in the search form
  function sortSchoolsArray(array, sortTerm){
    if(sortTerm === 'acceptanceRate' || sortTerm === 'cost'){
      array.sort((a, b) => (a[sortTerm] > b[sortTerm] ? 1 : -1));
    } else {
      array.sort((a, b) => (a[sortTerm] > b[sortTerm] ? -1 : 1));
    }
    //store array of schools in state
    setSchools(array);
  }

  //guard operator displays program after api response
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