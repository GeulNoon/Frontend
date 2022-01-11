import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Choice from '../components/Choice';
import MultipleChoice from '../components/MutipleChoice';
import ShortAnswer from '../components/ShortAnswer';

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
        <NavigationBar list={this.state.contents}/>
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>
            <Subject title="3단계: 지문 속 어휘 공부하기" sub="다양한 어휘 문제를 풀며 본문 속 어휘의 정확한 뜻을 습득해봅시다."></Subject>
          </div>
          <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Choice/>
            <MultipleChoice/>
            <ShortAnswer/>
          </div>
        </div>
      </div>
    );
  }
}

export default Step3;