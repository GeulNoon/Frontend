import React ,{Component} from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  font-size: 24px;
  color: white;
  border-radius: 50%;
  background-color: #5b6d5b;
  margin-right: 30px;
`;

class TOC extends Component{
  render(){
    var list = [];
    var i = 0;
    while (i<this.props.data.length){
      var data = this.props.data[i];
      list.push(
        <h2 key={data.id}>
          <li>
            <NavLink style={{ color: 'black', textDecoration: 'none' }} 
            to={{pathname: `${data.id}`}}>{data.title} 
            </NavLink>
          </li>
        </h2>);
      i = i+1;
    }
    return (
      <header>
        {list}
      </header>
    );
  }
}

class Study extends Component {
  state = {
    contents: [
      {id: 'Custom', title: '사용자지문', desc: '사용자지문 기능'},
      {id: 'Default', title: '기출지문', desc: '기출지문 기능'},
    ]
  }

  render() {
    return (
        <div style={{display: 'flex', alignItems:'center',justifyContent: 'center' ,height: '80vh'}}>
        <Circle>학습하기</Circle>
        <TOC data={this.state.contents}></TOC>
        </div>
    )
  }
}

export default Study;
