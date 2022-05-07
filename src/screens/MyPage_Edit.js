//내정보 화면
import React, { useState, useEffect, Component } from 'react';
import user from "../image/user.png";
import styled from 'styled-components';
import axios from "axios"
import { Formik } from "formik";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom';
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
function MyPage_Edit () {
    const [User, setUser] = useState(' ');
    const [birthyear, SetBirthyear] = useState(User.birthyear);
    const [nickname, SetNickname] = useState(User.nickname);
    const navigate = useNavigate();
    
    useEffect(async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/MyPage`, {params: {'email': sessionStorage.getItem('user')}});
        setUser(response.data)
        console.log(User.birthyear)
    },[]);

    const options = [];
    for (let i=2022; i >= 1900; i--) options.push(i);

    const handleChangeB = (e) => {
      SetBirthyear(e.target.value)
      console.log(e.target.value)
      console.log(birthyear)
    }

    const handleChangeN = (e) => {
      SetNickname(e.target.value)
      console.log(e.target.value)
      console.log(nickname)
    }
    return (

    <Formik
      initialValues={{email: sessionStorage.getItem('user'), password: "", nickname: User.nickname, birthyear: User.birthyear}}
      onSubmit={(values, { setSubmitting }) => {
        if (window.confirm("정말 수정합니까?")){ 
          setTimeout(() => {
            axios({
              method: "put",
              url: "http://127.0.0.1:8000/api/MyPage/",
              headers: { "Content-Type": "application/json" },
              data: { "email": sessionStorage.getItem('user'), "nickname": nickname, "password": values['password'], "birthyear": birthyear},
            }).then((response) => {
                if(response.data['edit'] === 'ok'){
                  alert("수정되었습니다.")
                  window.location.replace("/MyPage")
            }})
            .catch(error => {
              alert('수정 실패. 다시 시도해주세요.')
            });
            setSubmitting(false);
          }, 500);
        }
        else {
          alert("취소합니다.");
      }
      }}

      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(8, "패스워드는 8글자 이상이어야 합니다.")
          .matches(/(?=.*[0-9])/, "패스워드는 반드시 숫자를 포함해야 합니다."),
    })}
    >

    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;


    return (
      <form style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
       {User.birthyear && User.nickname && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', width: '80%'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '30%'}}>
            <img alt="" src ={user} width='100px' height='100px' />{/*프로필 사진*/}
          </div>
          <div style={{width: '60%', height: '80%'}}>
            <h1>내 정보 수정</h1>
            <h5>닉네임의 경우 공백으로 입력하시면 따로 수정이 반영되지 않습니다.</h5>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around',width: '500px', height: '400px',borderTop: '1px solid #e5e5e5'}}>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h4 style={{margin: '0px', width: '200px', marginRight: '10px'}}>이메일</h4>
                <input readOnly value={sessionStorage.getItem('user')} style={{margin: '0px'}}/> {/*이메일 창, 쓰기 불가능*/}
              </div>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h4 style={{margin: '0px', width: '200px', marginRight: '10px'}}>닉네임</h4>
                <input
                name="nickname"
                type="nickname"
                onChange={handleChangeN}
                className={errors.nickname && touched.nickname && "error"} 
                defaultValue={User.nickname} 
                style={{margin: '0px'}}/>
              </div>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h4 style={{margin: '0px', width: '200px', marginRight: '10px'}}>패스워드</h4>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                  <input
                    name="password"
                    type="password"
                    placeholder="패스워드"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password && "error"}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                )}
              </div>
              </div>
              <div style={{display: 'flex', width: '500px', alignItems: 'center'}}>
                <h4 style={{margin: '0px', width: '200px', marginRight: '10px'}}>생년월일</h4>
                <select
                  name ='birthyear'
                  type ='birthyear'
                  onChange={handleChangeB}
                  defaultValue={User.birthyear}
                >
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
               ))}
              </select>
              </div>
              <div style={{display: 'flex', width: '500px', justifyContent: 'end'}}>
                <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>수정하기</Button> 
              </div>
          </div>
        </div>
      </div>} 
      </form>
      );
    }}
    </Formik>
    );
}

export default MyPage_Edit;
