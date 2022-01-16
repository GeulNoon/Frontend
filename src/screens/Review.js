import React, { Component } from 'react';

class Subject extends Component{
  render(){
    return (
      <header>
        <h2>{this.props.title}</h2>
      </header>
    );
  }
}

class Review extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: '80vw'}}>
          <Subject title="틀린문제 다시풀기"></Subject>
        </div>
      </div>
    );
  }
}

export default Review;
