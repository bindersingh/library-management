import React, { Component } from 'react';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import db from '../db';
class Settings extends Component
{
  constructor() {
     super();
     this.state = {
                  redirect:false,
                  day_limit:'',
                  book_limit:'',
                  fine_per_day:'',
                  day_limit_error:'',
                  book_limit_error:'',
                  fine_limit_error:''
                  }
  }
  componentDidMount()
  {
    db.settings.get({id:1}).then ((settings)=> {
      if(settings!==undefined)
      {
      this.setState({day_limit:settings.day_limit});
      this.setState({book_limit:settings.book_limit});
      this.setState({fine_per_day:settings.fine_per_day});
      }
      else
      {
      db.settings.add({id:1,day_limit:2,book_limit:2,fine_per_day:2});
      }
    });
  }
  logout=()=>
  {
    sessionStorage.setItem('userData','');
    sessionStorage.clear();
    this.setState({redirect:true});
  }
  day_limit_change=(evt)=>
  {
    this.setState({day_limit:evt.target.value});
  }
  book_limit_change=(evt)=>
  {
    this.setState({book_limit:evt.target.value});
  }
  fine_per_day=(evt)=>
  {
    this.setState({fine_per_day:evt.target.value});
  }
  update_settings=()=>
  {
  const isValid=this.validation();
    if(isValid)
    {
    console.log("update settings executed");
    db.settings.update(1,{day_limit:this.state.day_limit,book_limit:this.state.book_limit,fine_per_day:this.state.fine_per_day}).then((updated)=> {
      if (updated)
      {
          alert("Settings are updated.");
      }
      else
      {
        alert("Settings are not updated.");
      }
  });
}
}
validation=()=>
{
  let day_limit_error='';
  let book_limit_error='';
  let fine_limit_error='';
  if(this.state.day_limit<=0)
  {
    day_limit_error="day Limit is required";
  }
  if(this.state.book_limit<=0)
  {
    book_limit_error="Book Limit is required";
  }
  if(this.state.fine_per_day<=0)
  {
    fine_limit_error="Fine per day is required";
  }
  if(day_limit_error!=='' || book_limit_error!=='' || fine_limit_error!=='')
  {
    this.setState({day_limit_error,book_limit_error,fine_limit_error});
    return false;
  }
  else {
    this.setState({day_limit_error:'',book_limit_error:'',fine_limit_error:''});
    return true;
  }

}
  render()
  {
    if(this.state.redirect)
    {
      return(<Redirect to={'/'} />);
    }
    const Text = styled.h1`
    width: auto;
    height: 43px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    line-height: 42px;
    color: #000000;
      `;
      const Button=styled.button`
      border:${props => props.update ? "1px solid #009688" : "1px solid #ffa829"};
      background: ${props => props.update ? "#009688" : "#ffa829"};
      box-sizing: border-box;
      width:${props => props.update ? "100px" : "179px"};
      height: 38px;
      text-decoration:none !important;
      color:${props => props.update ? "white" : "white"};

      `;
      const Title=styled.span`
      width: 300px;
      height: 30px;
      display:block;
      font-family: Raleway;
      font-style: normal;
      font-weight: 300;
      font-size: 15px;
      line-height: 23px;
      color: #000000;
      `;
    return(
      <React.Fragment>
      <View
          horizontalAlignment="left"
          verticalAlignment="left"
          width="100%"
          >
      <View
          color="white"
          background
          horizontalAlignment="left"
          verticalAlignment="left"
          width="100%"
          >
          <Text>Settings</Text>
      </View>
      <View
          color="white"
          background
          horizontalAlignment="right"
          verticalAlignment="left"
          width="100%"
          >
          <Button push onClick={this.logout}>
          Logout
          </Button>
      </View>
      </View>

      <View

        horizontalAlignment="left"
          verticalAlignment="left"
          width="100%"
          paddingTop="10px"
        >


          <div>
          <Title>Day Limits</Title>
          <input  className="inputs" style={{borderColor:this.state.day_limit_error!==''? "#ea3d49" : ""}} value={this.state.day_limit} onChange={this.day_limit_change}  type="number" placeholder="Enter day limits"   name="title" />
        <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px",marginBottom:'10px'}}>{this.state.day_limit_error}</div>
          </div>

          <div style={{"paddingLeft":"40px"}}>
          <Title>Book Limits</Title>
          <input  className="inputs" style={{borderColor:this.state.book_limit_error!==''? "#ea3d49" : ""}} value={this.state.book_limit} onChange={this.book_limit_change} type="number" placeholder="Enter book limits"  name="publisher"/>
        <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px",marginBottom:'10px'}}>{this.state.book_limit_error}</div>
          </div>


      </View>
      <View

          horizontalAlignment="left"
          verticalAlignment="left"
          width="100%"
          marginTop="-10px"
        >
        <div>
        <Title>Fine</Title>
        <input  className="inputs" style={{borderColor:this.state.fine_limit_error!==''? "#ea3d49" : ""}} value={this.state.fine_per_day} onChange={this.fine_per_day} type="number" placeholder="Fine per day"   name="title" />
        <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px",marginBottom:'10px'}}>{this.state.fine_limit_error}</div>
        </div>

      </View>

      <div>

      <Button push color="#009688" update  onClick={this.update_settings}>
      Update
      </Button>
      </div>
      </React.Fragment>
    );
  }
}
export default Settings
