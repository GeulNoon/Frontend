import React ,{Component} from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  width: 200px;
  height: 200px;
  color: white;
  font-size: 36px;
  border: none;
  border-radius: 100px;
  background-color: ${props => props.color};
  :hover {
    background-color: ${props => props.color};
    opacity: 0.7;
  }
  margin: 50px;
`;

class TOC extends Component{
  render(){
    var list = [];
    var i = 0;
    while (i<this.props.data.length){
      var data = this.props.data[i];
      list.push(
        <Button key={data.id} color={data.color}>
            <NavLink style={{ color: 'white', textDecoration: 'none' }} to={{pathname: `${data.id}`}}>{data.title} </NavLink>
        </Button>);
      i = i+1;
    }
    return (
      <>
        {list}
      </>
    );
  }
}

class Home extends Component {
  state = {
    contents: [
      {id: 'Study', title: '학습하기', desc: '학습하기 기능', color: '#5b6d5b'},
      {id: 'Review', title: '오답노트', desc: '오답노트 기능', color: '#94c973'},
      {id: 'Result', title: '학습결과', desc: '학습결과 기능', color: '#4b754b'},
      {id: 'Login' , title: '로그인', desc: '로그인 기능', color: '#5b6d5b'}
    ]
  }

  render() {
    return (
        <div style={{display: 'flex', alignItems:'center', height: '80vh'}}>
        <TOC data={this.state.contents}></TOC>
        </div>
    )
  }
}

export default Home;
