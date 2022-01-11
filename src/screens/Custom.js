import React, { Component } from 'react';

class Subject extends Component{
  render(){
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

class Custom extends Component {
  render() {
    return (
      <div>
          <Subject title="사용자지문 풀기" sub="사용자지문 풀기 기능 입니다."></Subject>
      </div>
    );
  }
}

export default Custom;