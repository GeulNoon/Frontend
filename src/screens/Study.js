import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
  width: 100vw;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  width: 25vw;
  margin-left: 10vw;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85vh;
  width: 55vw;
  margin-left: 10vw;
`;

const BorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
  width: 600px;
  border: 1px solid #5b6d5b;
  border-radius: 20px;
  font-size: 14px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 175px;
  width: 100%;
  font-size: 14px;
  border-radius: 20px;
  background-color: #d1dfd1;
  color: #5b6167;
  white-space: pre;
  line-height: 200%;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15vw;
  height: 5vh;
  font-size: 14px;
  color: white;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
  margin-top: 10px;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  width: 50px;
  font-size: 14px;
  :hover {
    color: #5b6d5b;
  }
  border: none;
`;

const ArticleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 550px;
  border-bottom: 1px solid grey;
`;

const ArticleContentWrapper = styled.div`
  width: 500px;
`;

class SubjectMain extends Component{
  render(){
    return (
      <header>
        <h1>학습하기</h1>
        <h6 style={{color: "#676767"}}>학습대상이 될 기사를 직접 선택할 수 있습니다.</h6>
      </header>
    );
  }
}

class Subject extends Component{
  render(){
    return (
      <header>
        <h2>{this.props.title}</h2>
      </header>
    );
  }
}

class Article extends Component{
  render(){
    return(
      <ArticleWrapper>
      <input style={{width: '12px', height: '12px', margin: '5px'}} type="radio" name="recommend"/>
        <ArticleContentWrapper>
          <h4 style={{margin: '5px'}}>
            {this.props.title}
          </h4>
          <h6 style={{margin: '5px', color: '#676767'}}>
            {this.props.desc}
          </h6>
        </ArticleContentWrapper>
      </ArticleWrapper>
    )
  }
}

class Study extends Component {
  state = {
    value: '경제',
    isRecommend: 1,
    url: ''
  }
  handleChange = (e) => {
    this.setState({
      url: e.target.value
    })
  }
  render() {
    const contents = ['경제','사회','세계','과학']
    const category = contents.map((title) => 
      (<Category key={title} onClick={()=>{this.setState({value: title})}}>
        {title}
      </Category>))
    const { isRecommend, url } = this.state;
    let Warning = null;
    if (isRecommend) {
      Warning = "기사를 선택해주세요!"
    } else if(!isRecommend && url === '') {
      Warning = "URL을 입력해주세요!"
    }
    return (
      <Wrapper>
          <LeftWrapper>
            <SubjectMain></SubjectMain>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input style={{width: '15px', height: '15px', margin: '0px'}} type="radio" name="select" onChange={()=>{this.setState({isRecommend: 0})}}/>
              <Subject title="사용자 선택 기사"></Subject>
            </div>
            <div style={{display: 'flex', alignItems:'center'}}>
              <h3 style={{marginRight: '10px'}}>기사주소</h3>
              <input placeholder="URL을 입력해주세요" style={{width: '15vw',marginBottom:'0px',padding:'5px'}} value = {this.state.url} onChange={this.handleChange}></input>
            </div>
              <ContentWrapper>
              {`글눈 서비스는\n교육을 목적으로 한 비영리 사이트로,\n상업적으로 뉴스 기사를\n게재하지 않습니다.`}
              </ContentWrapper>
          </LeftWrapper>
          <RightWrapper>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <input style={{width: '15px', height: '15px', margin: '0px'}} type="radio" name="select" onChange={()=>{this.setState({isRecommend: 1})}}/>
              <Subject title="추천 기사"></Subject>
            </div>
            <div style={{display: 'flex'}}>
              {category}
            </div>
            {(() => {
              switch (this.state.value) {
                case '경제':
                  return <BorderWrapper>경제
                            <Article title="영국 총리 '봉쇄 중 술파티' 사과 안 통하나…가족 확진까지" 
                            desc="보리스 존슨 영국 총리가 코로나19 봉쇄 중 총리실 술파티 참석에 관해
                            진심으로 사과하고 싶다고 말했지만 민심은 여전히 냉랭하다. ..."/>
                          </BorderWrapper>
                case '사회':
                  return <BorderWrapper>사회
                            <Article title="영국 '봉쇄 중 술파티' 사과 안 통하나…가족 확진까지" 
                            desc="보리스 존슨 영국 총리가 코로나19 봉쇄 중 총리실 술파티 참석에 관해
                            진심으로 사과하고 싶다고 말했지만 민심은 여전히 냉랭하다. ..."/>
                          </BorderWrapper>
                case '세계':
                  return <BorderWrapper>세계
                            <Article title="영국 총리 '봉쇄 중 술파티' 사과 안 통하나…가족 확진까지" 
                            desc="보리스 존슨 영국 총리가 코로나19 봉쇄 중 총리실 술파티 참석에 관해
                            진심으로 사과하고 싶다고 말했지만 민심은 여전히 냉랭하다. ..."/>
                          </BorderWrapper>
                case '과학':
                  return <BorderWrapper>과학
                            <Article title="영국 총리 '봉쇄 중 술파티' 사과 안 통하나…가족 확진까지" 
                            desc="보리스 존슨 영국 총리가 코로나19 봉쇄 중 총리실 술파티 참석에 관해
                            진심으로 사과하고 싶다고 말했지만 민심은 여전히 냉랭하다. ..."/>
                          </BorderWrapper>
                default:
                  return '경제'
              }
            })()}
            {Warning}
            <NavLink style={{ color: 'white', textDecoration: 'none' }} 
              to="Step1">
                <Button>
                  학습 시작
                </Button>
            </NavLink>
          </RightWrapper>
      </Wrapper>
    );
  }
}

export default Study;