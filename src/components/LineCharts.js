import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '11/14',
    uv: 4000,
    pv: 2400,
  },
  {
    name: '11/15',
    uv: 3000,
    pv: 1398,
  },
  {
    name: '11/16',
    uv: 2000,
    pv: 9800,
  },
  {
    name: '11/17',
    uv: 2780,
    pv: 3908,
  },
  {
    name: '11/18',
    uv: 1890,
    pv: 4800,
  },
];

const LineCharts = () => {
    return (
      <ResponsiveContainer width="30%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
        >
          <XAxis dataKey="name" tick={{ fill: 'black' }}/>
          <Tooltip />
          <Line type="linear" dataKey="pv" stroke="#a41f1f" />
          <Line type="linear" dataKey="uv" stroke="#3b583b" />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default LineCharts;