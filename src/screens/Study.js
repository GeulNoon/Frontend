//학습하기 도입 화면
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

//전체 화면 감싸는 박스
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

//좌측 요소 박스(학습하기 제목, 제목 입력창 등)
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: 300px;
  margin-right: 10px;
`;

//우측 요소 박스(지문 내용 입력창, 학습시작 버튼 등)
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85vh;
  width: 600px;
  margin-left: 10px;
`;

//지문 내용 입력창
const BorderInput = styled.textarea`
  height: 350px;
  width: 560px;
  padding: 20px;
  border: 1px solid #5b6d5b;
  border-radius: 20px;
  font-size: 12px;
`;

//좌측 하단 저작권 설명 박스
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 175px;
  width: 280px;
  font-size: 14px;
  border-radius: 20px;
  background-color: #d1dfd1;
  color: #5b6167;
  white-space: pre;
  line-height: 200%;
  margin-top: 30px;
`;

//학습시작 버튼
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
  height: 25px;
  font-size: 14px;
  color: white;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
`;

//학습하기 제목 글씨
class Subject extends Component{
  render(){
    return (
      <header>
        <h2>학습하기</h2>
        <h6 style={{color: "#676767"}}>학습대상이 될 기사를 직접 선택할 수 있습니다.</h6>
      </header>
    );
  }
}

//메인 함수
class Study extends Component {
  state = {
    titleinput: '', //제목 입력값
    contentinput: '' //내용 입력값
  } 
  //제목 입력창에 내용 입력시 해당 내용을 제목 입력값에 저장
  handleChange_title = (e) => {
    this.setState({
      titleinput: e.target.value
    })
  }
  //지문 내용 입력창에 내용 입력시 해당 내용을 내용 입력값에 저장
  handleChange_content = (e) => {
    this.setState({
      contentinput: e.target.value
    })
  }
  render() {
    const { titleinput, contentinput } = this.state;
    let Warning = null;
    //제목, 내용 입력 여부에 따라 경고문(Warning) 출력
    if(contentinput === '') {
      Warning = "내용을 입력해주세요!"
    } else if (titleinput === '') {
      Warning = "제목을 입력해주세요!"
    }
    return (
      <Wrapper>
          <LeftWrapper>
            <Subject/>
            <div style={{display: 'flex', alignItems:'center'}}>
              <h4 style={{marginRight: '20px'}}>지문 제목</h4>
              <input placeholder="제목을 입력해주세요" 
                style={{width: '180px',marginBottom:'0px',padding:'5px'}} 
                value = {this.state.titleinput} 
                onChange={this.handleChange_title}>
              </input> {/*제목 입력창*/}
            </div>
              <ContentWrapper>
              {`글눈 서비스는\n교육을 목적으로 한 비영리 사이트로,\n모든 지문을 상업적으로\n게재하지 않습니다.`}
              </ContentWrapper>
          </LeftWrapper>
          <RightWrapper>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <h3>지문 내용</h3>
            </div>
            <BorderInput placeholder="내용을 입력해주세요" value = {this.state.contentinput} onChange={this.handleChange_content}/>
            {Warning}
            <NavLink style={{ color: 'white', textDecoration: 'none' }} 
              to="Step1">
                <Button>
                  학습 시작
                </Button>
            </NavLink>{/*학습시작 버튼(클릭 시 문제풀기 화면(전문보기)으로 이동)*/}
          </RightWrapper>
      </Wrapper>
    );
  }
}

export default Study;