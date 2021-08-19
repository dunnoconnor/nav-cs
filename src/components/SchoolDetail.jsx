import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SchoolDetail({match}) {

    const detailSearchProperties = {
        key: process.env.REACT_APP_CSC_KEY,
        api: 'https://api.data.gov/ed/collegescorecard/v1',
        id: match.params.id,
        major: 'latest.programs.cip_4_digit.code=1107',
        credential: 'latest.programs.cip_4_digit.credential.level=2,3',
        per_page: '1',
        fields: [
          'id',
          'school.city',
          'school.state',
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

    const [program, setProgram] = useState(null);

    useEffect(() => {
        getSchoolDetail();
      }, []);
    
      function getSchoolDetail() {
        const url = `${detailSearchProperties.api}${detailSearchProperties.endpoint}?api_key=${detailSearchProperties.key}&per_page=${detailSearchProperties.per_page}&id=${detailSearchProperties.id}&${detailSearchProperties.major}&${detailSearchProperties.credential}&fields=${detailSearchProperties.fields.join()}`;
        fetch(url)
          .then(response => response.json())
          .then(response => {
            
            let thisSchool = response.results[0];
            let thisProgram = thisSchool['latest.programs.cip_4_digit'][0];

            let costReport = thisSchool['latest.cost.avg_net_price.public'];
            if(!costReport){
              costReport = thisSchool['latest.cost.avg_net_price.private'];
            }
            
            if(costReport){
              costReport = costReport.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              });
            }

            let salaryReport = thisProgram.earnings.highest['2_yr'].overall_median_earnings;

            if (salaryReport) {
              salaryReport = salaryReport.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              });
            
            } else {
                salaryReport = "not reported";
              }
              
            let programProfile = {
              id : thisSchool.id,
              name : thisProgram.school.name,
              city : thisSchool['school.city'],
              state : thisSchool['school.state'],
              type : thisProgram.school.type,
              size : thisSchool['latest.student.size'],
              cost : costReport,
              aid : (thisSchool['latest.aid.federal_loan_rate']*100).toFixed(2),
              credential : thisProgram.credential.title,
              title : thisProgram.title.substring(0, thisProgram.title.length - 1),
              salary : salaryReport,
              graduates : thisProgram.counts.ipeds_awards2,
              acceptanceRate : (thisSchool['latest.admissions.admission_rate.overall']*100).toFixed(2),
              satScore : thisSchool['latest.admissions.sat_scores.average.overall'],
              actScore : thisSchool['latest.admissions.act_scores.midpoint.cumulative']
            };

            setProgram(programProfile);
            console.log(programProfile);
          })
          .catch(console.error);
      }
      if(program===null){
        return(
          <div>Loading Results...</div>
        )
      } else{
          return (
            <div>
                <Link to="/">Back to Search Results</Link>
                <div className="SchoolDetail">
                  <div className="banner">
                    <h3>{program.name}</h3>
                  </div>
                    <p>{program.city}, {program.state}</p>
                    <p>{program.type}</p>
                    <p>{program.size} undergraduates</p>
                    <br/>
                    <p>Average Annual Net Cost: {program.cost}</p>
                    <p>Receiving Federal Loans: {program.aid} %</p>
                    <br/>
                    <p>Acceptance Rate: {program.acceptanceRate} %</p>
                    <p>Average SAT Score: {program.satScore}</p>
                    <p>Average ACT Score: {program.actScore}</p>
                  <div className="banner">
                    <h4>{program.credential} in {program.title}</h4>
                  </div>
                    <p>{program.graduates} CS graduates annually</p>
                    <p>Median post-graduate salary: {program.salary}</p>
                </div>
            </div>
            );
          }
}

export default SchoolDetail;