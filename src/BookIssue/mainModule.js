import React from 'react';
import { View ,Radio} from 'react-desktop/windows';
import styled from 'styled-components';
import db from '../db';
import 'bootstrap/dist/css/bootstrap.css';
import profile from '../profile.png';
// import bars from '../barcode.gif';
import { Button } from 'react-desktop/windows';
import BarcodeReader from 'react-barcode-reader'
// import BookIssueForm from '../BookIssue/bookIssueForm';
// import ReIssueReTurn from '../BookIssue/reIssue_reTurn';
class MainModule extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      studentDetails:this.props.studentDetails,
      bookUbn:'',
      issue:false,
      bookUbnError:'',
      bookExistError:'',
      bookIssueMsg:'',
      bookReturnedMsg:'',
      reIssue_reTurn:false,
      radioStatus:'reissue',
      alreadyIssue:'',
      bookReissueMsg:''
      // temp_1:'',
      // temp_2:''

    }

  this.handleScan = this.handleScan.bind(this);

  }

  handleScan(data){
    data=data.trim();
    
    if(this.state.bookUbn)
    {
      console.log("IF");
      this.setState({bookUbn:''});
      this.setState({
        bookUbn: data,
      });
    }
    else {
      console.log("ELSE");
      this.setState({
        bookUbn: data,
      })
    }
    console.log(this.state.bookUbn);
    this.handleSubmit(data);
  }

  handleError(err){
    console.error(err)
  }
  // handleChange=(evt)=>
  // {
  //   console.log("handle change is executed always.");
  //   //this.setState({temp_2:evt.target.value});
  //   // if(this.state.temp_1)
  //   // {
  //   // this.setState({bookUbn:''});
  //   // this.setState({temp_1:''});
  //   // this.setState({bookUbn:this.state.temp_2});
  //   // this.setState({temp_1:this.state.temp_2})
  //   // }
  //   // else
  //   // {
  //   // this.setState({temp_1:this.state.temp_2});
  //   // this.setState({bookUbn:this.state.temp_2});
  //   // }
  //   this.setState({bookUbn:evt.target.value});
  // }
  handleRadioChange=(evt)=>
  {
    this.setState({radioStatus:evt.target.value});
  }
  handleRadio=()=>
  {
    this.setState({bookIssueMsg:'',bookReturnedMsg:''});
    const isValid=this.validate();
    if(isValid)
    {
    if(this.state.radioStatus=='reissue')
    {
    this.reIssues();
    }
    else
    {
    this.returns();
    }
    }
    this.setState({radioStatus:'reissue'});
  }
  returns=()=>
  {
    db.books.get({ubn:this.state.bookUbn}).then ((bookDetails)=> {
      if(bookDetails)
      {
        db.bookissues.get({book_ubn:this.state.bookUbn,return:0}).then ((bookIssueDetails)=> {
          if(bookIssueDetails && bookIssueDetails.student_id==this.state.studentDetails.id)
          {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;

            db.bookissues.update(bookIssueDetails.id,{return:"1",return_date:dateTime}).then((updated)=> {
              if (updated)
              {
                this.setState({reIssue_reTurn:'',bookReturnedMsg:"Book Returned Successfully."});
              }
              else
              {
                alert("There are some internal problem.");
              }
            });
          }
          else
          {
          this.setState({alreadyIssue:"This book is already issued to other student."});
          }
        });
      }
      else
      {
        this.setState({bookExistError:"Book UBN is invalid.",issue:'',bookIssueMsg:'',reIssue_reTurn:false});
      }
    });
  }
  reIssues=()=>
  {
    db.books.get({ubn:this.state.bookUbn}).then ((bookDetails)=> {
      if(bookDetails)
      {
        db.bookissues.get({book_ubn:this.state.bookUbn,return:0}).then ((bookIssueDetails)=> {
          if(bookIssueDetails && bookIssueDetails.student_id==this.state.studentDetails.id)
          {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;

            db.bookissues.update(bookIssueDetails.id,{return:"1",return_date:dateTime}).then((updated)=> {
              if (updated)
              {
                //this.setState({reIssue_reTurn:'',bookReturnedMsg:"Book Returned Successfully."});
                const record={
                book_ubn:this.state.bookUbn,
                date_time:dateTime,
                student_id:this.state.studentDetails.id,
                return:0,
                return_date:''
                }
                try {
                  db.bookissues.add(record);
                  this.setState({issue:'',bookReissueMsg:'Book Re-Issue Successfully',reIssue_reTurn:''});
                } catch (e) {
                    console.log("Error in Book Re-issue");
                }
              }
              else
              {
                alert("There are some internal problem.");
              }
            });
          }
          else
          {
          this.setState({alreadyIssue:"This book is already issued to other student."});
          }
        });
      }
      else
      {
        this.setState({bookExistError:"Book UBN is invalid.",issue:'',bookIssueMsg:'',reIssue_reTurn:false});
      }
    });
  }
  keys=(evt)=>
  {
    console.log(this.state.bookUbn);
    if (evt.key === 'Enter') {
    this.handleSubmit();
    }
  }
  handleSubmit=()=>
  {
    const isValid=this.validate();
    if(isValid)
    {
      this.findBook(this.state.bookUbn,this.state.studentDetails.id);
      console.log("Book Ubn Is accurate");
    }
    else
    {
      console.log("Book Ubn is inaccurate");
    }
  }
  validate()
  {
    let bookUbnError='';
    if(this.state.bookUbn.length<20 || this.state.bookUbn.length>20)
    {
      bookUbnError="Book UBN length is 20 character";
    }
    if(bookUbnError)
    {
      this.setState({bookUbnError,issue:'',reIssue_reTurn:'',bookExistError:'',bookIssueMsg:'',bookReturnedMsg:'',alreadyIssue:''});
      return false;
    }
    this.setState({bookReturnedMsg:'',bookUbnError:'',alreadyIssue:'',bookReissueMsg:''});
    return true;
  }

  findBook=(ubn,student_id)=>{
    db.books.get({ubn:ubn}).then ((bookDetails)=> {
      if(bookDetails)
      {
        db.bookissues.get({book_ubn:ubn,return:0}).then ((bookIssueDetails)=> {
          if(bookIssueDetails==undefined)
          {
            db.table('bookissues')
            .where({return:0,student_id:this.state.studentDetails.id})
            .toArray()
            .then((bookissues) => {
              if(bookissues.length<3)
              {
            this.setState({issue:true,bookIssueMsg:'',bookExistError:'',bookUbnError:'',reIssue_reTurn:false});
              }
              else
              {
              alert("Book Limit exceed!");
            }});
          }
          else if(bookIssueDetails.student_id==this.state.studentDetails.id)
          {
            this.setState({issue:'',bookExistError:'',reIssue_reTurn:true});
            console.log("AlREADY EXIST");
          }
          else
          {
            this.setState({alreadyIssue:"This book is already issued to other student."});
          }

        });
      }
      else
      {
        this.setState({bookExistError:"Book UBN is invalid.",issue:'',bookIssueMsg:'',reIssue_reTurn:false});
      }
    });
  }

  addRecord=()=>
  {
    const isValid=this.validate();
    if(isValid)
    {
      db.books.get({ubn:this.state.bookUbn}).then ((bookDetails)=> {
        if(bookDetails)
        {
          db.bookissues.get({book_ubn:this.state.bookUbn,return:0}).then
          ((bookIssueDetails)=> {
            if(bookIssueDetails==undefined)
            {
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                const record={
                book_ubn:this.state.bookUbn,
                date_time:dateTime,
                student_id:this.state.studentDetails.id,
                return:0,
                return_date:''
                }
                try {
                  db.bookissues.add(record);
                  console.log('BOOK IS ISSUES');
                  this.setState({issue:'',bookIssueMsg:'Book Issued Successfully',reIssue_reTurn:true});
                } catch (e) {
                    console.log("Error in Bookissue");
                }
            }
            else if(bookIssueDetails.student_id==this.state.studentDetails.id)
            {
              this.setState({issue:'',bookExistError:'',reIssue_reTurn:true});
              console.log("AlREADY EXIST");
            }
            else
            {
              this.setState({issue:'',bookExistError:''});
              this.setState({alreadyIssue:"This book is already issued to other student."});
            }

          });
        }
        else
        {
          this.setState({bookExistError:"Book UBN is invalid.",issue:'',bookIssueMsg:'',reIssue_reTurn:false});
        }

      });
  }
  }


  render()
  {
    const isBookIssue = this.state.issue;
    const isReIssue_reTurn=this.state.reIssue_reTurn;

    let bookissue;
    let bookreissue_return;
    // let gif_player;
    if (isBookIssue) {
      bookissue =          <div style={{"textAlign":"center",'marginTop':"10px"}}>
                        <Button push onClick={this.addRecord}>
                          Book Issue
                        </Button>
                        </div>;
    }
    else {
      bookissue="";
    }
    // if(!(this.state.bookUbn))
    // {
    //   gif_player=<img src={bars} height="120px" width="280px" style={{cursor:"pointer",marginTop:'40px'}}/>
    // }
    // else {
    //   gif_player='';
    // }
    if(isReIssue_reTurn)
    {
      bookreissue_return=<View horizontalAlignment="left" layout="vertical" paddingTop="20px">

            <Radio
              color="#009688"
              label="Re-Issue"
              name="radio1"
              onChange={this.handleRadioChange}
              defaultValue="reissue"
              defaultChecked

            />

            <Radio
              color="#009688"
              label="Return"
              name="radio1"
              onChange={this.handleRadioChange}
              defaultValue="return"
            />

            <Button push onClick={this.handleRadio}>
            Submit
        </Button>
        </View>;
    }
    else {
      bookreissue_return="";
    }

    const Heading=styled.span`
    font-size:13px;
    font-weight:600;
    color:rgb(128,128,128);
    `;
    const Details=styled.span`
    font-size:12px;
    padding-left:10px;
    `;
    const Text=styled.span`
    width: 300px;
    height: 30px;
    display:block;
    font-family: Raleway;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 23px;
    color: #000000;
    padding-top:20px;

    `;
    return(
      <React.Fragment>
      <BarcodeReader
        onError={this.handleError}
        onScan={this.handleScan}
        minLength={1}
        />
      <div style={{"boxShadow":"0 0 10px #cecaca"}}>
      <View
        color="#009688"
        background
        padding="5px"
        horizontalAlignment="left"

        width="100%"
        height="100%"
      >
      <span style={{color:"white","fontFamily": "Raleway","fontSize":"15px","fontWeight":"600"}}>STUDENT DETAILS</span>
       </View>
       <View
         width="100%"
         height="100%"
       >
      <View
         color="white"
         background
         padding="5px"
         horizontalAlignment="left"

         width="50%"
         height="100%"
       >



       <table>
       <tbody>
       <tr>
       <td><Heading>ID</Heading></td>
       <td><Details>{this.state.studentDetails.id}</Details></td>
       </tr>
       <tr>
       <td><Heading>ROLL NO</Heading></td>
       <td><Details>{this.state.studentDetails.rollno}</Details></td>
       </tr>
       <tr>
       <td><Heading>NAME</Heading></td>
       <td><Details>{this.state.studentDetails.first_name}&nbsp;{this.state.studentDetails.middle_name}&nbsp;{this.state.studentDetails.last_name}
       </Details>
        </td>
       </tr>
       <tr>
       <td><Heading>CSESSION_FROM</Heading></td>
       <td><Details>{this.state.studentDetails.csession_from}</Details></td>
       </tr>
       <tr>
       <td><Heading>CSESSION_TO</Heading></td>
       <td><Details>{this.state.studentDetails.csession_to}</Details></td>
       </tr>

       </tbody>
       </table>

       </View>
       <View
         color="white"
         background
         padding="5px"
         horizontalAlignment="center"

         width="50%"
         height="100%"
       >
       <img src={profile} height="130px" width="120px" style={{cursor:"pointer"}}/>

       </View>
       </View>
       </div>
        <div style={{"boxShadow":"0 0 10px #cecaca","marginTop":"15px","paddingTop":"0px","height":"500px"}}>
        <View
          color="#ffa829"
          background
          padding="5px"
          horizontalAlignment="left"

          width="100%"

        >
        <span style={{color:"white","fontFamily": "Raleway","fontSize":"15px","fontWeight":"600"}}>WORKING AREA</span>
         </View>
        <View horizontalAlignment="center">
        <div>
        <Text>Scan Book Barcodes</Text>


        <input className="inputs" disabled value={this.state.bookUbn} onChange={this.handleChange} onKeyDown={this.keys} style={{"marginTop":"20px","height":"40px",borderColor:this.state.bookUbnError!=''? "#ea3d49" : "",borderWidth:"0px"}} type="text"  name="ubn"  />

        <div style={{fontSize:14,color:"#ea3d49",marginTop:"-15px"}}>{this.state.bookUbnError}</div>
        <div style={{fontSize:14,color:"#ea3d49",marginTop:"-15px"}}>{this.state.bookExistError}</div>
        <div style={{fontSize:14,color:"#0077cc",marginTop:"-15px"}}>{this.state.bookReturnedMsg}</div>

          <div style={{fontSize:14,color:"#0077cc",marginTop:"-15px"}}>{this.state.bookReissueMsg}</div>
        {bookreissue_return}
        <div style={{fontSize:14,color:"#ea3d49",marginTop:"15px"}}>{this.state.alreadyIssue}</div>
        <div style={{fontSize:14,color:"#0077cc"}}>{this.state.bookIssueMsg}</div>
        {bookissue}
        </div>
        </View>

        </div>

      </React.Fragment>
    );
  }

}
export default MainModule;
