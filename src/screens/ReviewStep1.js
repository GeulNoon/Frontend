//오답노트의 문제풀기:전문보기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";
import axios from "axios"

//전문 박스
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50vw;
  background-color: #e5e5e5;
  font-size: 18px;
  border: none;
  margin-bottom: 20px;
  padding: 10px;
  line-height: 1.2;
  white-space: pre-wrap;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 25px;
  font-size: 14px;
  color: white;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
  border-radius: 3px;
`;

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

//메인함수
function ReviewStep1 () {
  const [Title, setTitle] = useState(' ');
  const [Content, setContent] = useState(' ');
  const [Submiited, setSubmitted] = useState(' ');
  const state = {
    contents: [
      {id: 'ReviewStep1', title: '1단계', desc: '전문보기', type: 0},
      {id: 'ReviewStep2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'ReviewStep3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'ReviewStep5', title: '4단계', desc: '빈칸풀기', type: 1},
      {id: 'ReviewStep4', title: '5단계', desc: '결과보기', type: 1},
    ]
  }
  useEffect(async () => {
    const response = await axios.get(`http://3.38.70.33:8000/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    setTitle(response.data['title']);
    console.log(Title);
  },[]);

  useEffect(async () => {
    const response = await axios.get(`http://3.38.70.33:8000/api/Step1`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setContent(response.data["content"]);
    setSubmitted(response.data["issubmitted"]);
    console.log([Submiited.issubmitted]);
  },[]);

  const [word, setWord] = useState('');
  const [result, setResult] = useState([]);
  const [isVisible, setIsVisible] = useState(0);
  const onSubmitSearch = () => {
    setTimeout(() => {
      axios({
        method: "post",
        url: "http://3.38.70.33:8000/api/searchWord/",
        headers: { "Content-Type": "application/json" },
        data: { "word": word},
      }).then((res)=> setResult(res["data"]["definition"], setIsVisible(1))
      ).catch(error => {
        alert('검색 실패!')
    });
    }, 500);
  }
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState([]);
  const [isAnswerVisible, setIsAnswerVisible] = useState(0);
  const onSubmitQuestion = () => {
    setTimeout(() => {
      axios({
        method: "post",
        url: "http://3.38.70.33:8000/api/getAnswer/",
        headers: { "Content-Type": "application/json" },
        params: {'a_id': sessionStorage.getItem('a_id')},
        data: { "question": question},
      }).then((res)=> setAnswer(res["data"]["answer"], setIsAnswerVisible(1))
      ).catch(error => {
        alert('검색 실패!')
    });
    }, 500);
  }
  return (
    <div style={{display:'flex'}}>
        <NavigationBar list={state.contents} title = {Title} prev={"Review"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw', marginTop: '3vw'}}>
          <div style={{width: '80vw'}}>          
            <Subject title="1단계: 전문보기" sub="기사의 전문을 읽어봅시다."></Subject>
          </div>
          <div style={{display:'flex'}}>
            <TextBox>{Content}</TextBox>
            <div style = {{marginLeft: '3vw'}}>
              <div style={{width: '25vw'}}>
                <h3>단어 검색</h3>
                <div style={{display:"flex", alignItems: 'center', marginBottom: '10px'}}>
                  <input type="text" placeholder='지문 속 궁금한 단어를 검색해봅시다.' onChange={(event) => setWord(event.target.value)} style={{width:"200px", marginBottom:"0px", marginRight: "10px"}}/>
                  <Button onClick={onSubmitSearch}>검색</Button>
                </div>
                {isVisible ? 
                <div style={{border: "1px solid #5b6d5b"}}>
                  <div style={{width: '25vw', display:"flex", justifyContent: 'end'}}>
                    <Button style={{width: '20px', marginRight: '2px'}} onClick={()=>{setIsVisible(0)}}>X</Button>
                  </div>
                  {result.map((def,index) => <p key={def}>{index+1}. {def}</p>)}
                </div> :
                null}
              </div>
              <div style={{width: '25vw'}}>
              <h3>질의 응답</h3>
                <div style={{display:"flex", alignItems: 'center', marginBottom: '10px'}}>
                  <input type="text" placeholder='지문 속 궁금한 내용을 검색해봅시다.' onChange={(event) => setQuestion(event.target.value)} style={{width:"200px", marginBottom:"0px", marginRight: "10px"}}/>
                  <Button onClick={onSubmitQuestion}>검색</Button>
                </div>
                {isAnswerVisible ? 
                <div style={{border: "1px solid #5b6d5b"}}>
                  <div style={{width: '25vw', display:"flex", justifyContent: 'end'}}>
                    <Button style={{width: '20px', marginRight: '2px'}} onClick={()=>{setIsAnswerVisible(0)}}>X</Button>
                  </div>
                  {answer}
                </div> :
                null}
              </div>
            </div>
          </div>
          <div style={{width: '80vw', display: 'flex', justifyContent: 'end'}}>
            <NavLink to="/Review/ReviewStep2">
              <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
              </NavLink> {/*다음 단계 버튼*/}
          </div>
        </div>
    </div>
  );
}

export default ReviewStep1;
