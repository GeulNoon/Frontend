//학습하기, 오답노트 문제풀기 좌측 단계이동 네비게이션 바
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  width: 10vw;
  font-size: 18px;
  background-color: #a2bea2;
  :hover {
    background-color: #a2bea2;
    opacity: 0.7;
  }
  margin-bottom: 3vh;
  border: none;
`;

const Selected = styled.button`
  width: 10vw;
  color: white;
  font-size: 18px;
  background-color: #5b6d5b;
  border: none;
  margin-bottom: 3vh;
`;

const Disabled = styled.button`
  width: 10vw;
  color: #e5e5e5;
  font-size: 18px;
  background-color: #aac4ab;
  border: none;
  margin-bottom: 3vh;
`;

class TOC extends Component{
  render(){
    var list = [];
    var i = 0;
    while (i<this.props.data.length){
      var data = this.props.data[i];
      if(data.type === 1){
        list.push(
              <NavLink  key={data.id} style={{ color: 'black', textDecoration: 'none' }} 
              to={{pathname: `/${this.props.prev}/${data.id}`}}>
              <Button>
              {data.title}<br/>{data.desc} 
              </Button>
              </NavLink>);
      } else if(data.type === 0) {
        list.push(
          <Selected key={data.id}>
            {data.title}<br/>{data.desc}
          </Selected>
        )
      }
      else {
        list.push(
          <Disabled key={data.id}>
            {data.title}<br/>{data.desc}
          </Disabled>
        )
      }
      i = i+1;
    }
    return (
      <header>
        {list}
      </header>
    );
  }
}

class NavigationBar extends Component {
    render() {
    const {list, prev} = this.props;
    const {title} = this.props;
      return (
          <div style={{width: '10vw',height: '90vh',backgroundColor: '#a2bea2', 
          display: 'flex',flexDirection: 'column', 
          alignItems: 'center', position: 'fixed'}}>
            <div style={{
              display: 'flex', 
              alignItems:'center', 
              justifyContent: 'center',
              height: '15vh',
              width: '8vw',
              border: '2px solid black',
              marginTop: '10vh',
              marginBottom: '5vh',
              fontWeight: 'bold',
              textAlign: 'center'
              }}>
              {title}
            </div>
            <TOC data={list} prev={prev}></TOC>
        </div>
      );
    }
  }
  
  export default NavigationBar;