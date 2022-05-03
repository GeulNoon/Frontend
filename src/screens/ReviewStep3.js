//학습하기의 문제풀기:어휘풀기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from "../components/NavigationBar";
import Choice from "../components/Choice";
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
  const [Quiz1, setQuiz1] = useState({});
  const [Quiz2, setQuiz2] = useState({});
  const [Quiz3, setQuiz3] = useState({});
  const [Quiz4, setQuiz4] = useState({});
  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    const quiz = await axios.get(`http://127.0.0.1:8000/api/Step3`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setTitle(response.data['title']);
    setQuiz1(quiz.data.quiz_1)
    console.log(Title);
  },[]);

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
          <Choice answer={answer} setAnswer={setAnswer} id={1} question={Quiz1.TYPE1} example={Quiz1.TEST1} choice={Quiz1.W2VWORD}/>{" "}
          {/*객관식 문제*/}
          <MultipleChoice answer={answer} setAnswer={setAnswer} id={2} />{" "}
          <MultipleChoice answer={answer} setAnswer={setAnswer} id={3} />{" "}
          {/*동음이의어 문제*/}
          <Choice answer={answer} setAnswer={setAnswer} id={4} />
          {answer.map((ans) => ans.value)}{" "}
          {/*사용자 답 확인하기 위해 임시로 넣었습니다*/}
        </div>
        <div
          style={{
            width: "80vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <SubmitButton>제출하기</SubmitButton>
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
