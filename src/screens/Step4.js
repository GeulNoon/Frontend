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
        <div style={{display: "flex", justifyContent: 'space-around', width: "50vw", marginLeft: '15vw', marginRight: '15vw', marginBottom: '10px'}}>
          {/*{props.choice}*/}
          <p>1. 창조</p>
          <p style={{color: 'green'}}>2. 전망</p>
          <p style={{color: 'red'}}>3. 가치</p>
          <p>4. 도시</p>
          <p>5. 인재</p>
        </div>
        <TextBox style={{whiteSpace: 'pre-wrap'}}>{props.comment}</TextBox>
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
      {id: 'Step5', title: '4단계', desc: '빈칸풀기', type: 1},
      {id: 'Step4', title: '5단계', desc: '결과보기', type: 0},
    ]
  }

  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    setTitle(response.data['title']);
    console.log(Title);
  },[]);
    
  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/Step4`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setArticle_comprehension(response.data['article_comprehension']);
    setSummary(response.data['summary'])
    console.log(response.data['keyword'])
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
              1. ③ 2. (1)-(C), (2)-(D), (3)-(A), (4)-(E), (5)-(B)  3. ④
            </AnswerBox>
            <ContentBox question = "1. 다음 단어 중 빈칸에 들어갈 수 있는 단어를 고르시오." 
            content = "진수는 미래에 대해 낙관적인 _____를 가지고 있다." 
            //choice = {"1. 창조 2. 전망 3. 가치 4. 도시 5. 인재"}
            comment = {"창조: 전에 없던 것을 처음으로 만들거나 새롭게 이룩함.\n전망: 어떤 곳을 멀리 바라봄. 또는 멀리 바라보이는 경치. \n가치: 값이나 귀중한 정도.\n도시: 정치, 경제, 문화의 중심이 되고 사람이 많이 사는 지역.\n인재: 학식과 능력을 갖추어 사회적으로 크게 쓸모가 있는 사람"}
            isCorrect = {0} />
            <ContentBox question = "2. 문제" content = "문제 내용" choice = "문제 보기" comment = "문제 해설" isCorrect = {1} />
          </div>
        </div>
      </div>
    );
}

export default Step4;