//학습결과 정답률 그래프
import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

//임시 데이터
const data = [
  {
    name: '11/14',
    Step2: 80,
    Step3: 75,
  },
  {
    name: '11/15',
    Step2: 77,
    Step3: 100,
  },
  {
    name: '11/16',
    Step2: 85,
    Step3: 50,
  },
  {
    name: '11/17',
    Step2: 96,
    Step3: 80,
  },
  {
    name: '11/18',
    Step2: 90,
    Step3: 80,
  },
];

const LineCharts = (props) => {
    return (
      <ResponsiveContainer width="30%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
        >
          <XAxis dataKey="name" tick={{ fill: 'black' }}/>
          <Tooltip />
          <Line type="linear" dataKey="Step2" stroke="#a41f1f" />
          <Line type="linear" dataKey="Step3" stroke="#3b583b" />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default LineCharts;