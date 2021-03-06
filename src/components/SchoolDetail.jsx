import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SchoolMap  from './SchoolMap'
import SchoolChart from './SchoolChart';

function SchoolDetail({match}) {
    //object storing relevant parameters for api call
    const detailSearchProperties = {
        key: process.env.REACT_APP_CSC_KEY,
        api: 'https://api.data.gov/ed/collegescorecard/v1',
        id: match.params.id,
        major: 'latest.programs.cip_4_digit.code=1101,1102,1107',
        credential: 'latest.programs.cip_4_digit.credential.level=2,3',
        per_page: '1',
        fields: [
          'id',
          'school.city',
          'school.state',
          'location.lat',
          'location.lon',
          'latest.student.size',
          'latest.cost.avg_net_price.public',
          'latest.cost.avg_net_price.private',
          'latest.aid.federal_loan_rate',
          'latest.programs.cip_4_digit',
          'latest.admissions.admission_rate.overall',
          'latest.admissions.sat_scores.average.overall',
          'latest.admissions.act_scores.midpoint.cumulative'
        ],
        endpoint: '/schools.json'
      };
    //state storing the cs program returned by the api call
    const [program, setProgram] = useState(null);
    //load schools list on component mount
    useEffect(() => {
        getSchoolDetail();
      }, []);
    //api fetch request
    function getSchoolDetail() {
      const url = `${detailSearchProperties.api}${detailSearchProperties.endpoint}?api_key=${detailSearchProperties.key}&per_page=${detailSearchProperties.per_page}&id=${detailSearchProperties.id}&${detailSearchProperties.major}&${detailSearchProperties.credential}&fields=${detailSearchProperties.fields.join()}`;
      fetch(url)
        .then(response => response.json())
        .then(response => {
          //store response data relevant to the school and to the specific program
          let thisSchool = response.results[0];
          let thisProgram = thisSchool['latest.programs.cip_4_digit'][(thisSchool['latest.programs.cip_4_digit'].length-1)];
          //store public or private costs and convert to usd
          let costReport = (thisSchool['latest.cost.avg_net_price.public'] ? thisSchool['latest.cost.avg_net_price.public'] : thisSchool['latest.cost.avg_net_price.private']);
          if(costReport){
              costReport = costReport.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              });
          }
          //store median earnings and convert to usd
          let salaryReport = thisProgram.earnings.highest['2_yr'].overall_median_earnings;
          if (salaryReport) {
              salaryReport = salaryReport.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              });
          } else {
              salaryReport = "unreported";
          }
          //convert relevant api data to object properties for easieer access
          let programProfile = {
              id : thisSchool.id,
              name : thisProgram.school.name,
              city : thisSchool['school.city'],
              state : thisSchool['school.state'],
              lat : thisSchool['location.lat'],
              lon : thisSchool['location.lon'],
              type : thisProgram.school.type,
              size : thisSchool['latest.student.size'],
              cost : costReport,
              aid : (thisSchool['latest.aid.federal_loan_rate']*100).toFixed(2),
              credential : thisProgram.credential.title,
              title : thisProgram.title.substring(0, thisProgram.title.length - 1),
              salary : salaryReport,
              graduates : thisProgram.counts.ipeds_awards2,
              acceptanceRate : (parseFloat(thisSchool['latest.admissions.admission_rate.overall'])*100),
              satScore : thisSchool['latest.admissions.sat_scores.average.overall'],
              actScore : thisSchool['latest.admissions.act_scores.midpoint.cumulative']
          };
          //store program profile object in state
          setProgram(programProfile);
        })
        .catch(console.error);
    }
    //guard operator displays program after api response
    if(program===null){
      return(
        <div>Loading Results...</div>
      )
    } else{
      return (
        <div>
            <Link className="new-search" to="/"> New Search </Link>
            
            <div className="SchoolDetail">
              <div className="banner">
                <h3>{program.name}</h3>
              </div>
                <SchoolMap key={program.id} name={program.name} lat={program.lat} lon={program.lon} />
                <p>{program.city}, {program.state}</p>
                <p>{program.type}</p>
                <p>{program.size} undergraduates</p>
                <br/>
                <p>Average Annual Net Cost: {program.cost}</p>
                <p>Receiving Federal Loans: {program.aid} %</p>
                <br/>
                <SchoolChart acceptanceRate={program.acceptanceRate}/>
                <p>Average SAT Score: {program.satScore}</p>
                <p>Average ACT Score: {program.actScore}</p>
              <div className="banner">
                <h4>{program.credential} in {program.title}</h4>
              </div>
                  <p className="program-detail"><span className="bold">{program.graduates}</span> CS graduates annually</p>
                  <p className="program-detail">Median post-graduate salary: <span className="bold">{program.salary}</span></p>
              </div>
          </div>
        );
    }
}

export default SchoolDetail;