import React from 'react';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';
import { Button } from 'react-desktop/windows';
import db from '../db';
import profile from '../profiles.png';
import SearchModule from '../BookIssue/searchModule';
import moment from 'moment'
  class ReIssueReTurn extends React.Component
  {
  constructor(props)
  {
    super(props);
    this.state={

      bookUbn:this.props.bookUbn,
      bookDetails:[],
      title:'',
      studentId:this.props.studentId,
      studentDetails:[],
      countBook:'',
      return_date:'',
      dayLimit:this.props.day_limit,
      bookReturns:false,
      bookReIssue:false,
      cancel:false,
      fine:0
    }
  }
  componentDidMount()
  {
    db.books.get({ubn:this.state.bookUbn}).then ((bookDetails)=> {
     this.setState({bookDetails:bookDetails});
     this.setState({title:this.state.bookDetails.title.toLowerCase()});
    //  console.log(this.state.studentId);
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
    // console.log(date);
  this.setState({return_date:return_date});
  this.findStudent();
  this.bookCounting();

  }
  findStudent=()=>
  {
    var id=this.state.studentId;
    id=parseInt(id);
    db.admissions.get({id:id}).then ((studentDetails)=> {
      this.setState({studentDetails:studentDetails});
    });
  }
  bookCounting=()=>
  {
    var id=this.state.studentId;
    id=parseInt(id);
    db.table('bookissues')
    .where({return:0,student_id:id})
    .toArray()
    .then((bookissues) => {
     this.setState({countBook:bookissues.length});
     console.log(bookissues[0]['date_time']);
     db.settings.get({id:1}).then ((settings)=> {
       if(settings!==undefined && settings.day_limit!=='0')
       {

     var today_date= moment().format('YYYY-M-D h:mm:s ');
 //var database_date=moment().format('2019-6-20 16:39:1','YYYY-M-D h:mm:s ');
     var database_date=moment().format(bookissues[0]['date_time'],'YYYY-M-D h:mm:s ');
     var new_date = moment(database_date, 'YYYY-M-D h:mm:s').add(settings.day_limit,'days');
     var day = new_date.format('D');
     var month = new_date.format('M');
     var year = new_date.format('YYYY');
     var h=new_date.format('h');
     var m=new_date.format('mm');
     var s=new_date.format('s');
     var new_date=year + '-' + month + '-' + day+" "+h + ':' + m + ':' + s;
     var start = moment(today_date, "YYYY-MM-DD");
     var end = moment(new_date, "YYYY-MM-DD");
     if(Math.round(moment.duration(start.diff(end)).asDays()) >=1)
     {
       var fine=settings.fine_per_day*Math.round(moment.duration(start.diff(end)).asDays());
       this.setState({fine:fine});
     }

}

});
  });
  }
  bookReturn=()=>
  {
      db.bookissues.get({book_ubn:this.state.bookUbn,return:0}).then ((bookIssueDetails)=> {
        if(bookIssueDetails)
        {
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
          db.bookissues.update(bookIssueDetails.id,{return:"1",return_date:dateTime}).then((updated)=> {
            if (updated)
            {
              if(this.state.fine>0)
              {
                 db.fine_details.add({student_id:this.state.studentId,book_ubn:this.state.bookUbn,fine:this.state.fine,bookissue_id:bookIssueDetails.id});

              }
              this.setState({bookReturns:'true'});
            }
            else
            {
              alert("There are some internal problem.");
            }
          });
        }
        else
        {
        alert("Internal Problem");
        }
      });
  //  console.log(dateTime);
  }
  cancel=()=>
  {
      this.setState({cancel:true});
  }
  bookReissue=()=>
  {
    db.bookissues.get({book_ubn:this.state.bookUbn,return:0}).then ((bookIssueDetails)=> {
      if(bookIssueDetails)
      {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        db.bookissues.update(bookIssueDetails.id,{return:"1",return_date:dateTime}).then((updated)=> {
          if (updated)
          {
            const record={
            book_ubn:this.state.bookUbn,
            date_time:dateTime,
            student_id:this.state.studentId,
            return:0,
            return_date:''
            }
            try {
              db.bookissues.add(record);
              //console.log(db.bookissues.last());
              if(this.state.fine>0)
              {
                  db.bookissues.get({book_ubn:this.state.bookUbn,return:0}).then ((bookissues)=> {
                  console.log(bookissues.id);
                  console.log("Fine is "+this.state.fine);
                  console.log("Book Ubn is "+record.book_ubn);
                  console.log("student id is "+record.student_id);
                  db.fine_details.add({student_id:record.student_id,book_ubn:record.book_ubn,fine:this.state.fine,bookissue_id:bookissues.id});
              });
              }
              this.setState({bookReIssue:true});
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
      else {
      alert("Internal Problem");
      }
    });
  }
  render()
  {

    if(this.state.bookReturns)
    {
      return(<SearchModule  bookReturnSuccess="Book Returned Successfully"/>);
    }
    if(this.state.bookReIssue)
    {
      return(<SearchModule  bookReIssueSuccess="Book Re-Issue Successfully"/>);
    }
    if(this.state.cancel)
    {
      return(<SearchModule />);
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
        const Button=styled.button`
        border:${props => props.issue ? "1px solid #009688" :props.cancel ? "1px solid #CCCCCC":"1px solid #FC423F"};
        background:${props => props.issue ? "#009688" :props.cancel ?"#CCCCCC":"#FC423F"};
        box-sizing: border-box;
        width: ${props => props.issue ?"150px":props.cancel ?"150px":"150px"};
        height: 38px;
        color:${props => props.cancel ?"#000000":"white"};
        margin-top:4px;
        margin-left:${props => props.issue ? "0px" : "15px"};
        display:block;
        margin-bottom:15px;

        `;
  return(<div>
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


<div style={{"border":"1px solid #DDDDDD","width":"100%","marginTop":"10px"}}>
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
     width="100%"
     height="100%"

   >


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

   <View
       color="white"
       background
       horizontalAlignment="right"
       verticalAlignment="left"
       width="50%"
       height="100%"
       paddingRight="20px"
     >
     <BookDetailsBelow>Fine: {this.state.fine}</BookDetailsBelow>
     </View>

   </View>
</div>
<BookDetailsBelow returns style={{"paddingTop":"25px"}}>Return Date (<span style={{"textTransform":"lowercase"}}> if book re-issue </span>)</BookDetailsBelow>
<ReturnDate>{this.state.return_date}</ReturnDate>
<View
    color="white"
    background
    horizontalAlignment="left"
    verticalAlignment="left"
    width="100%"
    height="100%"
    paddingTop="50px"

  >
<Button className="text-center"  color='#009688' issue onClick={this.bookReissue} >
Re-Issue
</Button>
<Button className="text-center"  color='#009688' returns  onClick={this.bookReturn}>
Return
</Button>
<Button className="text-center"  color='#009688' cancel onClick={this.cancel}>
Cancel
</Button>
</View>
  </div>
);
   }
 }
 export default ReIssueReTurn;
