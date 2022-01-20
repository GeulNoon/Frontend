import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: 300px;
  margin-right: 10px;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85vh;
  width: 600px;
  margin-left: 10px;
`;

const BorderInput = styled.textarea`
  height: 350px;
  width: 560px;
  padding: 20px;
  border: 1px solid #5b6d5b;
  border-radius: 20px;
  font-size: 12px;
`;

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

class SubjectMain extends Component{
  render(){
    return (
      <header>
        <h2>학습하기</h2>
        <h6 style={{color: "#676767"}}>학습대상이 될 기사를 직접 선택할 수 있습니다.</h6>
      </header>
    );
  }
}

class Subject extends Component{
  render(){
    return (
      <header>
        <h3>{this.props.title}</h3>
      </header>
    );
  }
}

class Study extends Component {
  state = {
    titleinput: '',
    contentinput: ''
  }
  handleChange_title = (e) => {
    this.setState({
      titleinput: e.target.value
    })
  }
  handleChange_content = (e) => {
    this.setState({
      contentinput: e.target.value
    })
  }
  render() {
    const { titleinput, contentinput } = this.state;
    let Warning = null;
    if(contentinput === '') {
      Warning = "내용을 입력해주세요!"
    } else if (titleinput === '') {
      Warning = "제목을 입력해주세요!"
    }
    return (
      <Wrapper>
          <LeftWrapper>
            <SubjectMain/>
            <div style={{display: 'flex', alignItems:'center'}}>
              <h4 style={{marginRight: '20px'}}>지문 제목</h4>
              <input placeholder="제목을 입력해주세요" style={{width: '180px',marginBottom:'0px',padding:'5px'}} value = {this.state.titleinput} onChange={this.handleChange_title}></input>
            </div>
              <ContentWrapper>
              {`글눈 서비스는\n교육을 목적으로 한 비영리 사이트로,\n모든 지문을 상업적으로\n게재하지 않습니다.`}
              </ContentWrapper>
          </LeftWrapper>
          <RightWrapper>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Subject title="지문 내용"></Subject>
            </div>
            <BorderInput placeholder="내용을 입력해주세요" value = {this.state.contentinput} onChange={this.handleChange_content}/>
            {Warning}
            <NavLink style={{ color: 'white', textDecoration: 'none' }} 
              to="Step1">
                <Button>
                  학습 시작
                </Button>
            </NavLink>
          </RightWrapper>
      </Wrapper>
    );
  }
}

export default Study;