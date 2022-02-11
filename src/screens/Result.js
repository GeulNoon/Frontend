//학습결과 화면
import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import ResultIcon1 from '../image/ResultIcon1.png'
import ResultIcon2 from '../image/ResultIcon2.png'
import ResultIcon3 from '../image/ResultIcon3.png'
import BarCharts from '../components/BarCharts';
import LineCharts from '../components/LineCharts';

//화면 상단의 전체학습, 평균어휘 정답률, 평균 지문 이해도 박스 디자인
const ResultSummWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 125px;
  border: none;
  border-radius: 20px;
  background-color: #eff0ef;
`;

//화면 상단 3개 박스
class ResultSumm extends Component{
  render(){
    return (
      <ResultSummWrapper>
        <div style={{width: '120px'}}>
          <h5 style={{margin: '0px', marginBottom: '7px'}}>{this.props.title}</h5>
          <h2 style={{margin: '0px'}}>{this.props.value}</h2>
        </div>
        <img alt="" src ={this.props.icon} width='45px' height='45px'/>
      </ResultSummWrapper>
    );
  }
}

//제목(학습통계) 글씨
class Subject extends Component{
  render(){
    return (
      <header>
        <h3>{this.props.title}</h3>
      </header>
    );
  }
}

//학습이력 요소(제목(title), 날짜(date)로 이루어져있음)
class History extends Component{
  render(){
    return (
      <div style={{width: '200px',fontSize: '11px', margin: '10px'}}>
        <h5 style={{margin: '0px', fontWeight: 'normal'}}>{this.props.title}</h5>
        <h6 style={{margin: '0px', fontWeight: 'normal', color: 'grey'}}>{this.props.date}</h6>
      </div>
    );
  }
}

//메인 함수
class Result extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center',width: '900px', height: '150px'}}>
          <ResultSumm title="전체 학습" value="7" icon={ResultIcon1}/>
          <ResultSumm title="평균 어휘 정답률" value="71.4%" icon={ResultIcon2}/>
          <ResultSumm title="평균 지문 이해도" value="78%" icon={ResultIcon3}/>
        </div>
        <div style={{display: 'flex', width: '900px', height: '300px'}}>
          <div style={{width: '600px'}}>
            <Subject title="학습 통계"></Subject>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center',width: '600px', height: '230px'}}>
              <BarCharts/>{/*우측 그래프*/}
              <LineCharts/>{/*좌측 그래프*/}
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',width: '300px', paddingTop: '50px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', width: '250px', height: '30px', borderRadius: '10px', backgroundColor: '#eff0ef'}}>
              <h6>학습이력</h6>
            </div>
            <History title="2015년도 9월 고3 9월 모의고사 31번-34번 지문" date="2021/11/28"/>
            <History title="2009년도 수능 24번-26번 지문 " date="2021/11/28"/>
            <History title="2018년도 고3 6월 모의고사 27번-30번 지문" date="2021/11/27"/>
            <h6 style={{width: '250px', margin: '0px', textAlign: 'right'}}>
              <NavLink style={{ color: 'grey'}} to="More">
              더보기...
              </NavLink> {/*더보기 버튼(클릭 시 더보기 화면으로 이동)*/}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;
