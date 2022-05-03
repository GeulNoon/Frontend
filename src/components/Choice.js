//어휘풀기 객관식 문제(뜻 매칭 등)
import React, { useState, useEffect } from 'react';
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
    const [example] = useState(["창조", "전망", "가치", "도시", "오염"]);
    //선택한 번호 콘솔창에 출력(선택한 값 저장용 함수)
    const handleChange = (e) => {
        props.setAnswer(props.answer.map(ans => ans.id === props.id ? {...ans, value: e.target.value} : ans))
    }; 
      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            {props.question}
            <div style={{width: '80vw', 
                height: '10vh',
                display:'flex', 
                justifyContent: 'center',
                alignItems: 'center', 
                backgroundColor: '#e5e5e5'}}>
             {props.example}
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
                    {example.map((value, i) => (
                    <div style={{width: '100px'}} key={i}>
                        <FormControlLabel value={value} control={<Radio color='success' />} label={value} />
                    </div>
                    ))}
                </RadioGroup>
                </FormControl>{/*선택지*/}
            </div>
          </div>
      );
  }
  
  export default Choice;