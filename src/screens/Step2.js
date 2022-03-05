//학습하기의 문제풀기:요약하기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { DragBlock } from '../components/DragBlock';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";
import axios from "axios"

//문단내용 박스
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 30vh;
  background-color: #e5e5e5;
  font-size: 11px;
  border: none;
`;

//순서배열, 직접작성 선택 버튼
const Button = styled.div`
  display: flex;
  font-weight: norwmal;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  font-size: 14px;
  color: black;
  background-color: white;
  border: 1px solid grey;
`;

//요약하기 제목 글씨(title(제목)과 sub(설명)을 요소로 전달받음)
class Subject extends Component{
  render(){
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

//메인함수
function Step2 () {
  const [Summary, setSummary] = useState([]);
  const [Title, setTitle] = useState('');
  const [isSelected, SetSelected] = useState(false); /*순서배열, 직접작성 중 선택 여부*/
  const state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 0},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step4', title: '4단계', desc: '결과보기', type: 1},
    ]
  }

  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/Step2`);
    setTitle(response.data['title']);
    setSummary(response.data['summary'])
  },[]);

  let Input = null;
  /*isSelected가 true일 시 순서배열, 아닐 시 직접작성*/
  if (isSelected) {
    Input = <DragBlock data={Summary}/>;
  } else {
    Input = <input placeholder='요약하신 문장을 입력해주세요.' 
    style={{width: '80vw', height: '50px', marginTop: 20, backgroundColor: '#f6f6f6', borderWidth: '1px'}}/>;
  }
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={state.contents} title={Title} prev={"Study"}/>  {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>          
            <Subject title="2단계: 요약하기" sub={Summary.summary}></Subject>
          </div>
          <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: '80vw', display:'flex', margin: 10}}>
              <Button onClick={()=>{ SetSelected(true); }} style = {{backgroundColor: (isSelected === true) ? '#5b6d5b':'white', color: (isSelected === true) ? 'white':'black'}}> 순서배열 </Button>
              <Button onClick={()=>{ SetSelected(false); }} style = {{backgroundColor: (isSelected === false) ? '#5b6d5b':'white', color: (isSelected === false) ? 'white':'black'}}> 직접입력 </Button>
            </div>
            {Input}
          </div>
          <div style={{width: '80vw', display: 'flex', justifyContent: 'end'}}>
            <NavLink to="/Study/Step3">
              <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
            </NavLink> {/*다음 단계 버튼*/}
          </div>
        </div>
      </div>
    );
}

export default Step2;