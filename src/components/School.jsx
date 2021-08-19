import React from 'react';
import { Link } from 'react-router-dom';

function School({school}) {
    let salaryReport = school.salary;
    if (salaryReport) {
        salaryReport = salaryReport.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        });
      } else {
          salaryReport = "not reported";
        }

    return (
        <div className="card">
            <Link to={`/${school.id}`} key={school.id} id={school.id}>
                <div className="School">
                    <p className="school-name">{school.name}</p>
                        <p className="school-detail">{school.city}, {school.state}</p>
                        <p className="school-detail">{school.graduates} Computer Science Majors</p>
                        <p className="school-detail">{school.credential}</p>
                        <p className="school-detail">Median Postgraduate Salary: {salaryReport}</p>
                </div>
            </Link>
        </div>
    );
}

export default School;