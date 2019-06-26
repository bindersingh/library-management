 import React from 'react';
 import { View } from 'react-desktop/windows';
 import styled from 'styled-components';
import db from '../db';
import profile from '../profiles.png';
import SearchModule from '../BookIssue/searchModule';
 class BookIssueForm extends React.Component
 {
   constructor(props)
   {
    super(props);
    this.state={
                bookUbn:this.props.bookUbn,
            //  bookUbn:"Kx9UK7bkWiBmJpkLzx9r",
                bookDetails:[],
                bookTitle:'',
                dayLimit:this.props.day_limit,
                return_date:'',
                studentId:'',
                studentFind:false,
                studentDetails:[],
                countBook:'',
                bookIssue:false,
                cancel:false,
                book_limit:this.props.book_limit
                }
   }
   componentDidMount()
   {
     console.log("---------->");
     console.log(this.state.bookUbn);

     db.books.get({ubn:this.state.bookUbn}).then ((bookDetails)=> {
      this.setState({bookDetails:bookDetails});
      this.setState({title:this.state.bookDetails.title.toLowerCase()});
     });

     const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
 ];

     var date = new Date();
     date.setDate(date.getDate() +this.state.dayLimit);

     var dd = date.getDate();
     var mm = date.getMonth();
     var y = date.getFullYear();
     var return_date=dd+"-"+monthNames[mm]+"-"+y;
     this.setState({return_date:return_date});
  }

  handleChange=(evt)=>
  {
    this.setState({studentId:evt.target.value});
  }
  handleSearch=()=>
  {
    var id=this.state.studentId;
    id=parseInt(id);
    if(Number.isInteger(id))
    {
      db.admissions.get({id:id}).then ((studentDetails)=> {
        if(studentDetails)
        {
        this.bookCounting(studentDetails.id);
        this.setState({studentDetails:studentDetails});
        this.setState({studentFind:true});

        console.log(studentDetails);
        }
        else
        {
        alert("Student Not Found");
        this.setState({studentFind:false});
        this.setState({studentDetails:[]});
        }
      });
    }
    else {
      alert("Fill valid ID");
      this.setState({studentFind:false});
    }
  }

  bookCounting=(id)=>
  {
    db.table('bookissues')
    .where({return:0,student_id:id})
    .toArray()
    .then((bookissues) => {
      this.setState({countBook:bookissues.length});
    // console.log("Total length is "+bookissues.length);
  });
  }
  cancel=()=>
  {
      this.setState({cancel:true});
  }
  bookIssue=()=>
  {
    console.log("I am executed");
    if(this.state.studentFind)
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
        console.log("book issue.");
        console.log(this.state.countBook);
        if(this.state.book_limit<=this.state.countBook)
        {
          alert("Book Limit exceeded");
        }
        else {
          db.bookissues.add(record);
          this.setState({bookIssue:true});
        }
      } catch (e) {
          console.log("Internal Problem in Book Issue.");
      }
    }
    else
    {
        alert("Please Fill Student ID ");
    }
  }

  render()
  {
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
      const Title = styled.b`

      width: auto;
      height: 23px;
      font-family: Raleway;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 10px;
      color: #000000;
      padding-left:13px;


        `;
        const ReturnDate=styled.b`
        width: auto;
        height: 23px;

        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 10px;
        color: #000000;

        `;
        const BookDetails=styled.p`
        padding-left:13px;
        padding-top:10px;
        font-weight: 300;
        font-size: 14px;
        font-family: Raleway;
        font-style: normal;
        color: #000000;
        text-transform: capitalize;
        margin-bottom: 9px;
        `;
        const BookDetailsBelow=styled.p`
        padding-left:${props => props.returns ? "0px" : "13px"};
        font-weight: 300;
        font-size: 14px;
        font-family: Raleway;
        font-style: normal;
        color: #000000;
        text-transform: capitalize;
        margin-bottom: 9px;
        `;

              const Button=styled.button`
              border:${props => props.issue ? "1px solid #009688" :props.cancel ? "1px solid #CCCCCC":"1px solid #EF5533"};
              background:${props => props.issue ? "#009688" :props.cancel ?"#CCCCCC":"#EF5533"};
              box-sizing: border-box;
              width: ${props => props.issue ?"150px":props.cancel ?"150px":"90px"};
              height: 38px;
              color:${props => props.cancel ?"#000000":"white"};
              margin-top:4px;
              margin-left:${props => props.issue ? "0px" : "15px"};
              display:block;
              margin-bottom:15px;

              `;
              const student_found=this.state.studentFind;
              if(this.state.bookIssue)
              {
                return(<SearchModule  bookissuesuccess="Book issue Successfully"/>);
              }
              if(this.state.cancel)
              {
                return(<SearchModule />);
              }
              let student_detail_div='';
              if(student_found)
              {
                student_detail_div=<div style={{"border":"1px solid #DDDDDD","width":"100%","marginTop":"10px"}}>
               <View
                   color="white"
                   background
                   horizontalAlignment="left"
                   verticalAlignment="left"
                   width="100%"
                   height="100%"
                 >
               <View
                   color="white"
                   background
                   horizontalAlignment="left"
                   verticalAlignment="left"
                   width="25%"
                   height="100%"
                 >
               <div style={{"paddingTop":"10px"}}>
               <Title>Student Detail</Title>
               <div style={{"paddingLeft":"13px"}}>
               <img src={profile} alt="profile" width="100px" height="100px"/>
               </div>
               </div>
               </View>

               <View
                   color="white"
                   background
                   horizontalAlignment="left"
                   verticalAlignment="left"
                   width="100%"
                   height="100%"
                   padding="20px"
                 >
                 <div>
                 <div style={{"height":"16px","marginTop":"40px"}}><BookDetailsBelow>{this.state.studentDetails.first_name} {this.state.studentDetails.middle_name} {this.state.studentDetails.last_name}</BookDetailsBelow></div>
                 <div style={{"height":"16px","marginTop":"11px"}}><BookDetailsBelow>{this.state.studentDetails.course_name} {this.state.studentDetails.course_schedule_name} semester</BookDetailsBelow></div>
                 <div style={{"height":"16px","marginTop":"11px"}}><BookDetailsBelow>Session {this.state.studentDetails.csession_from}-{this.state.studentDetails.csession_to}</BookDetailsBelow></div>
                 </div>
                 </View>

               <View
                   color="white"
                   background
                   horizontalAlignment="center"
                   verticalAlignment="center"
                   width="100%"
                   height="100%"
                   padding="20px"
                 >
                 <div style={{"border":"0px solid black","textAlign":"center"}}>
                 <p style={{"fontFamily":"Raleway","fontStyle":"normal","fontWeight": "200","fontSize": "70px","lineHeight": "50px"}}>{this.state.countBook}</p>
                 <span>Books Issued</span>
                 </div>
                 </View>
                 </View>
                 <View
                     color="white"
                     background
                     horizontalAlignment="left"
                     verticalAlignment="left"
                     width="50%"
                     height="100%"
                     paddingLeft="22px"
                   >
                   <BookDetailsBelow>ID {this.state.studentDetails.id}</BookDetailsBelow>
                   </View>
               </div>;
              }
              else {
                 student_detail_div=<div style={{"border":"1px solid #DDDDDD","width":"100%","marginTop":"10px"}}>
                <View
                    color="white"
                    background
                    horizontalAlignment="left"
                    verticalAlignment="left"
                    width="100%"
                    height="100%"
                  >
                <View
                    color="white"
                    background
                    horizontalAlignment="left"
                    verticalAlignment="left"
                    width="25%"
                    height="100%"
                  >
                <div style={{"paddingTop":"10px"}}>
                <Title>Student Detail</Title>
                <div style={{"paddingLeft":"13px"}}>
                <img src={profile} alt="profile" width="100px" height="100px"/>
                </div>
                </div>
                </View>

                <View
                    color="white"
                    background
                    horizontalAlignment="left"
                    verticalAlignment="left"
                    width="100%"
                    height="100%"
                    padding="20px"
                  >
                  <div>
                  <div style={{"border":"1px solid #DDDDDD","width":"200px","height":"16px","backgroundColor":"#DDDDDD","marginTop":"40px"}}></div>
                  <div style={{"border":"1px solid #DDDDDD","width":"180px","height":"16px","backgroundColor":"#DDDDDD","marginTop":"11px"}}></div>
                  <div style={{"border":"1px solid #DDDDDD","width":"170px","height":"16px","backgroundColor":"#DDDDDD","marginTop":"11px"}}></div>
                  </div>
                  </View>

                <View
                    color="white"
                    background
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    width="100%"
                    height="100%"
                    padding="20px"
                  >
                  <div style={{"border":"0px solid black","textAlign":"center"}}>
                  <p style={{"fontFamily":"Raleway","fontStyle":"normal","fontWeight": "200","fontSize": "70px","lineHeight": "50px"}}>0</p>
                  <span>Books Issued</span>
                  </div>
                  </View>
                  </View>
                  <View
                      color="white"
                      background
                      horizontalAlignment="left"
                      verticalAlignment="left"
                      width="50%"
                      height="100%"
                      paddingLeft="22px"
                    >
                    <BookDetailsBelow>ID 0000</BookDetailsBelow>
                    </View>
                </div>;
              }


  return(
    <div>
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
  <View
      color="white"
      background
      horizontalAlignment="left"
      verticalAlignment="left"
      width="100%"
      height="100%"
    >
  <div style={{"border":"1px solid #DDDDDD","width":"100%","paddingTop":"10px"}}>
  <Title>Book Detail</Title>
  <div>
  <BookDetails>{this.state.title}</BookDetails>
  <BookDetailsBelow>Author: {this.state.bookDetails.author}</BookDetailsBelow>
  <BookDetailsBelow>Edition: {this.state.bookDetails.edition}</BookDetailsBelow>
  </div>
  </div>
  </View>

  <View
      color="white"
      background
      horizontalAlignment="left"
      verticalAlignment="left"
      width="100%"
      height="100%"
    >
  <div style={{"border":"1px solid #DDDDDD","width":"100%","marginTop":"10px"}}>
  <View
      color="white"
      background
      horizontalAlignment="left"
      verticalAlignment="left"
      width="100%"
      height="100%"
      paddingTop="20px"
    >
    <div style={{"paddingTop":"13px"}}>
  <Title> Student ID</Title>
  </div>
  <input type="text" value={this.state.studentId} onChange={this.handleChange} className="inputs" style={{"marginTop":"5px","marginLeft":"13px","width":"320px","height":"37px"}}/>
  <Button className="text-center" push color='#009688' onClick={this.handleSearch} >
  Search
  </Button>

  </View>
  </div>
  </View>

{student_detail_div}
<BookDetailsBelow returns style={{"paddingTop":"15px"}}>Return Date</BookDetailsBelow>
<ReturnDate>{this.state.return_date}</ReturnDate>
<View
    color="white"
    background
    horizontalAlignment="left"
    verticalAlignment="left"
    width="100%"
    height="100%"
    paddingTop="30px"

  >
<Button className="text-center"  color='#009688' issue  onClick={this.bookIssue}>
Issue
</Button>
<Button className="text-center"  color='#009688' cancel onClick={this.cancel}>
Cancel
</Button>
</View>
</div>
  );
}
  }
 export default BookIssueForm;
