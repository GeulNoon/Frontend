//어휘풀기 동음이의어 뜻 매칭 문제
import React, { useState, useEffect } from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';
//npm install @mui/material @emotion/react @emotion/styled

const MultipleChoice = (props) => {
    //임시 데이터(동음이의어 뜻 개수에 따라 수가 바뀌어야 함)
    const [choice, setChoice] = useState([]);  
    const [mean, setMean] = useState([]);  
    ///선택한 번호 콘솔창에 출력(선택한 값 저장용 함수)
    const handleChange = (e) => {
        //console.log(`선택한 값 : ${e.target.name}${e.target.value}`);
        props.setUseranswer(props.userAnswer.map(sl => sl.id.toString() === e.target.name ? {...sl, value: e.target.value} : sl))   
        props.setAnswer(props.answer.map(ans => ans.id === props.id 
            ? {...ans, value: props.userAnswer.map(sl => sl.id.toString() === e.target.name ? {...sl, value: e.target.value} : sl)
                                        .map(sl => sl.value)}
            : ans))
    };
    useEffect(async () => {
        if(props.choice)
            setChoice(props.choice);
        if(props.mean)
            setMean(props.mean);
    });
      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            <div style={{
                width: '80vw',
                paddingTop: 10,
                paddingBottom: 10,
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                backgroundColor: '#e5e5e5',
                whiteSpace: 'pre-wrap'}}>
                    {props.sentence}<br/>
                    <h4>{props.word}</h4>
                {mean.map((i,j) => <p key = {i} style={{margin:0}}>{j+". "+ i}</p>)}
            </div>{/*문제 보기*/}
            {props.question}
           {/*문제 제시문*/}
            <div style={{
                width: '80vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: 'pre',
                lineHeight: '250%'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {choice.map((i,j) => <p key = {i} style={{margin:0}}>{j+'. '+i}</p>)}
                </div>
                {/*문제 보기*/}
                <div style={{
                    display:'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 50,
                }}>
                    {choice.map((value,i) => (
                    <FormControl key={i} component="fieldset">
                        <RadioGroup
                        row
                        aria-label="select"
                        defaultValue=""
                        name={i.toString()}
                        onChange={handleChange}
                        >  
                            {mean.map((value, i) => (
                                <div key={i} style={{width: '50px'}}>
                                    <FormControlLabel value={value} control={<Radio color= "success" size="small" onChange={handleChange} />} label={i} />
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                ))}
                </div>
            </div>
          </div>
      );
  }
  
  export default MultipleChoice;