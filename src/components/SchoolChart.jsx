import React from 'react';
import { Chart } from "react-google-charts";

function SchoolChart({acceptanceRate}) {
    
    if(!acceptanceRate){
        return(
            <div></div>
        )
    } else {
    return (

        <Chart     
            width={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Status', "%"],
              ['Accepted', (acceptanceRate)],
              ['Declined', (100-acceptanceRate)]
            ]}
            options={{
                title: `Acceptance Rate ${acceptanceRate}%`,
              // Just add this option
              pieHole: 0.4,
            }}
            rootProps={{ 'data-testid': '3' }}
        />
            

    );
    }
}

export default SchoolChart;