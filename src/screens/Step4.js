//학습하기의 문제풀기:결과보기
import React, { useState, useEffect, Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import styled from "styled-components";
import '../App.css';
import { NavLink } from "react-router-dom";
import HomeIcon from '../image/HomeIcon.png';
import ReviewIcon from '../image/ReviewIcon.png';
import Right from '../image/Right.png';
import Wrong from '../image/Wrong.png';
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';

//요약문 및 어휘문제 전반적인 해설 박스
const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  box-sizing: border-box;
  background-color: #e5e5e5;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextBox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw-20px;
  background-color: #e5e5e5;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
`;

//'어휘문제 정답' 인덱스의 정답 박스
const AnswerBox = styled.div`
  display: flex;
  align-items: center;
  width: 80vw-10px;
  background-color: #e5e5e5;
  border: none;
  padding-right: 10px;
  margin-bottom: 10px;
`;

//홈, 복습하기 아이콘 박스
const IconBox =  styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//지문이해도 텍스트(name(사용자 이름)을 요소로 전달받음)
class Subject extends Component{
  render(){
    return (
      <header>
        <h1 style={{display:"inline"}}>'{this.props.name}'</h1>
        <h3 style={{display:"inline"}}>님의 지문 이해도는</h3>
      </header>
    );
  }
}

function ContentBox(props) {
    const [Choice, setChoice] = useState([])
    const [Comment, setComment] = useState({})
    useEffect(async () => {
      if(props.choice)
        setChoice(props.choice);
      if(props.comment)
        setComment(props.comment);
  });
    return (
      <div style={{position: "relative"}}>
        <div style={{position: "absolute", left: "-20px", top: "-15px"}}>
          {props.isCorrect ? 
          <img alt="" src ={Right} width='50px' height='50px' /> : 
          <img alt="" src ={Wrong} width='50px' height='50px' />}
        </div>
        {props.question}
        <TextBox>{props.content}</TextBox>
        <div style={{display: "flex", justifyContent: 'space-around', width: "50vw", marginLeft: '15vw', marginRight: '15vw', marginBottom: '10px'}}>
            {Choice.map((i,j) => props.answer === i ? 
            <p key={j} style={{color: 'green'}}>{j+1}. {i}</p> : 
            ( props.answer_u === i 
              ? <p key={j} style={{color: 'red'}}>{j+1}. {i}</p> 
              : <p key={j}>{j+1}. {i}</p> 
            ))}
        </div>
        <TextBox style={{whiteSpace: 'pre-wrap'}}>
          <div>
            {Object.keys(Comment).map((i,j) => <p key = {j}>{i}</p>)}
          </div>
          <div>
            {Object.values(Comment).map((i,j) => <p key={j}>:  {i}</p>)}
          </div>
        </TextBox>
      </div>
    );
}

function ContentBox2(props) {
  const [Choice, setChoice] = useState([])
  const [Comment, setComment] = useState({})
  const [Answer_u, setAnswer_u] = useState([])
  const [Answer_u_is_correct, setAnswer_u_is_correct] = useState([])  
  useEffect(async () => {
    if(props.choice)
      setChoice(props.choice);
    if(props.comment)
      setComment(props.comment);
    if(props.answer_u)
      setAnswer_u(props.answer_u);
    if(props.answer_u_is_correct)
      setAnswer_u_is_correct(props.answer_u_is_correct)
});
  return (
    <div style={{position: "relative"}}>
      <div style={{position: "absolute", left: "-20px", top: "-15px"}}>
        {props.isCorrect ? 
        <img alt="" src ={Right} width='50px' height='50px' /> : 
        <img alt="" src ={Wrong} width='50px' height='50px' />}
      </div>
      <TextBox2>
        <div>
          {props.sentence}
        </div>
        <h4>
          {props.word}
        </h4>
        {Object.keys(Comment).map((i,j) => <p style = {{margin: 0}} key = {j}>{j+1}. {i}</p>)}
      </TextBox2>
      <div style={{marginBottom: '10px'}}>
        {props.question}
        <div style={{display: 'flex',justifyContent: 'space-around' ,width: '80vw-20px'}}>
          <div>
            {Choice.map((i,j) => <p key = {j}>{j+1}. {i}</p>)}
          </div>
          <div>
            {Answer_u.map((i,j) => Answer_u_is_correct[j] ? 
            <p style = {{color: 'green'}} key = {j}>{i}</p> : 
            <p style = {{color: 'red'}} key = {j}>{i}</p>)}
          </div>
        </div>
      </div>
      <TextBox style={{whiteSpace: 'pre-wrap'}}>
        <div>
          {Object.keys(Comment).map((i,j) => <p key = {j}>{i}:  </p>)}
        </div>
        <div>
          {Object.values(Comment).map((i,j) => <p key={j}>{i}</p>)}
        </div>
      </TextBox>
    </div>
  );
}

//메인함수
function Step4 () {
  const [Article_comprehension, setArticle_comprehension] = useState(0);
  const [Title, setTitle] = useState(' ');
  const [Name, setName] = useState(' ');
  const [Summary, setSummary] = useState(' ');
  const [SummaryU, setSummaryU] = useState(' ');
  const [KeywordScore, setKeywordScore] = useState(0);
  const [keywordAnswer, setKeywordAnswer] = useState([]);
  const [keywordUser, setKeywordUser] = useState([]);
  const [wordC, setIsWordC] = useState([]);
  const [Quiz1, setQuiz1] = useState({});
  const [Quiz2, setQuiz2] = useState({});
  const [Quiz3, setQuiz3] = useState({});
  const [Quiz4, setQuiz4] = useState({});
  const [QuizScore, setQuizScore] = useState(0);
  const [Article_avg_comprehension, setArtivle_avg_comprehension] = useState(0);
  const [isLoading, setIsLoading] = useState(1);
  const state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step5', title: '4단계', desc: '빈칸풀기', type: 1},
      {id: 'Step4', title: '5단계', desc: '결과보기', type: 0},
    ]
  }

  useEffect(async () => {
    const response = await axios.get(`https://www.geulnoon.com/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    setTitle(response.data['title']);
    console.log(Title);
  },[]);
    
  useEffect(async () => {
    const response = await axios.get(`https://www.geulnoon.com/api/Step4`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setName(response.data['name']);
    setArticle_comprehension(response.data['article_comprehension']);
    setSummary(response.data['summary'])
    setKeywordScore(response.data['keyword_score'])
    setKeywordAnswer(response.data['keyword_answer'])
    setKeywordUser(response.data['keyword_user_answer']['answer'])
    setIsWordC(response.data['is_word_correct'])
    setQuiz1(response.data['quiz1'])
    setQuiz2(response.data['quiz2'])
    setQuiz3(response.data['quiz3'])
    setQuiz4(response.data['quiz4'])
    setQuizScore(response.data['quiz_score'])
    setArtivle_avg_comprehension(response.data['avg_article_comporehension'])
    setSummaryU(response.data['user_summary'])
    setIsLoading(0)
  },[]);
    
    return (
      <div style={{display:'flex'}}>
        <NavigationBar list={state.contents} title = {Title} prev={"Study"}/> {/*화면 좌측 단계이동 바*/}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw', marginTop: '3vw'}}>
          {isLoading ? 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh'}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <CircularProgress size={30} color={'inherit'}/>
              <h2 style={{marginLeft: '10px'}}>로딩중...</h2>
            </div>
            <h4 style={{color: '#5b6d5b'}}>채점 중입니다.</h4>
          </div> : (
          <div style={{width: '80vw'}}>
            <div style={{display: 'flex'}}>
              <div style={{display: 'flex', alignItems: 'center',width: '70vw'}}>
                <Subject name={Name}></Subject>
                <div style={{width: '80px', height: '80px', 
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', backgroundColor: '#94c973',
                borderRadius: '50%', fontSize: '32px'}}>
                  {Article_avg_comprehension}%
                </div> {/*지문이해도 값*/}
              </div>
              <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between', width: '10vw'}}>
                <NavLink to="/" style={{color: 'black', textDecoration: 'none'}}>
                  <IconBox><img alt="" src ={HomeIcon} width='50px' height='50px' />홈</IconBox> {/*홈 아이콘*/}
                </NavLink>
                <NavLink to="/Review" style={{color: 'black', textDecoration: 'none'}}>
                  <IconBox><img alt="" src ={ReviewIcon} width='50px' height='50px' />복습하기</IconBox> {/*복습하기 아이콘*/}
                </NavLink>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
              <h3 style={{margin:0}}>요약하기:</h3><h1 style={{color: '#5b6d5b', margin:0, marginRight: '5px'}}>{Article_comprehension}</h1><h3 style={{margin:0, marginRight: '10px'}}>점</h3>
              <h3 style={{margin:0}}>어휘풀기:</h3><h1 style={{color: '#5b6d5b', margin:0, marginRight: '5px'}}>{QuizScore}</h1><h3 style={{margin:0, marginRight: '10px'}}>점</h3>
              <h3 style={{margin:0}}>빈칸풀기:</h3><h1 style={{color: '#5b6d5b', margin:0}}>{KeywordScore}</h1><h3 style={{margin:0}}>점</h3>
            </div>
            <div className='pointer'>요약문 정답</div>
            <TextBox>{Summary}</TextBox>
            <TextBox>사용자 요약문: {SummaryU}</TextBox>
            <AnswerBox><div className='pointer' style={{marginRight: '20px'}}>어휘풀기 정답</div>
              정답은 파란색, 사용자 답은 빨간색으로 표시 됩니다.
            </AnswerBox>
            <ContentBox question = "1. 다음 단어 중 빈칸에 들어갈 수 있는 단어를 고르시오." 
            content = {Quiz1.Test}
            choice = {Quiz1.Choice}
            comment = {Quiz1.Mean}
            answer = {Quiz1.Answer}
            answer_u = {Quiz1.Answer_u}
            isCorrect = {wordC[0]} />
            <ContentBox2 
            question ={Quiz2.Test}
            word = {Quiz2.Word}
            sentence = {Quiz2.Sentence} 
            comment = {Quiz2.MEAN}
            choice = {Quiz2.Choice}
            answer_u = {Quiz2.Answer_u}
            answer_u_is_correct = {Quiz2.Is_Correct}
            isCorrect = {wordC[1]}
            />
            <ContentBox question = {Quiz3.Type}
            content = {Quiz3.Test}
            choice = {Quiz3.Choice}
            comment = {Quiz3.Mean}
            answer = {Quiz3.Answer}
            answer_u = {Quiz3.Answer_u}
            isCorrect = {wordC[2]} />
            <ContentBox question = "4. 다음 단어 중 주어진 사전적 의미에 부합하는 단어를 고르시오." 
            content = {Quiz4.Test}
            choice = {Quiz4.Choice}
            comment = {Quiz4.Mean}
            answer = {Quiz4.Answer}
            answer_u = {Quiz4.Answer_u}
            isCorrect = {wordC[3]} />
            <AnswerBox><div className='pointer' style={{marginRight: '20px'}}>빈칸풀기 정답</div>
              {keywordAnswer.map((word,i) =>i+1+"."+word+" ")}
            </AnswerBox>
            <TextBox>
              사용자 답:
              {keywordUser.map((word,i) => word['value'] === keywordAnswer[i] ?
              <p key = {i} style={{color: 'green', marginLeft: '5px'}}>{i+1}. {word['value']}</p> : 
              <p key = {i} style={{color: 'red', marginLeft: '5px'}}>{i+1}. {word['value']}</p>)}
            </TextBox>
          </div>
          )}
        </div>
      </div>
    );
}

export default Step4;