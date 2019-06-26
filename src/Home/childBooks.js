import React, { Component } from 'react';
import db from '../db';
import { View} from 'react-desktop/windows';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import ViewBooks from '../Home/viewBooks';
import ChildBookDetails from '../Home/childBookDetails';
import BooksBarcodePrint from '../Home/booksBarcodePrint';
class ChildBooks extends Component
{
    constructor(props)
    {
      super(props);
      this.state={
                back:false,
                parent_id:this.props.parent_id,
                book_name:'',
                child_books:[],
                parent_book:[],
                counter:0,
                quantity:'',
                print_parent_id:'',
                printId:'',
                parent_book_name:'',
                pagenumber:this.props.pageNumber

                  };


    }
    componentDidMount()
    {
      db.books.get({id:this.state.parent_id}).then ((bookDetails)=> {
          this.setState({book_name:bookDetails.title});
          this.setState({quantity:bookDetails.quantity});
          this.setState({parent_book:bookDetails});
        });
      db.table('books').where({parent_id:this.state.parent_id})
        .toArray()
        .then((child_books) => {
           this.setState({child_books:child_books});

        });

    }
    handleBack=()=>
    {
      this.setState({back:true});
    }
    deleteSingleRecord=(id,parent_id)=>
    {

      db.table('books')
       .delete(id)
       .then(() => {
         alert("Record is deleted");
         const newList = this.state.child_books.filter((book) => book.id !== id);
         this.setState({ child_books: newList });
       });

       db.books.update(parent_id,{quantity:this.state.quantity-1}).then((updated)=> {
         if (updated)
         {
           console.log("Updated");
           this.setState({quantity:this.state.quantity-1});
         }
         });
    }

    printSingleBarcode=(id)=>
    {
      console.log("Hey budyy !! Print is executed.")
      console.log("Id Is Here "+id);
      this.setState({print_parent_id:id});
      db.books.get(id).then ((bookDetails)=> {
        this.setState({printId:bookDetails.ubn,parent_book_name:bookDetails.title});
       });
    }
    render(){
      if(this.state.back)
      {
      return(<ViewBooks updatePagenumber={this.state.pagenumber}/>);
      }
      if(this.state.printId)
      {
        return(<BooksBarcodePrint barcode={this.state.printId} bookId={this.state.print_parent_id} parent_book_name={this.state.parent_book_name} single="1"/>);
      }

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
        border:${props => props.cancel ? "1px solid #009688" : "1px solid #009688"};
        background: ${props => props.cancel ? "#009688" : "#009688"};
        box-sizing: border-box;
        width: 179px;
        height: 38px;
        color:${props => props.cancel ? "black" : "white"};
        margin-top:2px;
        `;
      return(
      <React.Fragment>
      <div>
      <View width="100%"  height="60px"  >
          <View width="100%" height="40px" horizontalAlignment="left">
            <Text>{this.state.book_name} Books</Text>
          </View>

          <View width="100%" height="40px"  horizontalAlignment="right" >
              <Button  className="text-center" push onClick={this.handleBack} >
              Back
              </Button>
          </View>
    </View>


              <ChildBookDetails
                books={this.state.child_books}
                counter={this.state.counter}
                parentBooks={this.state.parent_book}
                quantity={this.state.quantity}
                deleteSingleRecord={this.deleteSingleRecord}
                printSingleBarcode={this.printSingleBarcode}
                />

      </div>

    </React.Fragment>);

      }
}

export default ChildBooks;
