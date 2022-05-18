//처음들어 갔을 때 기본 화면(홈화면)
import React ,{Component} from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import main from '../image/main.png';
import main2 from '../image/main2.png';
import button from '../image/button.png';

//중앙에 배치된 4개의 버튼 디자인
const Button = styled.button`
  width: 90%;
  height: 80%;
  color: red;
  font-size: 36px;
  border: none;
  border-radius: 20px;
`;

//4개 버튼 안에 누르면 해당 링크로 가는 NavLink를 배치하여 배열에 저장
class TOC extends Component{
  render(){
    var list = [];
    var i = 0;
    while (i<this.props.data.length){
      var data = this.props.data[i];
      list.push(
        <Button key={data.id} color={data.color}>
            <NavLink style={{ color: 'white', textDecoration: 'none' }} to={{pathname: `${data.id}`}}>{data.title} </NavLink>
        </Button>);
      i = i+1;
    }
    return (
      <>
        {list}
      </>
    );
  }
}

//메인 함수
class Home extends Component {
  state = {
    //TOC에 전달해줄 요소
    contents: [
      {id: 'Study', title: '학습하기', desc: '학습하기 기능', color: '#5b6d5b'},
      {id: 'Review', title: '복습하기', desc: '오답노트 기능', color: '#94c973'},
      {id: 'Result', title: '학습결과', desc: '학습결과 기능', color: '#4b754b'},
      {id: 'Login' , title: '로그인', desc: '로그인 기능', color: '#5b6d5b'}
    ]
  }

  render() {
    return (
        /*<div style={{display: 'flex', alignItems:'center', justifyContent: 'space-around', height: '80vh'}}>
        <TOC data={this.state.contents}></TOC>
        </div>*/
        <Wrapper>
          <LeftWrapper>
              <img alt="" className='main' src={main} style={{width: '100%', height: '100%'}}/>
          </LeftWrapper>
          <RightWrapper>
			        <img alt="" className='main' src={main2} style={{width: '100%', height: '100%'}}/>
			        <div className="button" style={{position: 'absolute', top: '58%', left: '37%'}}>
                <NavLink to="/Study">
                  <img alt="" src ={button} width='60%' height='60%'/>               
                                 </NavLink>
			        </div>
          </RightWrapper>
        </Wrapper>
    )
  }
}

export default Home;


/*<Button>
            <NavLink style={{ color: 'green', textDecoration: 'none' }} to="/Study"> 학습하기</NavLink>
  </Button>*/

// background-color: #37805b;
const Wrapper = styled.div`
  display: flex;
  height: 85vh;
`;

//좌측 요소 박스(학습하기 제목, 제목 입력창 등)
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  padding: 10px;
`;

//우측 요소 박스(지문 내용 입력창, 학습시작 버튼 등)
const RightWrapper = styled.div`
  padding: 10px;
  display: flex;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items : center;
  position: relative;
`;
