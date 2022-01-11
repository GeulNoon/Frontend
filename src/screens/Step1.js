import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";

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


class Step1 extends Component {
  state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 0},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step4', title: '4단계', desc: '결과보기', type: 1},
    ]
  }
  render() {
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={this.state.contents}/>
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>          
            <Subject title="1단계: 전문보기" sub="기사의 전문을 읽어봅시다."></Subject>
          </div>
          <TextBox>기사 전문</TextBox>
        </div>
      </div>
    );
  }
}

export default Step1;
