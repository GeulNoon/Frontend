//오답노트 화면
import React, { Component } from "react";
import styled from "styled-components";
import ReviewList from "../components/ReviewList";

//테두리가 있는 박스 디자인(큰 틀)
const BorderWrapper = styled.div`
  width: 850px;
  border: 1px solid #5b6d5b;
  font-size: 14px;
  padding: 20px;
`;

//제목(틀린문제 다시풀기) 글씨
class Subject extends Component {
  render() {
    return (
      <header>
        <h2>{this.props.title}</h2>
      </header>
    );
  }
}

//메인 함수
function Review() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "900px" }}>
        <Subject title="틀린문제 다시풀기"></Subject>
        <BorderWrapper>
          <ReviewList />
        </BorderWrapper>
      </div>
    </div>
  );
}

export default Review;
