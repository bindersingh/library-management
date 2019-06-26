import React, { Component } from 'react';
import { NavPane, NavPaneItem ,Window } from 'react-desktop/windows';
import db from '../db';
import job from '../crons';
import '../App.css';
import { FiBookOpen } from 'react-icons/fi';
import { IconContext } from "react-icons";
import {FaBookmark} from "react-icons/fa";
import {Redirect} from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import ViewBooks from '../Home/viewBooks';
import Settings from '../Settings/settings';
import SearchModule from '../BookIssue/searchModule';

class Home extends Component
{
  static defaultProps = {
    color: '#cc7f29',
    theme: 'dark'
  };
  constructor() {
     super();
     this.state = {
                  selected: 'Dashboard',
                  redirect:false
                  }
     db.open();
   }

   componentDidMount() {
     if(sessionStorage.getItem('userData'))
     {
       console.log("Cron job start");
       job.start();
     }
   }

  render() {
    if(this.state.redirect)
    {
      return(<Redirect to={'/'} />);
    }
    return (
      <Window
        color={this.props.color}
        theme={this.props.theme}
        chrome
        width="100%"
        height="100%"
        background="#1766A6"
      >

        <NavPane openLength={200} push color="#CCCCCC"  theme={this.props.theme}>
        {this.item('Dashboard', 'Content 1')}
        {this.item('Books', 'Content 1')}
        {this.item('Book Activity', 'Content 2')}
        {this.item('Settings','Content 3')}
        </NavPane>
       </Window>
    );
  }
  item(title, content) {
   return (
       <NavPaneItem
         title={title}
         icon={this.icon(title)}
         theme="light"
         background="#ffffff"
         selected={this.state.selected === title}
         onSelect={() => this.setState({ selected: title })}
         padding="10px 20px"
         push
       >
        {this.Content(title)}
       </NavPaneItem>
     );
   }



   Content(x)
{
  switch(x)
  {
  case 'Dashboard':
  return(
    <h3>Welcome in Library Management</h3>
  );
  case 'Books':
  return(
    <ViewBooks/>
    );
  case 'Book Activity':
  return(
    <SearchModule/>
    );
  case 'Settings':
  return(<Settings/>
    );
}}


   icon(name) {
     const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';
     switch(name) {
       case 'Dashboard':
       return(
         <IconContext.Provider value={{ color: "white", className: "global-class-name",size:"1.2em" }}>
          <div><MdDashboard/></div>
         </IconContext.Provider>
        );
       case 'Books':
       return (
         <IconContext.Provider value={{ color: "white", className: "global-class-name",size:"1.2em" }}>
          <div><FiBookOpen/></div>
         </IconContext.Provider>
       );
       case 'Book Activity':
       return (
         <IconContext.Provider value={{ color: "white", className: "global-class-name",size:"1.2em" }}>
          <div><FaBookmark/></div>
         </IconContext.Provider>
       );
       case 'Settings':
         return (
         <IconContext.Provider value={{ color: "white", className: "global-class-name",size:"1.6em" }}>
          <div><IoIosSettings/></div>
         </IconContext.Provider>
         );

     }
   }
}
export default Home
