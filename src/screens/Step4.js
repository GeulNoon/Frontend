//학습하기의 문제풀기:결과보기
import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";
import '../App.css';
import { NavLink } from "react-router-dom";
import HomeIcon from '../image/HomeIcon.png';
import ReviewIcon from '../image/ReviewIcon.png';

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

//메인함수
class Step4 extends Component {
  state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step4', title: '4단계', desc: '결과보기', type: 0},
    ]
  }
  render() {
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={this.state.contents} prev={"Study"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>
            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', alignItems: 'center',width: '70vw'}}>
                <Subject name="이화연"></Subject>
                <div style={{width: '80px', height: '80px', 
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', backgroundColor: '#94c973',
                borderRadius: '50%', fontSize: '32px'}}>
                  92%
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
            <TextBox>창조 도시는 인재들을 위한 문화 및 거주 환경의 창조성이 풍부하며, 혁신적이고도 유연한 경제 시스템을 구비하고 있는 도시이다.</TextBox>
            <TextBox>창조 도시의 주된 동력을 창조 산업으로 보는 관점에서는 창조 산업이 도시에 인적·사회적·문화적·경제적 다양성을 불어넣음으로써 도시의 재구조화를 가져오고 나아가 부가가치와 고용을 창출한다고 주장한다.</TextBox>
            <AnswerBox><div className='pointer' style={{marginRight: '20px'}}>어휘문제 정답</div>
              1. ③ 2. (1)-(C), (2)-(D), (3)-(A), (4)-(E), (5)-(B)  3. ④  4. 해설참조
            </AnswerBox>
          </div>
        </div>
      </div>
    );
  }
}

export default Step4;