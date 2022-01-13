import React, { Component } from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@mui/material';

class Choice extends Component {
    state = {
        selectList: ["1","2","3","4","5"],
        example: ["창조", "전망", "가치", "도시", "인재"],
      }
    handleChange = (e) => {
        console.log(`선택한 값 : ${e.target.value}`);
    };
    render() {
      return (
          <div style={{marginTop: 10, marginBottom:10}}>
            다음 단어 중 빈칸에 들어갈 수 있는 단어를 고르시오.
            <div style={{width: '80vw', 
                height: '10vh',
                display:'flex', 
                justifyContent: 'center',
                alignItems: 'center', 
                backgroundColor: '#e5e5e5'}}>
             진수는 미래에 대해 낙관적인 _____를 가지고 있다.
            </div>
            <div style={{
                width: '80vw',
                display:'flex', 
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <FormControl component="fieldset">
                <RadioGroup
                    row
                    aria-label="select"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={this.handleChange}
                >
                    {this.state.selectList.map((value, i) => (
                    <div style={{width: '100px'}} key={i}>
                        <FormControlLabel value={value} control={<Radio color='success' />} label={value+'. '+this.state.example[i]} />
                    </div>
                    ))}
                </RadioGroup>
                </FormControl>
            </div>
          </div>
      );
    }
  }
  
  export default Choice;