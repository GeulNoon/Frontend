import React, { Component } from 'react';
import user from "../image/user.png";
import styled from 'styled-components';

const Button = styled.div`
  padding: 8px;
  font-size: 11px;
  color: white;
  background-color: #4b754b;
  :hover {
    background-color: #4b754b;
    opacity: 0.7;
  }
  border: none;
  border-radius: 5px;
  margin-left: 10px;
`;


class MyPage extends Component {
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '450px'}}>
        <div style={{display: 'flex', width: '800px'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
            <img alt="" src ={user} width='100px' height='100px' />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '250px', border: '1px solid #e5e5e5', marginTop: '20px'}}>
              <label htmlFor="input-file" style={{width: '85px', height: '20px',margin: '10px', color: '#4b754b', cursor: 'pointer'}}>
                <h5 style={{margin: '0px'}}>사진 변경하기</h5>
              </label>
              <input type="file" id="input-file" style={{display: "none"}}/>              
            </div>
          </div>
          <div style={{width: '500px'}}>
            <h3>내 정보</h3>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around',width: '500px', height: '300px',borderTop: '1px solid #e5e5e5'}}>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h5 style={{margin: '0px', width: '100px'}}>이메일</h5>
                <input readOnly value={"이메일"} style={{margin: '0px'}}/>
              </div>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h5 style={{margin: '0px', width: '100px'}}>닉네임</h5>
                <input readOnly value={"닉네임"} style={{margin: '0px'}}/>
              </div>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h5 style={{margin: '0px', width: '100px'}}>소속</h5>
                <input readOnly value={"소속"} style={{margin: '0px'}}/>
                <h5 style={{margin: '0px', width: '100px', marginLeft: '5px'}}>학년</h5>
                <input readOnly value={"학년"} style={{margin: '0px'}}/>
              </div>
              <div style={{display: 'flex', width: '500px', justifyContent: 'end'}}>
                <Button>회원정보 수정</Button>
                <Button>회원 탈퇴</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPage;
