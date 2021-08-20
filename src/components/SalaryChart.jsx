import React from 'react';
import { Chart } from "react-google-charts";

function SalaryChart({schools}) {
    const filteredResults = schools.filter(s => s.salary>1);
    console.log(filteredResults);
    const dataArray =[
        ['','avg salary']
    ];

    filteredResults.forEach((s, i) => {
        if(i<6)dataArray.push([s.name,s.salary]);
    });
    
    return (
        <div className="SalaryChart">
        <Chart
            width={'100%'}
            height={'20vh'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={dataArray}
            options={{
                chartArea: { width: '50%' },
                hAxis: {
                minValue: 0,
                },
                vAxis: {
                },
                legend: 'none',
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
        />
        </div>
        
    );
}

export default SalaryChart;