import React, { Component } from 'react';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';
  import ViewBooks from '../Home/viewBooks';
  import db from '../db';
import 'bootstrap/dist/css/bootstrap.css';
class UpdateBooks extends Component
{
  constructor(props) {
     super(props);

     this.state={
       title:'',
        edition:'',
        author:'',
        category:'no-category',
        publisher:'',
        language:'no-value',
        quantity:'',
        flag:false,
        submit:false,
        titleError:'',
        editionError:'',
        authorError:'',
        publisherError:'',
        categoryError:'',
        languageError:'',
        quantityError:'',
        bookId:this.props.bookId,
        pagenumber:this.props.pageNumber,
        child_books:[],
        test:1

     };
     this.handleChange=this.handleChange.bind(this);
     this.updateBook=this.updateBook.bind(this);

  }


   handleChange(event)
   {

     this.setState({ [event.target.name]: event.target.value });
     console.log(event.target.value);
   }

   validate=()=>
   {
     let titleError='';
     let editionError='';
     let authorError='';
     let publisherError='';
     let categoryError='';
     let languageError='';
     let quantityError='';

     if(this.state.title <=0)
     {
       titleError="Title is blank.";
     }
     if(this.state.edition <=0)
     {
       editionError="Edition is blank.";
     }
     if(this.state.author <=0)
     {
       authorError="Author Details are blank.";
     }
     if(this.state.publisher <=0)
     {
       publisherError="Publisher Details are blank.";
     }
     if(this.state.category==='no-category')
     {
       categoryError="Choose book category.";
     }
     if(this.state.language==='no-value')
     {
       languageError="Choose book language.";
     }
     if(this.state.quantity <=0)
     {
       quantityError="Quantity is not valid";
     }
     if(titleError || editionError || authorError || publisherError || categoryError || languageError || quantityError)
     {
       this.setState({titleError,editionError,authorError,publisherError,categoryError,languageError,quantityError});

       return false;
     }
     return true;
   }
   handleSubmit=()=>
   {
     const isValid=this.validate();
     if(isValid)
     {
       {this.updateBook(this.state.bookId,this.state)}
     }
   }

  updateBook(bookId,state)
   {
     const book = {
      title:state.title.toUpperCase(),
      language:state.language,
      edition:state.edition,
      author:state.author,
      category:state.category,
      quantity:state.quantity,
      publisher:state.publisher
      // ubn:'Kx9UK7bkWiBmJpkLzx9r'
    };

    db.books.get(bookId).then ((bookDetails)=> {
      if(book.quantity==bookDetails.quantity)
      {
         db.books.update(bookId,book).then((updated)=> {
           if (updated)
           {
             for (var key in this.state.child_books) {db.books.update(this.state.child_books[key]['id'],book);}
             alert("Book Details Updated");
             this.setState({submit:true});}
           else
           {
             alert("Book Details Not Updated");
          }});
      }
      else if(book.quantity==1)
      {
        db.table('books').where({parent_id: bookId})
          .toArray()
          .then((child_books) => {for (var key in child_books) {db.books.delete(child_books[key]['id']);}});
          db.books.update(bookId,book).then((updated)=> {
            if (updated)
            {
              alert("Book Details Updated");
              this.setState({submit:true});
            }
            else {
              alert("Book Details Not Updated");
            }});
      }
      else
      {
        db.table('books').where({parent_id: bookId})
          .toArray()
          .then((child_books) => {for (var key in child_books) {db.books.delete(child_books[key]['id']);}});
          for(let test=1;test<book.quantity;test++)
          {
            db.books.add({title:state.title.toUpperCase(),language:state.language,ubn:this.randomStringGenerator(),edition:state.edition,category:state.category,
            quantity:1,publisher:state.publisher,author:state.author,parent_id:bookId});
            if(test==book.quantity-1)
            {
              db.books.update(bookId,{quantity:book.quantity}).then((updated)=> {
                if (updated)
                {
                  alert("Book Details Updated");
                  this.setState({submit:true});}
                else
                {
                  alert("Book Details Not Updated");
                }});
            }
          }
    }});
     }

