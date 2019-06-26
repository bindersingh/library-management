import React from 'react';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';
import db from '../db';
// import MainModule from '../BookIssue/mainModule';
import BookIssueForm from '../BookIssue/bookIssueForm';
import ReIssueReTurn from '../BookIssue/reIssue_reTurn';
import barcode from '../barcode.png';
import BarcodeReader from 'react-barcode-reader'

class SearchModule extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state={
      bookUbn:'',
      bookUbnLengthError:'',
      bookUbnInvalidError:'',
      bookIssueAction:false,
      bookissuesuccess:'',
      bookReissueReturn:false,
      studentId:'',
      bookReturnSuccess:'',
      bookReIssueSuccess:'',
      day_limit:'',
      book_limit:''
    }
      this.handleScan = this.handleScan.bind(this);
  }

componentDidMount()
{
  if(this.props.bookissuesuccess !==undefined)
  {
    this.setState({bookissuesuccess:this.props.bookissuesuccess})
  }
  if(this.props.bookReturnSuccess !==undefined)
  {
    this.setState({bookReturnSuccess:this.props.bookReturnSuccess})
  }
  if(this.props.bookReIssueSuccess !==undefined)
  {
    this.setState({bookReIssueSuccess:this.props.bookReIssueSuccess})
  }
  db.settings.get({id:1}).then((settings)=>
       {
         if(settings!==undefined)
         {
        var day_limit=parseInt(settings.day_limit);
        var book_limit=parseInt(settings.book_limit);
         this.setState({day_limit:day_limit});
         this.setState({book_limit:book_limit});
         }
         else {
           db.settings.add({id:1,day_limit:2,book_limit:2,fine_per_day:2});
         }
       });


}

  handleScan(data){
    data=data.trim();
    // console.log("handle scan ");
    if(this.state.bookUbn)
    {
      this.setState({bookUbn:''});
      this.setState({
        bookUbn: data,
      });
    }
    else {
    this.setState({
        bookUbn: data,
      })
    }
    // console.log(this.state.bookUbn);

    this.handleSubmit();

  }


  handleError=()=>{
    this.setState({bookUbnLengthError:"Scan barcode with Barcode Device properly.Barcode length must be 20."});
    this.setState({bookUbn:'',bookUbnInvalidError:''});
  }

  handleSubmit=()=>
  {
    const isValid=this.validate();
    if(isValid)
    {
      this.findBook(this.state.bookUbn);
      // console.log("Book Ubn Is accurate");
    }
    else
    {
      // console.log("Book Ubn is inaccurate");
    }
  }

  validate()
  {
    let bookUbnLengthError='';
    if(this.state.bookUbn.length<20 || this.state.bookUbn.length>20)
    {
     bookUbnLengthError="Scan barcode with Barcode Device properly.Barcode length must be 20.";
    }
    if(bookUbnLengthError)
    {
      this.setState({bookUbnLengthError,bookUbnInvalidError:''});
      return false;
    }
    this.setState({bookUbnLengthError:''});
    return true;
  }

  findBook=(ubn)=>{
    db.books.get({ubn:ubn}).then ((bookDetails)=> {
      if(bookDetails)
      {
        db.bookissues.get({book_ubn:ubn,return:0}).then ((bookIssueDetails)=> {
          if(bookIssueDetails)
          {
          // console.log("record exist");
          console.log("reissue and return case ");
          this.setState({studentId:bookIssueDetails.student_id});
            this.setState({bookReissueReturn:true});
          //  console.log("-----"+bookIssueDetails.date_time);
          // console.log(this.state.day_limit);
          // var date = new Date();
          // date.setDate(date.getDate() +this.state.dayLimit);
          // console.log(date);
        }
          else
          {
            console.log("record not exist");
            console.log("issue case");
            this.setState({bookIssueAction:true});
            //console.log(bookIssueDetails);
          }
      });
      }
      else
      {
      this.setState({bookUbnInvalidError:"Book barcode are invalid"});
      }
    });
  }


  render()
  {
    if(this.state.bookIssueAction)
    {
    return(<BookIssueForm  bookUbn={this.state.bookUbn}  day_limit={this.state.day_limit} book_limit={this.state.book_limit}/>);
    }
    if(this.state.bookReissueReturn)
    {
    return(<ReIssueReTurn  bookUbn={this.state.bookUbn} studentId={this.state.studentId} day_limit={this.state.day_limit}/>);
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
    padding-bottom:50px;
      `;
  return(
      <div>
      <BarcodeReader
        onError={this.handleError}
        onScan={this.handleScan}
        minLength={10}
        />
      <View
          color="white"
          background
          horizontalAlignment="left"
          verticalAlignment="left"
          width="100%"
          height="100%"
        >
      <Text>Book Activity</Text>
    </View>
    <div style={{fontSize:14,color:"#1766A6"}}>{this.state.bookReIssueSuccess}</div>
        <div style={{fontSize:14,color:"#1766A6"}}>{this.state.bookReturnSuccess}</div>
    <div style={{fontSize:14,color:"#1766A6"}}>{this.state.bookissuesuccess}</div>
    <div style={{fontSize:14,color:"#ea3d49"}}>{this.state.bookUbnLengthError}</div>
    <div style={{fontSize:14,color:"#ea3d49"}}>{this.state.bookUbnInvalidError}</div>
      <View
        color="white"
        background
        padding="40px"
        horizontalAlignment="center"
        verticalAlignment="center"
        width="100%"
        height="100%"
      >
      <img src={barcode} alt="barcode" />

  </View>

</div>

);
  }
}
export default SearchModule;
