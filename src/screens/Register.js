import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "../styles.css";
import user from "../image/user.png";
import axios from "axios"
import {useNavigate} from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "", nickname: "", birthyear: ""}}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/signup",
            headers: { "Content-Type": "application/json" },
            data: { "email": values['email'],"nickname": values['nickname'], "password": values['password'], "birthyear": values['birthyear']},
          }).then(() => navigate('/'))
          .catch(error => {
            alert('회원가입 실패!\n이메일 중복 여부를 확인해주세요.')
          });
          setSubmitting(false);
        }, 500);
      }}

      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("이메일 형식으로 입력해야 합니다.")
          .required("이메일을 입력해야 합니다."),
        nickname: Yup.string()
          .required("닉네임을 입력해야 합니다."),
        password: Yup.string()
          .required("패스워드를 입력해야 합니다.")
          .min(8, "패스워드는 8글자 이상이어야 합니다.")
          .matches(/(?=.*[0-9])/, "패스워드는 반드시 숫자를 포함해야 합니다."),
        confirmPassword: Yup.string()
          .required("패스워드 확인을 입력해야 합니다.")
          .oneOf([Yup.ref('password'), null], "패스워드가 일치하지 않습니다."),
        birthyear: Yup.number()
          .required("출생 연도를 선택해야 합니다.").positive().integer(),
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
        handleSubmit
      } = props;

      const options = [];

      for (let i=2022; i >= 1900; i--) options.push(i);

      return (
        <div className="Register">
          <form className="RegisterForm" onSubmit={handleSubmit}>
            <h1 style={{textAlign: "left", marginLeft: 30}}>회원가입</h1>
              <div className="container1">
                <div className="user_image">
                  <img alt="" src ={user} width='150' height='150'/>
                </div>
                <div className="register_input">
                  <table>
                    <tr>
                      <td className="label"><label htmlFor="email">이메일</label></td>
                      <td><input
                            name="email"
                            type="text"
                            placeholder="이메일"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email && "error"}
                          />
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                      </td>
                    </tr>
                    <tr>
                      <td className="label"><label htmlFor="email">패스워드</label></td>
                      <td><input
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
                      </td>
                    </tr>
                    <tr>
                      <td className="label"><label htmlFor="email">패스워드 확인</label></td>
                      <td><input
                            name="confirmPassword"
                            type="password"
                            placeholder="패스워드 확인"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.confirmPassword && touched.confirmPassword && "error"}
                          />
                          {errors.confirmPassword && touched.confirmPassword && (
                            <div className="input-feedback">{errors.confirmPassword}</div>
                          )}
                      </td>
                    </tr>
                    <tr>
                      <td className="label"><label htmlFor="email">닉네임</label></td>
                      <td><input
                            name="nickname"
                            type="nickname"
                            placeholder="닉네임"
                            value={values.nickname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.nickname && touched.nickname && "error"}
                          />
                          {errors.nickname && touched.nickname && (
                            <div className="input-feedback">{errors.nickname}</div>
                          )}
                      </td>
                    </tr>
                    <tr>
                      <td className="label"><label htmlFor="email">출생 연도</label></td>
                      <td><select
                            name='birthyear'
                            type='birthyear'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.birthyear}
                            className={errors.birthyear && touched.birthyear && "error"}
                          >
                            <option  value='' disabled>출생 연도</option>
                            {options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {errors.birthyear && touched.birthyear && (
                            <div className="input-feedback">{errors.birthyear}</div>
                          )}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            <div className="Rbutton">
              <button className="registerButton" type="submit" disabled={isSubmitting}>가입하기</button>  
             
            </div>
          </form>
        </div>
      );
    }}
    </Formik>
  );
};

export default Register;