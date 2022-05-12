import React ,{Component} from 'react';
import { HashRouter,Route, NavLink, Routes } from "react-router-dom";
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
import Step5 from './screens/Step5';
import ReviewStep1 from './screens/ReviewStep1';
import ReviewStep2 from './screens/ReviewStep2';
import ReviewStep3 from './screens/ReviewStep3';
import ReviewStep4 from './screens/ReviewStep4';
import ReviewStep5 from './screens/ReviewStep5';
import Answer from './screens/Answer';
import More from './screens/More';
import EditMypage from './screens/MyPage_Edit';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import logo from './image/logo.png';

class Subject extends Component{
  render(){
    
    return (
      <header style={{display: 'inline'}}>
        <h1 style={{display: 'inline'}}>
            <NavLink style={{color: 'black', textDecoration: 'none', marginRight: 150}} 
            to="/" >
              <img alt="" className='logo' src={logo} style={{width: '170px'}}/>
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
          <h4 style={{display: 'inline', fontSize: '18px'}} key={data.id}>
            <NavLink 
              style={({ isActive }) => ({ color: isActive ? '#a2bea2' : 'black', textDecoration: 'none' })} 
              to={{pathname: `${data.id}`}}>{data.title} 
            </NavLink>
          </h4>);
      i = i+1;
    }
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '70%', height: '40px'}}>
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
        <button style={{border: 'none', backgroundColor: 'white', color: 'grey', marginRight:20,}}>로그인</button>    
        </NavLink>
    else
      signinButton = <button style={{border: 'none', backgroundColor: 'white', color: 'grey', marginRight:20}}
          onClick={() => {sessionStorage.removeItem('user'); window.location.replace("/")}}>로그아웃
        </button>    
    return (
      <HashRouter basename="/"> 
        <div>
          <div style={{position: 'fixed', height: '10vh', width: '100%', backgroundColor: 'white', zIndex: 1}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '5px'}}>
              {signinButton}
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', backgroundColor: 'white'}}>
              <Subject></Subject>
              <TOC data={this.state.contents}></TOC>
            </div>
          </div>
          <div style={{paddingTop: '15vh'}}>
          <Routes> 
          <Route exact path="*" element={<Home/>}/> 
          <Route path="/Study/*" element={<PrivateRoute><Study/></PrivateRoute>}/>
            <Route path="/Review/*" element={<PrivateRoute><Review/></PrivateRoute>}/>
            <Route path="/Result" element={<PrivateRoute><Result/></PrivateRoute>}/>
            <Route path="/MyPage" element={<PrivateRoute><MyPage/></PrivateRoute>}/>
            <Route path="/Login" element={<PublicRoute><Login/></PublicRoute>}/>
            <Route path="/Register" element={<PublicRoute><Register/></PublicRoute>}/>
            <Route path="/Study/Step1" element={<PrivateRoute><Step1/></PrivateRoute>}/>
            <Route path="/Study/Step2" element={<PrivateRoute><Step2/></PrivateRoute>}/>
            <Route path="/Study/Step3" element={<PrivateRoute><Step3/></PrivateRoute>}/>
            <Route path="/Study/Step4" element={<PrivateRoute><Step4/></PrivateRoute>}/>
            <Route path="/Study/Step5" element={<PrivateRoute><Step5/></PrivateRoute>}/>
            <Route path="/Review/ReviewStep1" element={<PrivateRoute><ReviewStep1/></PrivateRoute>}/>
            <Route path="/Review/ReviewStep2" element={<PrivateRoute><ReviewStep2/></PrivateRoute>}/>
            <Route path="/Review/ReviewStep3" element={<PrivateRoute><ReviewStep3/></PrivateRoute>}/>
            <Route path="/Review/ReviewStep4" element={<PrivateRoute><ReviewStep4/></PrivateRoute>}/>
            <Route path="/Review/ReviewStep5" element={<PrivateRoute><ReviewStep5/></PrivateRoute>}/>
            <Route path="/Review/Answer" element={<PrivateRoute><Answer/></PrivateRoute>}/>
            <Route path="/Result/More" element={<PrivateRoute><More/></PrivateRoute>}/>
            <Route path="/Mypage/edit" element={<PrivateRoute><EditMypage/></PrivateRoute>}/>
          </Routes>
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;