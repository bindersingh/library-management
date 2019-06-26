import React, { Component } from 'react';
import JsBarcode from 'jsbarcode';
// import { View} from 'react-desktop/windows';
import db from '../db';
class Barcode extends Component
{
  constructor(props)
  {
    super(props);
    this.state={code:this.props.barcodes,
        bookId:this.props.bookId,
        child_books_ubn:[],
        single:this.props.single
      }
      //console.log("Hey Buddy !!!!!! "+this.state.single);
  }
  componentDidMount()
  {
    let child_books_ubn=[];
    if(this.state.single==='1')
    {
      JsBarcode("#single_barcode",this.state.code, {
        fontSize:14,
        displayValue:true,
        width:1.7,
        height:100
      });
    }
    else
    {
      db.table('books').where({parent_id: this.state.bookId})
        .toArray()
        .then((books) => {
          console.log("There are books "+books);
          for(let x=0; x<books.length; x++)
          {
            child_books_ubn[x]=books[x]['ubn'];
          }
          child_books_ubn[books.length]=this.state.code;
          this.setState({child_books_ubn:child_books_ubn});
        //  const value=this.state.code;
          for(let x=0; x<=child_books_ubn.length;x++)
          {
            let x1="#barcode"+x;
            JsBarcode(x1,child_books_ubn[x], {
              fontSize:13,
              displayValue:true,
              width:1,
              height:70
            });
          }
        });
    }

    }

  render()
  {
    let demo=[];
    let demo2=[];
    let demo3=[];
    let first_barcode=Math.ceil(this.state.child_books_ubn.length/3);
    console.log(first_barcode);
    let final_barcode=first_barcode+first_barcode;
    for(let x=0; x<first_barcode;x++)
    {
      let x1="barcode"+x;
      demo[x]=<div style={{paddingTop:"10px"}} key={x}><svg id={x1}></svg><br/></div>;

    }
    for(let x=first_barcode; x<final_barcode;x++)
    {
      let x1="barcode"+x;
      demo2[x]=<div style={{paddingTop:"10px"}} key={x}><svg id={x1}></svg><br/></div>;
    }
    for(let x=final_barcode; x<this.state.child_books_ubn.length;x++)
    {
      let x1="barcode"+x;
      demo3[x]=<div style={{paddingTop:"10px"}} key={x}><svg id={x1}></svg><br/></div>;
    }
    if(this.state.single==='1')
    {
      return(<svg id="single_barcode" ></svg>);
    }
    else {
    return(
      <React.Fragment>

      <div>{demo}</div>
      <div style={{paddingLeft:"30px"}}>{demo2}</div>
      <div style={{paddingLeft:"30px"}}>{demo3}</div>

      </React.Fragment>
    );
  }
  }
}

export default Barcode;
