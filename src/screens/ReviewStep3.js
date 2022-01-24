//오답노트의 문제풀기:어휘풀기
import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Choice from '../components/Choice';
import MultipleChoice from '../components/MutipleChoice';
import ShortAnswer from '../components/ShortAnswer';
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";
//메인 함수
class ReviewStep3 extends Component {
  state = {
    contents: [
      {id: 'ReviewStep1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'ReviewStep2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'ReviewStep3', title: '3단계', desc: '어휘풀기', type: 0},
      {id: 'ReviewStep4', title: '4단계', desc: '결과보기', type: 1},
    ],
  }
  render() {
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={this.state.contents}  prev={"Review"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>          
            <div className='pointer'>틀린 문제</div>
          </div>
          <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Choice/>  {/*객관식 문제*/}
            <MultipleChoice/> {/*동음이의어 문제*/}
            <ShortAnswer/> {/*주관식 문제*/}
          </div>
          <div style={{width: '80vw', display: 'flex', justifyContent: 'end'}}>
            <NavLink to="/Review/ReviewStep4">
              <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
            </NavLink> {/*다음 단계 버튼*/}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewStep3;