//학습하기의 문제풀기:어휘풀기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from "../components/NavigationBar";
import Choice from "../components/Choice";
import Choice2 from '../components/Choice2';
import MultipleChoice from "../components/MutipleChoice";
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";
import styled from "styled-components";
import axios from "axios"

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  font-size: 14px;
  color: white;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
  margin-bottom: 20px;
`;

//어휘문제 제목 글씨(title(제목)과 sub(설명)을 요소로 전달받음)
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

//메인함수
const ReviewStep3 = () => {
  const state = {
    contents: [
      {id: 'ReviewStep1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'ReviewStep2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'ReviewStep3', title: '3단계', desc: '어휘풀기', type: 0},
      {id: 'ReviewStep5', title: '4단계', desc: '빈칸풀기', type: 1},
      {id: 'ReviewStep4', title: '5단계', desc: '결과보기', type: 1},
    ]
  };

  const [Title, setTitle] = useState('');
  const [Example1, setExample1] = useState();
  const [Question1, setQuestion1] = useState();
  const [Question2, setQuestion2] = useState();
  const [Question2W, setQuestion2W] = useState();
  const [Question2S, setQuestion2S] = useState();
  const [Question2C, setQuestion2C] = useState();
  const [Question2M, setQuestion2M] = useState();
  const [Question2A, setQuestion2A] = useState();
  const [Question3T, setQuestion3T] = useState();
  const [Question3, setQuestion3] = useState();
  const [Example3, setExample3] = useState();
  const [Question4, setQuestion4] = useState();
  const [Example4, setExample4] = useState();


  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    setTitle(response.data['title']);
    console.log(Title);
  },[]);

  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/Step3`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setExample1(response.data['quiz1']['Choice']);
    setQuestion1(response.data['quiz1']['Test']);
    setQuestion2(response.data['quiz2']['Test']);
    setQuestion2W(response.data['quiz2']['Word']);
    setQuestion2S(response.data['quiz2']['Sentence']);
    setQuestion2C(response.data['quiz2']['Choice']);
    setQuestion2M(response.data['quiz2']['MEAN']);
    setQuestion2A(response.data['quiz2']['User_answer']);
    setQuestion3T(response.data['quiz3']['Type']);
    setQuestion3(response.data['quiz3']['Test']);
    setExample3(response.data['quiz3']['Choice']);
    setQuestion4(response.data['quiz4']['Test']);
    setExample4(response.data['quiz4']['Choice']);
  },[]);

  const submitAnswer = () => {
    setTimeout(() => {
      axios({
        method: "put",
        url: "http://127.0.0.1:8000/api/Step3/",
        headers: { "Content-Type": "application/json" },
        params: {'s_id': sessionStorage.getItem('s_id')},
        data: { "answer": answer},
      }).catch(error => { alert('실패')
      }).then(
        alert('제출 성공!')
      );
    }, 500);
  }


  const [answer, setAnswer] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
  ]); //사용자가 입력한 답. 문제 마다 value에 저장
  return (
    <div style={{ display: "flex" }}>
      <NavigationBar list={state.contents} title={Title} prev={"Review"} />{" "}
      {/*화면 좌측 단계이동 바*/}
      <div
        style={{
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "9vw",
          marginTop: "3vw",
        }}
      >
        <div style={{ width: "80vw" }}>
          <Subject
            title="3단계: 지문 속 어휘 공부하기"
            sub="다양한 어휘 문제를 풀며 본문 속 어휘의 정확한 뜻을 습득해봅시다."
          ></Subject>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Choice type={1} answer={answer} setAnswer={setAnswer} example = {Example1} question = {Question1} id={1} />{" "}
          {/*객관식 문제*/}
          <MultipleChoice answer={answer} 
          setAnswer={setAnswer} 
          question = {Question2} 
          word = {Question2W} 
          sentence = {Question2S} 
          choice={Question2C} 
          mean = {Question2M} 
          id={2} 
          userAnswer = {Question2A} 
          setUseranswer = {setQuestion2A} />{" "}
          <Choice2 type = {Question3T}
          answer={answer}
          setAnswer={setAnswer}
          example = {Example3}
          question = {Question3}
          id={3}
          />
          {/*동음이의어 문제*/}
          <Choice type = {3} answer={answer} setAnswer={setAnswer} example = {Example4} question = {Question4} id={4} />
        </div>
        <div
          style={{
            width: "80vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <SubmitButton onClick={submitAnswer}>제출하기</SubmitButton>
          <NavLink to="/Review/ReviewStep5">
            <img alt="" src={NextIcon} width="37.5px" height="37.5px" />
          </NavLink>{" "}
          {/*다음 단계 버튼*/}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep3;