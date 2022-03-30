//학습하기의 문제풀기:결과보기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";
import '../App.css';
import { NavLink } from "react-router-dom";
import HomeIcon from '../image/HomeIcon.png';
import ReviewIcon from '../image/ReviewIcon.png';
import Right from '../image/Right.png';
import Wrong from '../image/Wrong.png';
import axios from "axios"

//요약문 및 어휘문제 전반적인 해설 박스
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw-20px;
  background-color: #e5e5e5;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
`;

//'어휘문제 정답' 인덱스의 정답 박스
const AnswerBox = styled.div`
  display: flex;
  align-items: center;
  width: 80vw-10px;
  background-color: #e5e5e5;
  border: none;
  padding-right: 10px;
  margin-bottom: 10px;
`;

//홈, 오답노트 아이콘 박스
const IconBox =  styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//지문이해도 텍스트(name(사용자 이름)을 요소로 전달받음)
class Subject extends Component{
  render(){
    return (
      <header>
        <h1 style={{display:"inline"}}>'{this.props.name}'</h1>
        <h3 style={{display:"inline"}}>님의 지문 이해도는</h3>
      </header>
    );
  }
}

function ContentBox(props) {
    return (
      <div style={{position: "relative"}}>
        <div style={{position: "absolute", left: "-20px", top: "-15px"}}>
          {props.isCorrect ? 
          <img alt="" src ={Right} width='50px' height='50px' /> : 
          <img alt="" src ={Wrong} width='50px' height='50px' />}
        </div>
        {props.question}
        <TextBox>{props.content}</TextBox>
        <div style={{display: "flex", justifyContent: 'center', width: "80vw-10px", marginBottom: '10px'}}>
          {props.choice}
        </div>
        <TextBox>{props.comment}</TextBox>
      </div>
    );
}


//메인함수
function Step4 () {
  const [Article_comprehension, setArticle_comprehension] = useState(' ');
  const [Title, setTitle] = useState(' ');
  const [Summary, setSummary] = useState(' ');
  const state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step4', title: '4단계', desc: '결과보기', type: 0},
    ]
  }
    
  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/Step4`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setTitle(response.data['title']);
    setArticle_comprehension(response.data['article_comprehension']);
    setSummary(response.data['summary'])
  },[]);
    
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={state.contents} title = {Title} prev={"Study"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw', marginTop: '3vw'}}>
          <div style={{width: '80vw'}}>
            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', alignItems: 'center',width: '70vw'}}>
                <Subject name="이화연"></Subject>
                <div style={{width: '80px', height: '80px', 
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', backgroundColor: '#94c973',
                borderRadius: '50%', fontSize: '32px'}}>
                  {Article_comprehension}%
                </div> {/*지문이해도 값*/}
              </div>
              <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between', width: '10vw'}}>
                <NavLink to="/" style={{color: 'black', textDecoration: 'none'}}>
                  <IconBox><img alt="" src ={HomeIcon} width='50px' height='50px' />홈</IconBox> {/*홈 아이콘*/}
                </NavLink>
                <NavLink to="/Review" style={{color: 'black', textDecoration: 'none'}}>
                  <IconBox><img alt="" src ={ReviewIcon} width='50px' height='50px' />오답노트</IconBox> {/*오답노트 아이콘*/}
                </NavLink>
              </div>
            </div>
            <div className='pointer'>요약문 정답</div>
            <TextBox>{Summary}</TextBox>
            <AnswerBox><div className='pointer' style={{marginRight: '20px'}}>어휘문제 정답</div>
              1. ③ 2. (1)-(C), (2)-(D), (3)-(A), (4)-(E), (5)-(B)  3. ④  4. 해설참조
            </AnswerBox>
            <ContentBox question = "1. 문제" content = "문제 내용" choice = "문제 보기" comment = "문제 해설" isCorrect = {0} />
            <ContentBox question = "2. 문제" content = "문제 내용" choice = "문제 보기" comment = "문제 해설" isCorrect = {1} />
          </div>
        </div>
      </div>
    );
}

export default Step4;