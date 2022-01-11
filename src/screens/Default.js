import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 65vh;
  width: 50vw;
  background-color: #e5e5e5;
`;

const BorderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height};
  width: ${props => props.width};
  border: 2px solid black;
  background-color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.isBold ? 'bold' : 'normal'};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 5vh;
  font-size: 14px;
  color: white;
  margin: 30px;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
`;

class Default extends Component {
  render() {
    return (
      <Wrapper>
          <ContentWrapper>
            <BorderWrapper height='8vh' width='30vw' color='white' fontSize={20} isBold={true} >
              기사 제목
            </BorderWrapper>
            <div style={{color: '#3b583b', fontWeight: 'bold', margin: 10}}>
              지문 미리보기
            </div>
            <BorderWrapper height='25vh' width='40vw' color='#e5e5e5' fontSize={11} isBold={false}>
              본문 일부
            </BorderWrapper>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Button>
                <NavLink style={{ color: 'white', textDecoration: 'none' }} 
                  to="Step1">학습 시작
                </NavLink>
              </Button>
              <Button>
                지문 변경
              </Button>
            </div>
          </ContentWrapper>
      </Wrapper>
    );
  }
}

export default Default;