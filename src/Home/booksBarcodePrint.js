import React, { Component } from 'react';
import Barcode from '../Home/barcode';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';
// import { Button } from 'react-desktop/windows';
import ReactToPrint from 'react-to-print';
// import db from '../db';
class BooksBarcodePrint extends Component
{

  constructor(props)
  {
    super(props);
    this.state={
      code:this.props.barcode,
      bookId:this.props.bookId,
      parent_book_name:this.props.parent_book_name,
      single:this.props.single
      }

  }
  render()
  {
    let data='';
    if(this.state.single==="1")
    {
      data=<View
        horizontalAlignment="center"
        verticalAlignment="center"
        width="100%"
        height="100%"
        paddingLeft="90px"
        ref={el => (this.componentRef = el)}
      >
      <Barcode  barcodes={this.state.code} bookId={this.state.bookId}  single={this.state.single} />
      </View>
    }
    else {
      data=<View
        horizontalAlignment="left"
        verticalAlignment="left"
        width="100%"
        height="100%"
        paddingLeft="90px"
        ref={el => (this.componentRef = el)}
      >
      <Barcode  barcodes={this.state.code} bookId={this.state.bookId}  single={this.state.single} />
      </View>;
    }
    const Text = styled.h1`

  
    height: 43px;
    font-family: Raleway;
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    line-height: 42px;
    color: #000000;
    padding-bottom:50px;
      `;
      const Button=styled.button`
      border:${props => props.cancel ? "1px solid #CCCCCC" : "1px solid #ffa829"};
      background: ${props => props.cancel ? "#CCCCCC" : "#ffa829"};
      box-sizing: border-box;
      width: 179px;
      height: 38px;
      text-decoration:none !important;
      color:${props => props.cancel ? "black" : "white"};
      margin-left:${props => props.cancel ? "20px" : ""};
      `;
    return(
      <React.Fragment>

      <View

              padding="20px"
              horizontalAlignment="center"
              verticalAlignment="center"
              width="100%"
              height="20%"
            >

            <View
            horizontalAlignment="left"
            verticalAlignment="center"
            width="100%"
            >
            <Text>{this.state.parent_book_name} Book Barcodes</Text>
            </View>

            <View
            horizontalAlignment="right"
            verticalAlignment="center"
            width="100%"
            >

            <ReactToPrint
              trigger={() => <Button push onClick={() => console.log('Clicked!')}>
      Print
      </Button>}
              content={() => this.componentRef}
            />

            </View>



      </View>
      <div style={{height:"500px",overflow:"auto"}}>
      {data}
      </div>
      </React.Fragment>

    );
  }
}
export default BooksBarcodePrint;
