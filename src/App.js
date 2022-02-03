import React ,{Component} from 'react';
import { BrowserRouter,Route, NavLink, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Study from "./screens/Study";
import Review from "./screens/Review";
import Result from "./screens/Result";
import MyPage from "./screens/MyPage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Step1 from './screens/Step1';
import Step2 from './screens/Step2';
import Step3 from './screens/Step3';
import Step4 from './screens/Step4';
import ReviewStep1 from './screens/ReviewStep1';
import ReviewStep2 from './screens/ReviewStep2';
import ReviewStep3 from './screens/ReviewStep3';
import ReviewStep4 from './screens/ReviewStep4';
import Answer from './screens/Answer';
import More from './screens/More';

class Subject extends Component{
  render(){
    
    return (
      <header style={{display: 'inline'}}>
        <h1 style={{display: 'inline'}}>
            <NavLink style={{color: 'black', textDecoration: 'none', marginRight: 160}} 
            to="/" >글눈
            </NavLink>
        </h1>
      </header>
    );
  }
}

class TOC extends Component{
  render(){
    var list = [];
    var i = 0;
    while (i<this.props.data.length){
      var data = this.props.data[i];
      list.push(
          <h4 style={{display: 'inline', fontSize: '14px'}} key={data.id}>
            <NavLink 
              style={({ isActive }) => ({ color: isActive ? '#a2bea2' : 'black', textDecoration: 'none' })} 
              to={{pathname: `${data.id}`}}>{data.title} 
            </NavLink>
          </h4>);
      i = i+1;
    }
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', width: '70%', height: '40px'}}>
        {list}
      </div>
    );
  }
}

class App extends Component {
  state = {
    contents: [
      {id: 'Study', title: '학습하기', desc: '학습하기 기능'},
      {id: 'Review', title: '오답노트', desc: '오답노트 기능'},
      {id: 'Result', title: '학습결과', desc: '학습결과 기능'},
      {id: 'MyPage' , title: '내정보', desc: '내정보 기능'}
    ]
  }
  render() {
    let signinButton = null;
    if(sessionStorage.getItem('user') === null)
      signinButton = <NavLink style={{}} to="/Login" >
        <button style={{border: 'none', backgroundColor: 'white', color: 'grey', }}>로그인</button>    
        </NavLink>
    else
      signinButton = <button style={{border: 'none', backgroundColor: 'white', color: 'grey', }}
          onClick={() => {sessionStorage.removeItem('user'); window.location.replace("/")}}>로그아웃
        </button>    
    return (
      <BrowserRouter> 
        <div>
          <div style={{position: 'fixed', height: '75px', width: '100%', backgroundColor: 'white', zIndex: 1}}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {signinButton}
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
              <Subject></Subject>
              <TOC data={this.state.contents}></TOC>
            </div>
          </div>
          <div style={{paddingTop: '75px'}}>
          <Routes> 
            <Route exact path="*" element={<Home/>}/> 
            <Route path="/Study/*" element={<Study/>}/>
            <Route path="/Review/*" element={<Review/>}/>
            <Route path="/Result" element={<Result/>}/>
            <Route path="/MyPage" element={<MyPage/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Study/Step1" element={<Step1/>}/>
            <Route path="/Study/Step2" element={<Step2/>}/>
            <Route path="/Study/Step3" element={<Step3/>}/>
            <Route path="/Study/Step4" element={<Step4/>}/>
            <Route path="/Review/ReviewStep1" element={<ReviewStep1/>}/>
            <Route path="/Review/ReviewStep2" element={<ReviewStep2/>}/>
            <Route path="/Review/ReviewStep3" element={<ReviewStep3/>}/>
            <Route path="/Review/ReviewStep4" element={<ReviewStep4/>}/>
            <Route path="/Review/Answer" element={<Answer/>}/>
            <Route path="/Result/More" element={<More/>}/>
          </Routes>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;