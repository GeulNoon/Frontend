//학습결과 화면
import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import ResultIcon1 from '../image/ResultIcon1.png'
import ResultIcon2 from '../image/ResultIcon2.png'
import ResultIcon3 from '../image/ResultIcon3.png'
import BarCharts from '../components/BarCharts';
import LineCharts from '../components/LineCharts';
import axios from "axios";

//화면 상단의 전체학습, 평균어휘 정답률, 평균 지문 이해도 박스 디자인
const ResultSummWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 225px;
  height: 125px;
  border: none;
  border-radius: 20px;
  background-color: #eff0ef;
`;

const Button = styled.div`
  display: flex;
  font-weight: norwmal;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 25px;
  font-size: 12px;
  color: black;
  background-color: white;
  border: 1px solid grey;
  border-radius: 20px;
  margin-left: 5px;
`;

//화면 상단 3개 박스
class ResultSumm extends Component{
  render(){
    return (
      <ResultSummWrapper>
        <div style={{width: '10vw'}}>
          <h5 style={{margin: '0px', marginBottom: '15px'}}>{this.props.title}</h5>
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
function Result() {
    const [option, setOption] = useState(0);
    const [title, setTitle] = useState([]);
    const [total_study, setTotal_study] = useState(0);
    const [avg_article_comprehension, setAvg_article_comprehension] = useState(0);
    const [avg_word_score, setAvg_word_score] = useState(0);
    const [statistics, setStatistics] = useState([]);
    useEffect(() => {
      async function fetchData(){
      const response = await axios.get(`http://3.38.70.33:8000/api/getHistory`, {params: {'email': sessionStorage.getItem('user')}});
      const stat = await axios.get(`http://3.38.70.33:8000/api/getStatistics`, {params: {'email': sessionStorage.getItem('user'), 'option': option}});  
      setTitle(response.data.title);
      setTotal_study(response.data['total_study']);
      setAvg_article_comprehension(response.data['avg_article_comprehension'])
      setAvg_word_score(response.data['avg_word_score'])  
      setStatistics(stat.data)                         
      } 
      fetchData();
    },[]);
    const changeOption = async(i) => {
      setOption(i)
      const stat = await axios.get(`http://3.38.70.33:8000/api/getStatistics`, {params: {'email': sessionStorage.getItem('user'), 'option': i}});
      setStatistics(stat.data) 
    }
   return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center',width: '900px', height: '150px'}}>
          <ResultSumm title="전체 학습" value={total_study} icon={ResultIcon1}/>
          <ResultSumm title="평균 어휘 정답률" value={avg_word_score+'%'} icon={ResultIcon2}/>
          <ResultSumm title="평균 지문 이해도" value={avg_article_comprehension + '%'} icon={ResultIcon3}/>
        </div>
        <div style={{display: 'flex', width: '900px', height: '300px'}}>
          <div style={{width: '600px'}}>
            <Subject title="학습 통계"></Subject>
            <div style={{display: 'flex', justifyContent: 'flex-end', width: '540px'}}>
              <Button onClick={()=>{ changeOption(0); }} style = {{backgroundColor: (option === 0) ? '#5b6d5b':'white', color: (option === 0) ? 'white':'black'}}> 일별 </Button>
              <Button onClick={()=>{ changeOption(1); }} style = {{backgroundColor: (option === 1) ? '#5b6d5b':'white', color: (option === 1) ? 'white':'black'}}> 주별 </Button>
              <Button onClick={()=>{ changeOption(2); }} style = {{backgroundColor: (option === 2) ? '#5b6d5b':'white', color: (option === 2) ? 'white':'black'}}> 월별 </Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center',width: '600px', height: '230px'}}>
              <BarCharts option={option} data={statistics.study_count}/>{/*우측 그래프, option값 전달*/}
              <LineCharts option={option} data={statistics.study_avg}/>{/*좌측 그래프, option값 전달*/}   
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',width: '300px', paddingTop: '50px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', width: '250px', height: '30px', borderRadius: '10px', backgroundColor: '#eff0ef'}}>
              <h6>학습이력</h6>
            </div>
            {title.map((i,j) => <History key={j} title={i[0]} date={i[1]}/>)}
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

export default Result;