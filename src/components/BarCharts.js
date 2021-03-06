//학습결과 학습횟수 그래프
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

//임시 데이터
const data = [
  {
    name: '11/14',
    value: 4,
  },
  {
    name: '11/15',
    value: 3,
  },
  {
    name: '11/16',
    value: 2,
  },
  {
    name: '11/17',
    value: 2,
  },
  {
    name: '11/18',
    value: 1,
  },

];

const BarCharts = (props) => {
    const [focusBar, setFocusBar] = useState(null);
    return (
      <ResponsiveContainer width="30%" height="80%">
        <BarChart
          width={100}
          height={300}
          data={props.data}
          onMouseMove={state => {
            if (state.isTooltipActive) {
              setFocusBar(state.activeTooltipIndex);
            } else {
              setFocusBar(null);
            }
          }}
        >
          <XAxis dataKey="day" tick={{ fill: 'black' }}/>
          <Tooltip cursor={{ fill: "white"}} />
          <Bar dataKey="cnt" name="학습 횟수">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={focusBar === index ? '#3f613f' : '#eff0ef'} />
          ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
}

export default BarCharts;