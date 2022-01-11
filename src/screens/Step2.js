import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { DragBlock } from '../components/DragBlock';
import styled from "styled-components";

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

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  font-size: 14px;
  color: black;
  background-color: white;
  :hover {
    background-color: #5b6d5b;
    color: white;
  }
  border: 1px solid grey;
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


class Step2 extends Component {
  state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 0},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step4', title: '4단계', desc: '결과보기', type: 1},
    ],
    isSelected: true
  }
  render() {
    const { isSelected } = this.state;
    let Input = null;
    if (isSelected) {
      Input = <DragBlock/>;
    } else {
      Input = <input placeholder='요약하신 문장을 입력해주세요.' 
      style={{width: '80vw', height: '50px', marginTop: 20, backgroundColor: '#f6f6f6', borderWidth: '1px'}}/>;
    }
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={this.state.contents}/>
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>          
            <Subject title="2단계: 문단 요약하기" sub="문단별 주요 내용을 한 문장으로 요약해봅시다."></Subject>
          </div>
          <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <TextBox>문단 내용</TextBox>
            <div style={{width: '80vw', display:'flex', margin: 10}}>
              <Button onClick={()=>{ this.setState({isSelected: true}); }} > 순서배열 </Button>
              <Button onClick={()=>{ this.setState({isSelected: false}); }} > 직접입력 </Button>
            </div>
            {Input}
          </div>
        </div>
      </div>
    );
  }
}

export default Step2;