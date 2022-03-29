//학습하기의 문제풀기:전문보기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";
import axios from "axios"

//전문 박스
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 80vh;
  background-color: #e5e5e5;
  font-size: 22px;
  border: none;
  margin-bottom: 20px;
  padding: 10px;
  line-height: 1.2;
  white-space: pre-wrap;
`;

//전문보기 제목 글씨(title(제목)과 sub(설명)을 요소로 전달받음)
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
function Step1 () {
  const [Article, setArticle] = useState(' ');
  const state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 0},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step4', title: '4단계', desc: '결과보기', type: 1},
    ]
  }

  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/Step1`);
    setArticle(response.data);
    console.log(Article.content);
  },[]);

    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={state.contents} title = {Article.title} prev={"Study"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw', marginTop: '3vw'}}>
          <div style={{width: '80vw'}}>          
            <Subject title="1단계: 전문보기" sub="기사의 전문을 읽어봅시다."></Subject>
          </div>
          <TextBox>{Article.content}</TextBox>
          <div style={{width: '80vw', display: 'flex', justifyContent: 'end'}}>
            <NavLink to="/Study/Step2">
              <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
              </NavLink> {/*다음 단계 버튼*/}
          </div>
        </div>
    </div>
  );

}

export default Step1;
