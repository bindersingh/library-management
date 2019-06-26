import React, { Component } from 'react';
import { View } from 'react-desktop/windows';
import AddBooks from '../Home/addBooks';
// import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import db from '../db';
import UpdateBooks from '../Home/updateBooks';
import BooksBarcodePrint from '../Home/booksBarcodePrint';
import ChildBooks from '../Home/childBooks';
import PaginationLauncher from '../Home/paginationLauncher';

class ViewBooks extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
              books:[],

              addBooks:false,
              booksLength:'',
               pageOfItems: [],
               defaultSize:7,
               tempSize:'',
               idSet:'',
               printId:'',
               pagenumber:'1',
               delValue:1,
               search_keyword:'',
               searching_start:false,
               parent_id:'',
               print_parent_id:'',
               parent_book_name:''
              }
               this.onChangePage = this.onChangePage.bind(this);
               this.onChangeRecord=this.onChangeRecord.bind(this);

  }

  componentDidMount() {
  if(this.props.updatePagenumber!==undefined)
    {
      this.setState({delValue:this.props.updatePagenumber});
      console.log(this.props.updatePagenumber);
    }
    if(this.props.searchKeyword!==undefined && this.props.searchKeyword!=='')
    {
      this.setState({search_keyword:this.props.searchKeyword});
      this.searching(this.props.searchKeyword);
    }
    else {
  db.table('books').where({parent_id: 0})
     .toArray()
     .then((books) => {
       this.setState({ books })
     });
   }

 }
 searching(keyword)
 {
  //this code is used for handling all types of character such as numeric ,alphabet,special charcaters.
   var str=keyword;
   var str2=[];
   for (var i = 0; i <str.length; i++) {
       if( /[^a-zA-Z0-9]/.test(str.charAt(i)) ) {
         var k=i;
         while(true)
         {
           if(str2[k]===undefined)
           {
             str2[k]='\\';
             str2[k+1]=str.charAt(i);
             break;
           }
           k++;
         }
       }
       else {
         var j=i;
         while(true)
         {
           if(str2[j]===undefined)
           {
             str2[j]=str.charAt(i);
             break;
           }
           j++;
         }

       }
     }
   var key=new RegExp(str2.join(''));
   db.books.where({parent_id: 0}).filter (function (book) { return  key.test(book.title); })
   .toArray()
   .then(result=> {
       console.log(result.length);
       if(result.length>0)
       {
         this.setState({books:result});
       }
       else
       {
         alert(this.state.search_keyword+" book are not available");
       }
     });

 }
onChangeRecord(evt)
{
  this.setState({search_keyword:evt.target.value.toUpperCase()});
  if(evt.key==='Enter')
  {
    this.searching(this.state.search_keyword);
    this.setState({delValue:1});
  }
}

 updateRecord=(id)=>
 {
   this.setState({idSet:id});
   //console.log(this.state.pagenumber);
}
 printRecord=(id)=>
 {
   this.setState({print_parent_id:id});
   db.books.get(id).then ((bookDetails)=> {
     this.setState({printId:bookDetails.ubn,parent_book_name:bookDetails.title});
    });
 }
 deleteRecord=(id)=>
  {
    this.setState({delValue:this.state.pagenumber});
    db.table('books')
     .delete(id)
     .then(() => {
       db.table('books').where({parent_id: id}).toArray().then((child_books) => {
          for (var key in child_books) {db.books.delete(child_books[key]['id']);}
         });
       alert("Record is deleted");
       const newList = this.state.books.filter((book) => book.id !== id);
       this.setState({ books: newList });
     });

 }
 onChangePage(pageOfItems,page,totalPages) {
        // update state with new page of items

        this.setState({pagenumber:page});
        this.setState({ pageOfItems: pageOfItems });
        if(page>totalPages)
        {
          page=totalPages;
        }
        this.setState({ tempSize:this.state.defaultSize*page-this.state.defaultSize});

    }

  clicked=(event)=>
  {
    this.setState({addBooks:true});

  }
  viewRecord=(id)=>
  {
    this.setState({parent_id:id});
  }
  render()
  {
    const Text = styled.h1`

    width: 100%;
    height: 43px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 300;
    font-size: 34px;
    line-height: 42px;
    color: #000000;
    padding-bottom:50px;
      `;

      const Button=styled.button`
      border: 1px solid #009688;
      background:#009688;
      box-sizing: border-box;
      width: 179px;
      height: 38px;
      color:white;
      margin-top:2px;

      `;
    if(this.state.addBooks)
    {
    return(<AddBooks />);
    }
    if(this.state.idSet)
    {
      return(<UpdateBooks bookId={this.state.idSet} pageNumber={this.state.pagenumber} searchKeyword={this.state.search_keyword}/>);

    }
    if(this.state.parent_id)
    {
      return(<ChildBooks parent_id={this.state.parent_id} pageNumber={this.state.pagenumber}/>);
    }
    if(this.state.printId)
    {
      return(<BooksBarcodePrint barcode={this.state.printId} bookId={this.state.print_parent_id} parent_book_name={this.state.parent_book_name}/>);
    }
  return(
        <React.Fragment>
        <div>
        <View width="100%"  height="60px"  >
            <View width="100%" height="40px" horizontalAlignment="left">
              <Text>Books Shelf</Text>
            </View>

            <View width="100%" height="40px"  horizontalAlignment="right" >
                <input type="text" className="search_field" placeholder="Search.." value={this.state.search_keyword} onChange={this.onChangeRecord} onKeyDown={this.onChangeRecord}/>
                <Button className="text-center" push color='#009688' onClick={this.clicked} >
                Add Books
                </Button>
            </View>
      </View>


          <PaginationLauncher
            books={this.state.books}
            onChangePage={this.onChangePage}
            pageOfItems={this.state.pageOfItems}
            defaultSize={this.state.defaultSize}
            tempSize={this.state.tempSize}
            updateRecord={this.updateRecord}
            printRecord={this.printRecord}
            deleteRecord={this.deleteRecord}
            tempPageNumber={this.state.pagenumber}
            delValue={this.state.delValue}
            viewRecord={this.viewRecord}
            />

        </div>

      </React.Fragment>);

}
}
export default ViewBooks;
