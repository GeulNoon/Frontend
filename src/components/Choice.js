//어휘풀기 객관식 문제(뜻 매칭 등)
import React, { useState, Component, useEffect} from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';

const json = 
    {
        "TYPE1": "다음 단어 중 빈칸에 들어갈 수 있는 단어를 고르시오.",
        "WORD": "우려",
        "TEST1": "집값 상승에 대한 ____의 목소리가 높아지고 있다.",
        "MEAN": "근심하거나 걱정함. 또는 그 근심이나 걱정.",
        "W2VWORD": [
                "염려",
                "초래",
                "위험",
                "의심"
        ],
        "W2VMEAN": [
                "앞으로 생길 일에 대해 불안해하고 걱정함. 또는 그런 걱정.",
                "어떤 결과를 가져오게 함.",
                "해를 입거나 다칠 가능성이 있어 안전하지 못함. 또는 그런 상태.",
                "불확실하게 여기거나 믿지 못하는 마음."
        ]
}

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
    });

      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            {props.type === 1 ? '다음 단어 중 빈칸에 들어갈 수 있는 단어를 고르시오.' : '다음 단어 중 주어진 사전적 의미에 부합하는 단어를 고르시오.'}
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
  
  export default Choice;