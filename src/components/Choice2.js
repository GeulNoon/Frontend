//어휘풀기 객관식 문제(뜻 매칭 등)
import React, { useState, Component, useEffect} from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';

const Choice2 = (props) => {
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
    });

      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            {props.type}
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
                {props.isSubmitted ? 
                <div style={{display: 'flex', justifyContent: 'space-around', width: "50vw", marginLeft: '15vw', marginRight: '15vw', marginBottom: '10px'}}>
                    {example.map((i,j) => props.true_answer === i ?
                    <p key={j} style={{color: 'green'}}>{j+1}. {i}</p> :
                    (props.user_answer === i
                    ? <p key={j} style={{color: 'red'}}>{j+1}. {i}</p>
                    : <p key={j}>{j+1}. {i}</p>))}
                </div> :
                <FormControl component="fieldset">
                <RadioGroup
                    row
                    aria-label="select"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    {example.map((value, i) => (
                    <div style={{width: '125px'}} key={i}>
                        <FormControlLabel value={value} control={<Radio color='success' />} label={example[i]} />
                    </div>
                    ))}
                </RadioGroup>
                </FormControl>}
            </div>
          </div>
      );

  }
  
  export default Choice2;