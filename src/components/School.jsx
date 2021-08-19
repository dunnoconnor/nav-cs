import React from 'react';
import { Link } from 'react-router-dom';

function School({school}) {
    let salaryReport = toUSD(school.salary);
    let costReport = toUSD(school.cost);
    
    function toUSD(num){
        if (num) {
        return num.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        });
      } else {
          return "unreported";
        }
    }

    return (
        <div className="card">
            <Link to={`/${school.id}`} key={school.id} id={school.id}>
                <div className="School">
                    <p className="bold">{school.name}</p>
                        <p className="school-location">{school.city}, {school.state}</p>
                        <p className="school-listing"><span className="bold">{school.graduates}</span> Computer Science Graduates Annually</p>
                        <p className="school-listing">{school.credential}</p>
                        <p className="school-listing">Average Annual Net Cost: {costReport}</p>
                        <p className="school-listing">Median Postgraduate Salary: <span className="bold">{salaryReport}</span></p>
                </div>
            </Link>
        </div>
    );
}

export default School;