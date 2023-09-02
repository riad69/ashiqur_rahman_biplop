/* eslint-disable react/prop-types */

import { LineChart, Line } from "recharts";


function Rechart({rechart}) {
    const data = rechart.map(r => {
        return {
            name: `${r?.id}`,
            NotComplitedToDeal: r?.deal_status == 0 && r?.deal_status ,
            ComplitedToDeal: r?.deal_status == 1 && r?.deal_status,
          }
    })
    
    
  return (
    <LineChart width={300} height={100} data={data}>
      <Line type="monotone" dataKey="ComplitedToDeal" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  );
}

export default Rechart;
