//학습하기의 문제풀기:어휘풀기
import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Choice from '../components/Choice';
import MultipleChoice from '../components/MutipleChoice';
import ShortAnswer from '../components/ShortAnswer';
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";

//어휘문제 제목 글씨(title(제목)과 sub(설명)을 요소로 전달받음)
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
class Step3 extends Component {
  state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 0},
      {id: 'Step4', title: '4단계', desc: '결과보기', type: 1},
    ],
  }
  render() {
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={this.state.contents} prev={"Study"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>
            <Subject title="3단계: 지문 속 어휘 공부하기" sub="다양한 어휘 문제를 풀며 본문 속 어휘의 정확한 뜻을 습득해봅시다."></Subject>
          </div>
          <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Choice/> {/*객관식 문제*/}
            <MultipleChoice/> {/*동음이의어 문제*/}
            <ShortAnswer/> {/*주관식 문제*/}
          </div>
          <div style={{width: '80vw', display: 'flex', justifyContent: 'end'}}>
            <NavLink to="/Study/Step4">
              <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
            </NavLink> {/*다음 단계 버튼*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Step3;