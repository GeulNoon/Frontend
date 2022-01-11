import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  width: 10vw;
  font-size: 20px;
  background-color: #a2bea2;
  :hover {
    background-color: #a2bea2;
    opacity: 0.7;
  }
  margin-bottom: 5vh;
  border: none;
`;

const Selected = styled.button`
  width: 10vw;
  color: white;
  font-size: 20px;
  background-color: #5b6d5b;
  border: none;
  margin-bottom: 5vh;
`;

class TOC extends Component{
  render(){
    var list = [];
    var i = 0;
    while (i<this.props.data.length){
      var data = this.props.data[i];
      if(data.type === 1){
        list.push(
          <Button key={data.id}>
              <NavLink style={{ color: 'black', textDecoration: 'none' }} 
              to={{pathname: `/Study/Default/${data.id}`}}>
              {data.title}<br/>{data.desc} 
              </NavLink>
          </Button>);
      } else {
        list.push(
          <Selected key={data.id}>
            {data.title}<br/>{data.desc}
          </Selected>
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
    const {list} = this.props;
      return (
          <div style={{width: '10vw',backgroundColor: '#a2bea2', 
          display: 'flex',flexDirection: 'column', 
          alignItems: 'center', position: 'fixed'}}>
            <div style={{
              display: 'flex', 
              alignItems:'center', 
              justifyContent: 'center', 
              height: 100, 
              width: '9vw', 
              border: '2px solid black',
              marginTop: '5vh',
              marginBottom: '10vh'
              }}>
              기사 제목
            </div>
            <TOC data={list}></TOC>
        </div>
      );
    }
  }
  
  export default NavigationBar;