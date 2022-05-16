//학습하기의 문제풀기:전문보기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";
import axios from "axios"
//전문 박스
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  background-color: #e5e5e5;
  font-size: 18px;
  border: none;
  margin-bottom: 20px;
  padding: 10px;
  line-height: 1.2;
  white-space: pre-wrap;
`;

const TextInput = styled.input`
    width: 80px;
    height: 20px;
    margin: 10px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 25px;
  font-size: 14px;
  color: white;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
  border-radius: 3px;
  margin: 10px;
`;

//전문보기 제목 글씨(title(제목)과 sub(설명)을 요소로 전달받음)
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
function ReviewStep5 () {
  const [Title, setTitle] = useState(' ');
  const [Content, setContent] = useState(' ');
  const [wordValue, setWordValue] = useState([]);

  const state = {
    contents: [
      {id: 'ReviewStep1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'ReviewStep2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'ReviewStep3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'ReviewStep5', title: '4단계', desc: '빈칸풀기', type: 0},
      {id: 'ReviewStep4', title: '5단계', desc: '결과보기', type: 1},
    ]
  }
  const handleChange = (e) => {
    setWordValue(wordValue.map(w => w.id === parseInt(e.target.name) ? {...w, value: e.target.value} : w))
  }
  const submitAnswer = () => {
    setTimeout(() => {
      axios({
        method: "put",
        url: "http://3.38.70.33:8000/api/Step5/",
        headers: { "Content-Type": "application/json" },
        params: {'s_id': sessionStorage.getItem('s_id')},
        data: { "answer": wordValue},
      }).catch(error => { alert('실패')
      }).then(
        alert('제출 성공!')
      );
    }, 500);
  }
  useEffect(async () => {
    const response = await axios.get(`http://3.38.70.33:8000/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    setTitle(response.data['title']);
    console.log(Title);
  },[]);
    
  useEffect(async () => {
    const response = await axios.get(`http://3.38.70.33:8000/api/Step5`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setContent(response.data['keyword'])
    setWordValue(response.data['answerlist'])
  },[]);
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={state.contents} title = {Title} prev={"Review"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw', marginTop: '3vw'}}>
          <div style={{width: '80vw'}}>          
            <Subject title="4단계: 빈칸문제" sub="본문 속 핵심 단어를 채워봅시다."></Subject>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <TextBox>{Content}</TextBox>
            각 번호에 해당하는 단어를 적어주세요.
            <div style={{display:'flex', width: '80vw', flexFlow:'wrap', justifyContent: 'space-between'}}>
              {wordValue.map(word => <TextInput key={word.id} placeholder={word.id+1+"."} onChange={handleChange} name={word.id}/>)}
            </div>
            <div style={{width: '80vw', display: 'flex', justifyContent: 'end'}}>
              <Button onClick={submitAnswer}>제출하기</Button>
            </div>
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

export default ReviewStep5;
