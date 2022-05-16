//학습하기 도입 화면
import React, { useEffect, Component, useState } from 'react';
import { Formik } from "formik";
import styled from "styled-components";
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
//메인 함수
function Study() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
    return (
      <Formik 
          initialValues={{ title: "", content: "", email: ""}}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true)
            setTimeout(() => {
              axios({
                method: "post",
                url: "http://3.38.70.33:8000/api/study",
                headers: { "Content-Type": "application/json" },
                data: { "title": values['title'],"content": values['content'], "email": sessionStorage.getItem('user')},
              }).then(response => {
              sessionStorage.setItem('timer', '0')
              sessionStorage.setItem('s2', '0')
              //sessionStorage.setItem('s3', '0')
              sessionStorage.setItem('s_id', response.data['s_id'])
              sessionStorage.setItem('a_id', response.data['a_id'])
              navigate('/Study/Step1')
              })
              .catch(error => {
                alert('기사 등록 실패')
                setIsLoading(false)
              });
              setSubmitting(false);
            }, 500);
          }}
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
              submitForm
            } = props;
        return (
          isLoading ? 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh'}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <CircularProgress size={30} color={'inherit'}/>
              <h2 style={{marginLeft: '10px'}}>로딩중...</h2>
            </div>
            <h4 style={{color: '#5b6d5b'}}>시간이 조금 걸립니다:)</h4>
          </div> : 
          <form onSubmit={handleSubmit}>
            <Wrapper>
            <LeftWrapper>
            <header>
              <h2>학습하기</h2>
              <h6 style={{color: "#676767"}}>학습대상이 될 기사를 직접 선택할 수 있습니다.</h6>
            </header>
              <div style={{display: 'flex', alignItems:'center'}}>
                <h4 style={{marginRight: '20px'}}>지문 제목</h4>
                <input
                  name="title"
                  type="title"
                  placeholder="제목을 입력해주세요" 
                  style={{width: '180px',marginBottom:'0px',padding:'5px'}} 
                  value = {values.title} 
                  onChange={handleChange}
                />
              </div>
                <ContentWrapper>
                  {`글눈 서비스는\n교육을 목적으로 한 비영리 사이트로,\n모든 지문을 상업적으로\n게재하지 않습니다.`}
                </ContentWrapper>
            </LeftWrapper>
            <RightWrapper>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <h3>지문 내용</h3>
              </div>
              <BorderInput
                name="content"
                type="content"
                placeholder="내용을 입력해주세요" 
                value = {values.content} 
                onChange={handleChange}
              />
              <EnterButton type="submit" disabled={isSubmitting}>학습 시작</EnterButton> 
            </RightWrapper>
        </Wrapper>
      </form>
    )
    }}
    </Formik>
    
    );
};

export default Study;



//전체 화면 감싸는 박스
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

//좌측 요소 박스(학습하기 제목, 제목 입력창 등)
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: 300px;
  margin-right: 10px;
  margin-Top: 30px;
`;

//우측 요소 박스(지문 내용 입력창, 학습시작 버튼 등)
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85vh;
  width: 600px;
  margin-left: 10px;
`;

//지문 내용 입력창
const BorderInput = styled.textarea`
  height: 350px;
  width: 560px;
  padding: 20px;
  border: 1px solid #5b6d5b;
  border-radius: 20px;
  font-size: 12px;
`;

//좌측 하단 저작권 설명 박스
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 175px;
  width: 280px;
  font-size: 14px;
  border-radius: 20px;
  background-color: #d1dfd1;
  color: #5b6167;
  white-space: pre;
  line-height: 200%;
  margin-top: 30px;
`;

//학습시작 버튼
const EnterButton = styled.button`
  width: 175px;
  height: 25px;
  margin-top: 20px;
  background-color: rgb(91, 109, 91);
  color: white;
  border: 1px solid rgb(91, 109, 91);
  background-color: 250ms;
  display: block;
  :hover {
    cursor: pointer;
    background-color: white;
    color: rgb(91, 109, 91);
  }
  `;
