import React, { Component } from 'react';
import styled from "styled-components";
import '../App.css';

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
const AnswerBox = styled.div`
  display: flex;
  align-items: center;
  width: 80vw-10px;
  background-color: #e5e5e5;
  border: none;
  padding-right: 10px;
  margin-bottom: 10px;
`;

class Answer extends Component {
  render() {
    return (
      <div style={{display:'flex', justifyContent: 'center'}}>
        <div style={{width: '80vw'}}>
          <div className='pointer' style={{marginBottom: '20px'}}>틀린 문제</div>
          <div className='pointer'>요약문 정답</div>
          <TextBox>창조 도시는 인재들을 위한 문화 및 거주 환경의 창조성이 풍부하며, 혁신적이고도 유연한 경제 시스템을 구비하고 있는 도시이다.</TextBox>
          <TextBox>창조 도시의 주된 동력을 창조 산업으로 보는 관점에서는 창조 산업이 도시에 인적·사회적·문화적·경제적 다양성을 불어넣음으로써 도시의 재구조화를 가져오고 나아가 부가가치와 고용을 창출한다고 주장한다.</TextBox>
          <AnswerBox><div className='pointer' style={{marginRight: '20px'}}>어휘문제 정답</div>
            1. ③ 2. (1)-(C), (2)-(D), (3)-(A), (4)-(E), (5)-(B)  3. ④  4. 해설참조
          </AnswerBox>
        </div>
      </div>
    );
  }
}

export default Answer;