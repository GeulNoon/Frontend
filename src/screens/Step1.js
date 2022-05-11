//학습하기의 문제풀기:전문보기
import React, { useState, useEffect, Component, useRef } from 'react';
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

//전문보기 제목 글씨(title(제목)과 sub(설명)을 요소로 전달받음)
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
function Step1 () {
  const [Title, setTitle] = useState(' ');
  const [Content, setContent] = useState(' ');
  const [Submiited, setSubmitted] = useState(' ');
  const [timer, setTimer] = useState(true);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(2);
  const time = useRef(120);
  const timerId = useRef(null)
  
  useEffect(() => {
    if(sessionStorage.getItem('timer') !== 'done'){
      timerId.current = setInterval(() => {
        if (time.current === -1) {
          clearInterval(timerId.current);
          sessionStorage.setItem('timer', 'done');
          setTimer(false)
        }
        else {
          setMin(parseInt(time.current / 60));
          setSec(time.current % 60);
          time.current -= 1;
        }
      }, 1000);
      return () => clearInterval(timerId.current);
    }
    else
      setTimer(false)
  });

  const state = {
    contents: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 0},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 2},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 2},
      {id: 'Step5', title: '4단계', desc: '빈칸풀기', type: 2},
      {id: 'Step4', title: '5단계', desc: '결과보기', type: 2},
    ],
    contents_done: [
      {id: 'Step1', title: '1단계', desc: '전문보기', type: 0},
      {id: 'Step2', title: '2단계', desc: '요약하기', type: 1},
      {id: 'Step3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'Step5', title: '4단계', desc: '빈칸풀기', type: 1},
      {id: 'Step4', title: '5단계', desc: '결과보기', type: 1},
    ]
  }

  useEffect(async () => { 
    const response = await axios.get(`http://127.0.0.1:8000/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    setTitle(response.data['title']);
    console.log(Title);
  },[]);


  useEffect(async () => {
    if(sessionStorage.getItem('s2') === '0') {
        axios.put(`http://127.0.0.1:8000/api/Step1/`, {a_id: sessionStorage.getItem('a_id'), s_id: sessionStorage.getItem('s_id')})
        .then(response => {
          console.log('ok')
          sessionStorage.setItem('s2', response.data['s2'])
    }).catch(error => {
      // 오류발생시 실행
    }).then(() => {
      // 항상 실행
    });
  }
  },[]);


  useEffect(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/Step1`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    setContent(response.data["content"]);
    setSubmitted(response.data["issubmitted"]);
  },[]);

  const [word, setWord] = useState('');
  const [result, setResult] = useState([]);
  const [isVisible, setIsVisible] = useState(0);
  const onSubmitSearch = () => {
    setTimeout(() => {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/searchWord/",
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
        url: "http://127.0.0.1:8000/api/getAnswer/",
        headers: { "Content-Type": "application/json" },
        params: {'a_id': sessionStorage.getItem('a_id')},
        data: { "question": question},
      }).then((res)=> setAnswer(res["data"]["answer"], setIsAnswerVisible(1))
      ).catch(error => {
        alert('검색 실패!')
    });
    }, 500);
  }

  const handleClick = (e) => {
    if(sessionStorage.getItem('s2') !=='ok' || timer)
      e.preventDefault()
  }
  
    return (
      <div style={{display:'flex'}}>
        {timer ? <NavigationBar list={state.contents} title = {Title} prev={"Study"}/> : <NavigationBar list={state.contents_done} title = {Title} prev={"Study"}/>}
        <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw', marginTop: '3vw'}}>
          <div style={{width: '80vw'}}>          
            <Subject title="1단계: 전문보기" sub="글을 자세히 읽어주세요. 일정 시간동안 다음 단계로 넘어갈 수 없습니다."></Subject>
          </div>
          <div style={{display:'flex'}}>
            <TextBox>{Content}</TextBox>
            <div style = {{marginLeft: '3vw'}}>
              {timer && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
              width: '25vw', height: '40px', border: '1px solid #5b6d5b', backgroundColor: '#f8f7f3',
              fontSize: '18px', fontWeight: 'bold', borderRadius: '5px'}}>
                남은 시간: <p style={{color:'#5b6d5b'}}>{min}</p> : <p style={{color:'#5b6d5b'}}>{sec}</p>
              </div>}
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
            <NavLink onClick={handleClick}  to="/Study/Step2">
              <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
              </NavLink> {/*다음 단계 버튼*/}
          </div>
        </div>
    </div>
  );

}

export default Step1;