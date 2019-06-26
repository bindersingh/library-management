// import React from 'react';
// import { View, Text } from 'react-desktop/windows';
// import styled from 'styled-components';
// import { Button } from 'react-desktop/windows';
// import db from '../db';
// class ReIssueForm extends React.Component
// {
//   constructor(props)
//   {
//     super(props);
//     this.state={
//     fromDate:'',
//     toDate:'',
//     bookDetails:this.props.bookDetails,
//     toDateError:'',
//     fromDateError:'',
//     dateError:''
//   }
//   }
//   componentDidMount()
//   {
//     this.setState({fromDate:this.state.bookDetails.from_date});
//     this.setState({toDate:this.state.bookDetails.to_date});
//   }
//   handleChangeFromDate=(evt)=>
//   {
//     this.setState({fromDate:evt.target.value});
//   }
//   handleChangeToDate=(evt)=>
//   {
//
//     this.setState({toDate:evt.target.value});
//   }
//   validate()
//   {
//     let dateError='';
//     let toDateError='';
//     let fromDateError='';
//
//     if(this.state.toDate.length<=0)
//     {
//       toDateError="Please enter toDate";
//     }
//     if(toDateError)
//     {
//       this.setState({toDateError});
//       this.setState({dateError:''});
//       return false;
//     }
//     else
//     {
//     let d1 =new Date(this.state.fromDate);
//     let d2 =new Date(this.state.toDate);
//     let timeDiff = d2.getTime() - d1.getTime();
//     let dateError = timeDiff / (1000 * 3600 * 24);
//     if(dateError<=0)
//     {
//       this.setState({fromDateError:''});
//       this.setState({toDateError:''});
//       dateError="You enter wrong dates";
//       this.setState({dateError});
//       return false;
//     }
//     }
//     return true;
//   }
//   handleSubmit=()=>
//   {
//     const isValid=this.validate();
//     if(isValid)
//     {
//       this.setState({fromDateError:''});
//       this.setState({toDateError:''});
//       this.setState({dateError:''});
//       this.updateRecord();
//     }
//
//   }
//   updateRecord=()=>
//   {
//     console.log("Update record is executed");
//       console.log(this.state.toDate);
//        db.bookissues.update(this.state.bookDetails.id,{status:2,to_date:this.state.toDate}).then((updated)=> {
//          if (updated)
//          {
//            alert("BOOK IS RE-ISSUE");
//          }
//          else
//          {
//            alert("BOOK IS NOT RE-ISSUE");
//          }
//      });
//
//   }
//   render()
//   {
//     const Text=styled.span`
//     width: 300px;
//     height: 30px;
//     display:block;
//     font-family: Raleway;
//     font-style: normal;
//     font-weight: 300;
//     font-size: 15px;
//     line-height: 23px;
//     color: #000000;
//
//     `;
//     const Button=styled.button`
//     border:${props => props.cancel ? "1px solid #CCCCCC" : "1px solid #ffa829"};
//     background: ${props => props.cancel ? "#CCCCCC" : "#ffa829"};
//     box-sizing: border-box;
//     width: 179px;
//     height: 40px;
//     color:${props => props.cancel ? "black" : "white"};
//     margin-left:${props => props.cancel ? "20px" : ""};
//     `;
//     return(<React.Fragment>
//     <View>
//     <div>
//     <div>
//     <Text style={{"marginTop":"10px"}}>Enter From Date</Text>
//     <input disabled className="inputs" value={this.state.fromDate} onChange={this.handleChangeFromDate} style={{"height":"40px","cursor": "not-allowed"}} type="date" placeholder="From Date" />
//     <div style={{fontSize:14,color:"#ea3d49",marginTop:"-15px"}}>{this.state.fromDateError}</div>
//     </div>
//     <div>
//     <Text style={{"marginTop":"10px"}}>Enter To Date</Text>
//     <input className="inputs"  value={this.state.toDate} onChange={this.handleChangeToDate} style={{"height":"40px",borderColor:this.state.toDateError!=''? "#ea3d49" : this.state.dateError!=''?'#ea3d49':''}} type="date" placeholder="To Date" />
//     <div style={{fontSize:14,color:"#ea3d49",marginTop:"-15px"}}>{this.state.toDateError}</div>
//       <div style={{fontSize:14,color:"#ea3d49",marginTop:"-15px"}}>{this.state.dateError}</div>
//     </div>
//     <div style={{"textAlign":"center",'marginTop':"10px"}}>
//     <Button push onClick={this.handleSubmit}>
//     Book Re-Issue
//     </Button>
//     </div>
//
//     </div>
//     </View>
//     </React.Fragment>);
//   }
// }
// export default ReIssueForm;