     randomStringGenerator=()=>
     {
       let result= '';
       let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       let charactersLength = characters.length;
       for ( let i = 0; i < 20; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       db.books.get({ubn:result}).then ((bookDetails)=> {
         if(bookDetails)
         {
           {this.randomStringGenerator()}
         }
       });
       return result
     }
   componentDidMount()
   {
     db.books.get(this.state.bookId).then ((bookDetails)=> {
       this.setState({title:bookDetails.title});
       this.setState({edition:bookDetails.edition});
       this.setState({author:bookDetails.author});
       this.setState({category:bookDetails.category});
       this.setState({publisher:bookDetails.publisher});
       this.setState({language:bookDetails.language});
       this.setState({quantity:bookDetails.quantity});
     });


     db.table('books').where({parent_id: this.state.bookId})
       .toArray()
       .then((books) => {
          this.setState({child_books:books});
       });
 }


   handleCancel=()=>
   {
     this.setState({flag:true});
   }


render()
{


          if(this.state.flag)
          {
          return(<ViewBooks />);
          }
          if(this.state.submit)
          {
          return(<ViewBooks updatePagenumber={this.state.pagenumber} searchKeyword={this.props.searchKeyword}/>);
          }
          const Text = styled.h1`

          width: 203px;
          height: 43px;
          font-family: Raleway;
          font-style: normal;
          font-weight: 300;
          font-size: 30px;
          line-height: 42px;
          color: #000000;
          padding-bottom:50px;
            `;

            const Select=styled.select`
            border-width: 2px !important;
            border-style: solid !important;
            width:360px;
            line-height: 23px;
            padding: 2px 5px 3px;
            font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            border: 1px solid #ccc;
            font-weight: 100;
            background-color: white;
            height: 34px;
            margin-bottom: 18px;

            `;
          const DivElement=styled.div`
          padding-left:10px;
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
          const Button=styled.button`
          border:${props => props.cancel ? "1px solid #CCCCCC" : "1px solid #009688"};
          background: ${props => props.cancel ? "#CCCCCC" : "#009688"};
          box-sizing: border-box;
          width: 179px;
          height: 38px;
          color:${props => props.cancel ? "black" : "white"};
          margin-left:${props => props.cancel ? "20px" : ""};
          `;

  return(

  <div style={{"width": "100%","height": "100%","overflow": "auto"}}>
       <Text>Update Books</Text>



        <View>

          <div>
          <Title>Title</Title>
          <input  className="inputs" style={{borderColor:this.state.titleError!=''? "#ea3d49" : ""}} type="text" placeholder="Book Title"   name="title" value={this.state.title} onChange={this.handleChange}/>
          <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px"}}>{this.state.titleError}</div>
          </div>

          <div style={{"paddingLeft":"40px"}}>
          <Title>Publisher</Title>
          <input  className="inputs" type="text" style={{borderColor:this.state.publisherError!=''? "#ea3d49" : ""}} placeholder="Publisher Details"  name="publisher" value={this.state.publisher} onChange={this.handleChange}/>
          <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px"}}>{this.state.publisherError}</div>
          </div>

        </View>
        <View paddingTop="13px">
          <div>
          <Title>Edition</Title>
          <input  className="inputs" type="text" style={{borderColor:this.state.editionError!=''? "#ea3d49" : ""}} placeholder="Book Edition"  name="edition" value={this.state.edition} onChange={this.handleChange}/>
          <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px"}}>{this.state.editionError}</div>
          </div>

          <div style={{"paddingLeft":"40px"}}>
          <Title>Language</Title>
          <Select name='language' style={{borderColor:this.state.languageError!=''? "#ea3d49" : "rgb(148, 148, 148)"}} value={this.state.language} onChange={this.handleChange}>
              <option value='no-value' disabled>Choose Language</option>
              <option value='English'>English</option>
              <option value='Punjabi'>Punjabi</option>
              <option value='Hindi'>Hindi</option>
          </Select>
          <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px"}}>{this.state.languageError}</div>
          </div>

          </View>

          <View paddingTop="13px">
          <div>
          <Title>Author</Title>
          <input  className="inputs" type="text" style={{borderColor:this.state.authorError!=''? "#ea3d49" : ""}} placeholder="Author Details"  name="author" value={this.state.author} onChange={this.handleChange}/>
          <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px"}}>{this.state.authorError}</div>
          </div>
          <div style={{"paddingLeft":"40px"}}>
          <Title>Quantity</Title>
          <input  className="inputs" type="number" style={{borderColor:this.state.quantityError!=''? "#ea3d49" : ""}} placeholder="Quantity"  name="quantity" value={this.state.quantity} onChange={this.handleChange}/>
          <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px"}}>{this.state.quantityError}</div>
          </div>
          </View>

        <div style={{paddingTop:"13px"}}>
          <Title>Category</Title>
          <Select name='category' style={{borderColor:this.state.categoryError!=''? "#ea3d49" : "rgb(148, 148, 148)"}} value={this.state.category} onChange={this.handleChange}>
              <option value='no-category' disabled>Choose Category</option>
              <option value='Arts & Music'>Arts & Music</option>
              <option value='Biographies'>Biographies</option>
              <option value='Business'>Business</option>
              <option value='Computer & Tech'>Computer & Tech</option>
              <option value='Cooking'>Cooking</option>
              <option value='Hobbies & Crafts'>Hobbies & Crafts</option>
              <option value='Health & Fitness'>Health & Fitness</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Medical'>Medical</option>
          </Select>
          <div style={{fontSize:13,color:"#ea3d49",marginTop:"-15px"}}>{this.state.categoryError}</div>
          </div>





          <div style={{marginTop:"40px"}}>
          <Button push color="#009688" onClick={this.handleSubmit}>
          Submit
          </Button>
          <Button push color="#CCCCCC" onClick={this.handleCancel} cancel>
          Cancel
          </Button>


          </div>


         </div>



  );
}
}

export default UpdateBooks
