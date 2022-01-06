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

class Login extends Component {
  render() {
    return (
      <div>
          <Subject title="로그인" sub="로그인 기능입니다."></Subject>
      </div>
    );
  }
}

export default Login;
