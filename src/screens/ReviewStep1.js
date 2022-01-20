import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 80vh;
  background-color: #e5e5e5;
  font-size: 11px;
  border: none;
  margin-bottom: 20px;
`;

class ReviewStep1 extends Component {
  state = {
    contents: [
      {id: 'ReviewStep1', title: '1단계', desc: '전문보기', type: 0},
      {id: 'ReviewStep2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'ReviewStep3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'ReviewStep4', title: '4단계', desc: '결과보기', type: 1},
    ]
  }
  render() {
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={this.state.contents} prev={"Review"}/>
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw', marginBottom: '20px'}}>          
            <div className='pointer'>틀린 문제</div>
          </div>
          <TextBox>기사 전문</TextBox>
          <div style={{width: '80vw', display: 'flex', justifyContent: 'end'}}>
            <NavLink to="/Review/ReviewStep2">
              <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewStep1;
