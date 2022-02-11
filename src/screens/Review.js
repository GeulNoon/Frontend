//오답노트 화면
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

//테두리가 있는 박스 디자인(큰 틀)
const BorderWrapper = styled.div`
  width: 850px;
  border: 1px solid #5b6d5b;
  font-size: 14px;
  padding: 20px;
`;

//문제풀기, 해설보기 버튼 디자인
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
`;

//제목(틀린문제 다시풀기) 글씨
class Subject extends Component{
  render(){
    return (
      <header>
        <h2>{this.props.title}</h2>
      </header>
    );
  }
}

//학습이력 요소(제목과 문제풀기, 해설보기 버튼으로 이뤄져있음)
class Contents extends Component{
  render(){
    return (
      <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <div style={{width: '600px'}}>
          <li>
            {this.props.title}
          </li>
        </div>
        <NavLink style={{ color: 'white', textDecoration: 'none' }} 
          to="ReviewStep1">
            <Button>
              문제풀기
            </Button>
        </NavLink>
        <NavLink style={{ color: 'white', textDecoration: 'none' }} 
          to="Answer">
            <Button>
              해설보기
            </Button>
        </NavLink>
      </div>
    );
  }
}

//메인 함수
class Review extends Component {
  state = {
      posts: []
  };

  async componentDidMount() {
      try {
          const res = await fetch('http://127.0.0.1:8000/api/');
          const posts = await res.json();
          this.setState({
              posts
          });
      } catch (e) {
          console.log(e);
      }
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: '900px'}}>
          <Subject title="틀린문제 다시풀기"></Subject>
          <BorderWrapper>
            {/*제목을 title로 전달*/}
            <Contents title="영국 총리 '봉쇄 중 술파티' 사과 안 통하나…가족 확진까지"/>
            <Contents title="영국 총리 '봉쇄 중 술파티' 사과 안 통하나…가족 확진까지"/>
            <div>
                {this.state.posts.map(item => (
                    <div key={item.email}>
                        <h1>{item.email}</h1>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
          </BorderWrapper>
        </div>
      </div>
    );
  }
}

export default Review;
