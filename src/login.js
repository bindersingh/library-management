import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import { View  } from 'react-desktop/windows';
import lib from './lib.png';
import job from './crons';
import {PostData} from './PostData';
import {Redirect} from 'react-router-dom';
import Loader from 'react-loader-spinner';
class Login extends Component
{
  static defaultProps = {
    color: '#000000',
    theme: 'light'
  };

  constructor()
  {
    super();
    this.state={username:'',
    password: '',
    redirect: false,
    loading:false,
    usernameError:'',
    passwordError:'',
    credentialError:''
    }
    this.handleChangeusername=this.handleChangeusername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount()
  {
    if(sessionStorage.getItem('userData')==null)
    {
      console.log("cron job stop");
      job.stop();
    }
  }
  handleChangeusername(event)
  {
    this.setState({username:event.target.value});
  }
  handleChangePassword(event)
  {
    this.setState({password:event.target.value});
  }
  Validate()
  {
    let usernameError='';
    let passwordError='';
    if(this.state.username <0)
    {
      usernameError="Username is blank.";
    }
    if(this.state.password <=0)
    {
      passwordError="Password is blank.";
    }
    if(usernameError || passwordError)
    {
      this.setState({usernameError,passwordError});

      return false;
    }
    return true;
  }
 submit()
 {
   const isValid=this.Validate();
   if(isValid)
   {
   this.setState({loading:true});
   PostData(this.state).then((result)=>{
     let responseJson=result;
     console.log(responseJson);
     if(responseJson.data.token)
     {
       console.log("You are login");
       sessionStorage.setItem('userData',responseJson.data.token);
        setTimeout(()=>{
       this.setState({redirect:true});
        }, 3000);
     }
     else {
       setTimeout(()=>{
      this.setState({loading:false});
       }, 3000);
       this.setState({credentialError:"Credientials not accurate."});
       console.log("credential inaccurate");
     }
   })
 }
 }
 componentWillUnmount()
 {
  this.setState({loading:false});

 }


  render()
  {
    if(this.state.redirect)
    {
      return(<Redirect to={'/home'} />);
    }
    if(sessionStorage.getItem('userData'))
    {
      return(<Redirect to={'/home'} />);
    }
    if(this.state.loading)
    {
      // {console.log("EX")}
      return(
        <View
        color="#ffffff"
        background
        width="100%%"
        height="100%"
         horizontalAlignment="center"
         verticalAlignment="center"
        >
        <div>
        <Loader
           type="Triangle"
           color="#1766a6"
           height="100"
           width="100"
        />
        <br/>
        <span>Please wait....</span>
        </div>
              </View>
);
    }
    const Title = styled.h1`
    font-size: 2.0em;
    color: white;
    `;

    const Text = styled.p`
    font-size: ${props => props.forgot ? "13px" : "14px"};
    color:white;
    padding-bottom:${props => props.forgot ? "0px" : "30px"};
    padding-top:${props => props.forgot ? "80px" : "0px"};
    display:${props => props.forgot ? "inline-block" : "block"};
    `;

    const Button=styled.button`

    border:none;
    margin-left:20px;
    border-radius: 30px;
    padding-top:5px;
    padding-bottom:5px;
    padding-left:40px;
    padding-right:40px;
    :focus {outline:0;}

    `;



    return(
      <React.Fragment>

      <View
      color="#ffffff"
      background
      horizontalAlignment="left"
      verticalAlignment="center"
      width="100%"
      height="100%"
      >

            <View
            color="#ffffff"
            background
            width="55%"
            height="100%"
             horizontalAlignment="center"
             verticalAlignment="center"
            >
            <div>
          <img src={lib} alt="logo"  height="400px" width="400px"/>
            </div>
            </View>

            <View
            color="#2196F3"
            background
            width="45%"
            height="100%"
            padding="60px 0px 0px 40px"
            >
            <div>
            <Title>
              Login
            </Title>
            <Text>Hello Lets! go started</Text>
            <div>

            <input  style={{"width":"350px"}} type="text" placeholder="Username" value={this.state.username} onChange={this.handleChangeusername} />
            <br/>
            <input  style={{"width":"350px"}}  type="password" placeholder="Password"  value={this.state.password} onChange={this.handleChangePassword}/>
            <br/>

            <Text forgot>Forgot Password? Reset</Text>
            <Button push  onClick={this.submit}>

              Login

              </Button>
              </div>

              <Text forgot>{this.state.usernameError}</Text>

              <Text forgot>{this.state.passwordError}</Text>
              <Text forgot>{this.state.credentialError}</Text>
        </div>
           </View>

      </View>
      </React.Fragment>

    );
  }
}

export default Login;
