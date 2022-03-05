//어휘풀기 동음이의어 뜻 매칭 문제
import React, { useState } from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';
//npm install @mui/material @emotion/react @emotion/styled

const MultipleChoice = (props) => {
    //임시 데이터(동음이의어 뜻 개수에 따라 수가 바뀌어야 함)
    const [selectList, setSelectList] = useState([
        {id: 'A', value: ''},
        {id: 'B', value: ''},
        {id: 'C', value: ''},
        {id: 'D', value: ''},
        {id: 'E', value: ''},
      ]);
    ///선택한 번호 콘솔창에 출력(선택한 값 저장용 함수)
    const handleChange = (e) => {
        //console.log(`선택한 값 : ${e.target.name}${e.target.value}`);
        setSelectList(selectList.map(sl => sl.id === e.target.name ? {...sl, value: e.target.value} : sl))
        props.setAnswer(props.answer.map(ans => ans.id === props.id 
            ? {...ans, value: selectList.map(sl => sl.id === e.target.name ? {...sl, value: e.target.value} : sl)
                                        .map(sl => sl.value)}
            : ans))
    };
      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            <div style={{
                width: '80vw',
                paddingTop: 10,
                paddingBottom: 10,
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: '#e5e5e5',
                whiteSpace: 'pre'}}>
                    {`사무실의 방충망이 낡아서 파손되었다면 세입자와 사무실을 빌려 준 건물주 중 누가 고쳐야 할까?\n이 경우, 민법전의 법조문에 의하면 임대인인 건물주가 수선할 의무를 진다.\n그러나 사무실을 빌릴 때, 간단한 파손은 세입자가 스스로 해결한다는 내용을 계약서에 포함하는 경우도 있다.\n`}
                    {`지다\n`}
                    {`(A) 어떤 현상이나 상태가 이루어지다.\n(B) 불이 타 버려 사위어 없어지거나 빛이 희미하여지다.\n(C) 어떤 좋지 아니한 관계가 되다.\n(D) 물건을 짊어서 등에 얹다.\n(E) 책임이나 의무를 맡다.`}
            </div>{/*문제 보기*/}
            위 지문의 ‘지다’는 다의어이다. 각 문장에 사용된 ‘지다’의 의미로 알맞은 것을 고르시오.{/*문제 제시문*/}
            <div style={{
                width: '80vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: 'pre',
                lineHeight: '250%'}}>
                {`(1) 동료와 원수를 진 관계가 되다.\n(2) 배낭을 등에 지다.\n(3) 나무 아래에 그늘이 지다.\n(4) 당신은 당신이 한 말에 책임을 져야 합니다.\n(5) 모닥불이 지면서 조금씩 한기를 느끼기 시작했다.`}
                {/*문제 보기*/}
                <div style={{
                    display:'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 50,
                }}>
                {selectList.map((j) => (
                    <FormControl key={j.id} component="fieldset">
                        <RadioGroup
                        row
                        aria-label="select"
                        defaultValue=""
                        name={j.id}
                        onChange={handleChange}
                        >  
                            {selectList.map((value, i) => (
                                <div key={i} style={{width: '50px'}}>
                                    <FormControlLabel value={value.id} control={<Radio color= "success" size="small" onChange={handleChange} />} label={value.id} />
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