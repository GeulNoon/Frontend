import React, { Component } from 'react';

class ShortAnswer extends Component {
    state = {
        example: ["나는","_","를 ","_","좋아한다"],
      }
    render() {
      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            빈칸에 들어갈 지문의 핵심 키워드를 쓰시오.
            <div style={{
                width: '80vw',
                paddingTop: 10,
                paddingBottom: 10,
                display:'flex',
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#e5e5e5',
                whiteSpace: 'pre'}}>
                {this.state.example.map((value, i) => ( 
                    value === '_' ? <input key = {i} placeholder='단어 입력' 
                    style={{width: '60px', height: '20px'}}/>
                    :value
                ))}
            </div>
          </div>
      );
    }
  }
  
  export default ShortAnswer;