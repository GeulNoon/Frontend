//학습하기의 문제풀기:요약하기
import React, { useState, useEffect, Component} from 'react';
import NavigationBar from '../components/NavigationBar';
import { DragBlock } from '../components/DragBlock';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NextIcon from "../image/NextIcon.png";
import axios from "axios"
import { Formik } from "formik";

//순서배열, 직접작성 선택 버튼
const Button = styled.div`
  display: flex;
  font-weight: norwmal;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  font-size: 14px;
  color: black;
  background-color: white;
  border: 1px solid grey;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  font-size: 14px;
  color: white;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
  margin-bottom: 20px;
`;

//요약하기 제목 글씨(title(제목)과 sub(설명)을 요소로 전달받음)
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
function Step2 () {
  const [Summary, setSummary] = useState([]);
  const [Title, setTitle] = useState('');
  const [text, setText] = useState(""); //사용자가 입력한 답
  const [isSelected, SetSelected] = useState(false); 
  const [isSubmitted, SetIsSubmitted] = useState(false);
  const [sumview, setSumview] = useState(true);
  const [sumArray3, setSumArray3] = useState(['','', '']);
  const [type, setType] = useState(0);
  const [s1, sets1] = useState([]);
  const [s2, sets2] = useState([]);
  const [s3, sets3] = useState([]);

  const state = {
    contents: [
      {id: 'ReviewStep1', title: '1단계', desc: '전문보기', type: 1},
      {id: 'ReviewStep2', title: '2단계', desc: '요약하기', type: 0},
      {id: 'ReviewStep3', title: '3단계', desc: '어휘풀기', type: 1},
      {id: 'ReviewStep5', title: '4단계', desc: '빈칸풀기', type: 1},
      {id: 'ReviewStep4', title: '5단계', desc: '결과보기', type: 1},
    ]
};

const handleChange = (e) => {
  setText(e.target.value)
  setType(1)
  console.log(text)
}

const handleChange3 = (e) => {
  sumArray3[parseInt(e.target.name)] = e.target.value;
  setSumArray3(sumArray3)
  setText(sumArray3)
  setType(3)
  console.log(text)
}


  useEffect(async () => {
    const response = await axios.get(`https://www.geulnoon.com/api/title`, {params: {'a_id': sessionStorage.getItem('a_id')}});
    setTitle(response.data['title']);
    console.log(Title);
  },[]);

  useEffect(async () => {
    const response = await axios.get(`https://www.geulnoon.com/api/Step2`, {params: {'a_id': sessionStorage.getItem('a_id'), 's_id': sessionStorage.getItem('s_id')}});
    if(response){
      setSummary(response.data['summary']);
      console.log(response.data['s1'])
      sets1(response.data['s1'])
      sets2(response.data['s2'])
      sets3(response.data['s3'])
      SetIsSubmitted(response.data['issubmitted']);
    }
  },[]);


  const handleInputChange = (e) => {
    setText(e.target.value)
  }


  let Input = null;
  /*isSelected가 true일 시 순서배열, 아닐 시 직접작성*/
  if (isSelected) {
    if(type !== 1)
      setType(1)
    Input = <DragBlock data={Summary} setText = {setText}/>;
  } else {
    Input = <input
              placeholder='요약하신 문장을 입력해주세요.'
              style={{width: '80vw', height: '50px', marginTop: 20, backgroundColor: '#f6f6f6', borderWidth: '1px'}}
              onChange={handleChange}
              name="user_summary"
          />;
  }


  return (

    
    <Formik 
        initialValues={{user_summary: " ",}}
        onSubmit={({ setSubmitting }) => {
        setTimeout(() => {
          axios({
            method: "put",
            url: "https://www.geulnoon.com/api/Step2/",
            headers: { "Content-Type": "application/json" },
            params: {'s_id': sessionStorage.getItem('s_id')},
            data: { "user_summary": text, "type": type},
          }).then(
            alert('제출 성공!')
          ).catch(error => { alert('실패')
          });
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
      <form onSubmit={handleSubmit}>
        <div style={{display:'flex'}}>
          <NavigationBar list={state.contents} title={Title} prev={"Review"}/>  {/*화면 좌측 단계이동 바*/}
          <div style={{width: '90vw', display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '9vw', marginTop: '3vw'}}>
            <div style={{width: '80vw'}}>          
              <Subject title="2단계: 요약하기" sub={Summary.summary}></Subject>
              <div style={{width: '80vw', display:'flex'}}>
                <Button style = {{border: 'none', backgroundColor: 'white',  marginRight: 10, fontWeight: (sumview === true) ? 'bold':'normal'}} onClick={()=>{setSumview(true)}}>한줄 요약</Button>
                <Button style = {{border: 'none', backgroundColor: 'white', fontWeight: (sumview === false) ? 'bold':'normal'}} onClick={()=>{setSumview(false)}}>세줄 요약</Button>
              </div >
            </div>
            {sumview && <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{width: '80vw', display:'flex', margin: 10}}>
                <Button onClick={()=>{ SetSelected(true); }} style = {{backgroundColor: (isSelected === true) ? '#5b6d5b':'white', color: (isSelected === true) ? 'white':'black'}}> 순서배열 </Button>
                <Button onClick={()=>{ SetSelected(false); }} style = {{backgroundColor: (isSelected === false) ? '#5b6d5b':'white', color: (isSelected === false) ? 'white':'black'}}> 직접입력 </Button>
              </div>
              {Input}
            </div>}
            {!sumview && <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
              {'포함해야할 키워드: [' + s1.join(', ') + ']'}
              <input
              placeholder='요약하신 문장을 입력해주세요.'
              style={{width: '80vw', height: '50px', marginTop: 20, backgroundColor: '#f6f6f6', borderWidth: '1px'}}
              onChange={handleChange3}
              name="0"
          />
          {'포함해야할 키워드: [' + s2.join(', ') + ']'}
          <input
              placeholder='요약하신 문장을 입력해주세요.'
              style={{width: '80vw', height: '50px', marginTop: 20, backgroundColor: '#f6f6f6', borderWidth: '1px'}}
              onChange={handleChange3}
              name="1"
          />
          {'포함해야할 키워드: [' + s3.join(', ') + ']'}
          <input
              placeholder='요약하신 문장을 입력해주세요.'
              style={{width: '80vw', height: '50px', marginTop: 20, backgroundColor: '#f6f6f6', borderWidth: '1px'}}
              onChange={handleChange3}
              name="2"
          />
          </div>}
            <div style={{width: '80vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            {<div><SubmitButton type="submit">제출하기</SubmitButton></div>}
              <NavLink to="/Study/Step3">
                <img alt="" src ={NextIcon} width='37.5px' height='37.5px'/>               
            </NavLink> {/*다음 단계 버튼*/}
            </div>
          </div>
        </div>
      </form>
    )
  }}
  </Formik>
  );
}

export default Step2;