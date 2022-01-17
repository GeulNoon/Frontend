import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Choice from '../components/Choice';
import MultipleChoice from '../components/MutipleChoice';
import ShortAnswer from '../components/ShortAnswer';

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
        <NavigationBar list={this.state.contents}  prev={"Review"}/>
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw'}}>
          <div style={{width: '80vw'}}>          
            <div className='pointer'>틀린 문제</div>
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

export default ReviewStep3;