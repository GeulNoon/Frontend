//어휘풀기 객관식 문제(뜻 매칭 등)
import React, { useState, Component, useEffect} from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';

const Choice = (props) => {
    //임시 데이터
    const [selectList] = useState(["1","2","3","4","5"]);
    const [example, setexample] = useState(['1', '2', '3', '4', '5']);
    //선택한 번호 콘솔창에 출력(선택한 값 저장용 함수)
    const handleChange = (e) => {
        props.setAnswer(props.answer.map(ans => ans.id === props.id ? {...ans, value: e.target.value} : ans))
    }; 

    useEffect(async () => {
        if(props.example)
            setexample(props.example);
            console.log(example);
    });

      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            1. 다음 단어 중 빈칸에 들어갈 수 있는 단어를 고르시오. {/*문제 제시문*/}
            <div style={{width: '80vw', 
                height: '10vh',
                display:'flex', 
                justifyContent: 'center',
                alignItems: 'center', 
                backgroundColor: '#e5e5e5'}}>
            {props.question}
            </div>{/*문제 보기*/}
            <div style={{
                width: '80vw',
                display:'flex', 
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <FormControl component="fieldset">
                <RadioGroup
                    row
                    aria-label="select"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    {selectList.map((value, i) => (
                    <div style={{width: '100px'}} key={i}>
                        <FormControlLabel value={value} control={<Radio color='success' />} label={example[i]} />
                    </div>
                    ))}
                </RadioGroup>
                </FormControl>{/*선택지*/}
            </div>
          </div>
      );

  }
  
  export default Choice;