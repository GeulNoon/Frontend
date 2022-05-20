//내정보 화면
import React, { useState, useEffect, Component } from 'react';
import user from "../image/user.png";
import styled from 'styled-components';
import axios from "axios"
import {useNavigate, NavLink} from 'react-router-dom';

//회원정보 수정, 회원 탈퇴 버튼 디자인
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

//메인 함수(div는 요소 배치을 위해 불가피하게 많이 사용하게 되었습니다...기능과 크게 상관이 없어 무시해도 괜찮습니다)
function MyPage () {
    const [User, setUser] = useState(' ');
    const navigate = useNavigate();
    useEffect(async () => {
      const response = await axios.get(`https://www.geulnoon.com/api/MyPage`, {params: {'email': sessionStorage.getItem('user')}});
      setUser(response.data);
      console.log(response.data);
    },[]);

    const onRemove = () => {
      if (window.confirm("정말 삭제합니까?")) {
        axios.delete(`https://www.geulnoon.com/api/MyPage/`, {data: {'email': sessionStorage.getItem('user')}})
        .then(response => {
          if(response.data['delete'] === 'ok'){
            console.log(response.data)
            alert("삭제되었습니다.")
            sessionStorage.clear()
            window.location.replace("/Frontend/")
          }}).catch(error => {
            // 오류발생시 실행
          });
      }
      else {
        alert("취소합니다.");
      }
    };

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '450px'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px'}}>
            <img alt="" src ={user} width='100px' height='100px' />{/*프로필 사진*/}
          </div>
          <div style={{width: '500px'}}>
            <h1>내 정보</h1>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around',width: '500px', height: '300px',borderTop: '1px solid #e5e5e5'}}>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h4 style={{margin: '0px', width: '100px'}}>이메일</h4>
                <input readOnly value={sessionStorage.getItem('user')} style={{margin: '0px'}}/> {/*이메일 창, 쓰기 불가능*/}
              </div>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h4 style={{margin: '0px', width: '100px'}}>닉네임</h4>
                <input readOnly value={User.nickname} style={{margin: '0px'}}/> {/*닉네임 창, 쓰기 불가능*/}
              </div>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h4 style={{margin: '0px', width: '100px'}}>생년월일</h4>
                <input readOnly value={User.birthyear} style={{margin: '0px'}}/> {/*소속 창, 쓰기 불가능*/}
              </div>
              <div style={{display: 'flex', width: '500px', justifyContent: 'end'}}>
                <NavLink to="/Mypage/edit"><Button>회원정보 수정</Button></NavLink>
                <Button onClick={onRemove}>회원 탈퇴</Button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default MyPage;
