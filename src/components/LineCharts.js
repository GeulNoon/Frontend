//학습결과 정답률 그래프
import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

//임시 데이터
const data = [
  {
    name: '11/14',
    Step2: 80,
    Step3: 75,
    Step4: 88,
  },
  {
    name: '11/15',
    Step2: 77,
    Step3: 100,
    Step4: 83,
  },
  {
    name: '11/16',
    Step2: 85,
    Step3: 50,
    Step4: 90,
  },
  {
    name: '11/17',
    Step2: 96,
    Step3: 80,
    Step4: 85,
  },
  {
    name: '11/18',
    Step2: 90,
    Step3: 80,
    Step4: 75,
  },
];

const LineCharts = (props) => {
    return (
      <ResponsiveContainer width="30%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={props.data}
        >
          <XAxis dataKey="day" tick={{ fill: 'black' }}/>
          <Tooltip />
          <Line type="linear" dataKey="avg1" stroke="#a41f1f" name="Step2"/>
          <Line type="linear" dataKey="avg2" stroke="#3b583b" name="Step3"/>
          <Line type="linear" dataKey="avg3" stroke="#00008b" name="Step4"/>
        </LineChart>
      </ResponsiveContainer>
    );
}

export default LineCharts;