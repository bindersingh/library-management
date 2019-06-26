import React from "react";
// import { Text } from 'react-desktop/windows';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import print from '../print.png';
import deleted from '../deleted.png';

const ChildBookDetails = ({books,counter,parentBooks,quantity,deleteSingleRecord,printSingleBarcode}) =>
    {
      // const Button=styled.button`
      // border:${props => props.cancel ? "1px solid #CCCCCC" : "1px solid #009688"};
      // background: ${props => props.cancel ? "#CCCCCC" : "#009688"};
      // box-sizing: border-box;
      //
      // color:${props => props.cancel ? "black" : "white"};
      // margin-left:${props => props.cancel ? "20px" : "5px"};
      // cursor:pointer;
      // `;
      const Text=styled.span`
      font-size:13px;
      font-weight:600;
      color:rgb(128,128,128);
      `;
      return(
        <React.Fragment>
    <Text>Total Books are {quantity}</Text>
    <div style={{height: "500px",overflow: "auto"}}>
    <table className="table table-bordered table-striped table-hover" style={{"fontSize":"14px"}}>
    <thead>
    <tr>
    <th style={{"textAlign":"center"}}>ID</th>
    <th style={{"textAlign":"center"}}>Title</th>
    <th style={{"textAlign":"center"}}>Edition</th>
    <th style={{"textAlign":"center"}}>Author</th>
    <th style={{"textAlign":"center"}}>Category</th>
    <th style={{"textAlign":"center"}}>Publisher</th>
    <th style={{"textAlign":"center"}}>Language</th>
    <th style={{"textAlign":"center"}}>Quantity</th>
    <th style={{"textAlign":"center"}}>Action</th>
    </tr>
    </thead>
    <tbody>
    {books.map((book,i) =>

                <tr key={book.id}>
                <td style={{"textAlign":"center"}}>{++counter}</td>
                <td style={{"textAlign":"center"}}>{book.title}</td>
                <td style={{"textAlign":"center"}}>{book.edition}</td>
                <td style={{"textAlign":"center"}}>{book.author}</td>
                <td style={{"textAlign":"center"}}>{book.category}</td>
                <td style={{"textAlign":"center"}}>{book.publisher}</td>
                <td style={{"textAlign":"center"}}>{book.language}</td>
                <td style={{"textAlign":"center"}}>{book.quantity}</td>
                <td style={{"textAlign":"center"}}>

                <span style={{"paddingLeft":"10px"}}>
                <img src={print} onClick={()=>printSingleBarcode(book.id)} height="32px" width="32px" style={{cursor:"pointer"}}/>
                </span>
                <span style={{"paddingLeft":"10px"}}>
                  <img src={deleted} onClick={()=>deleteSingleRecord(book.id,parentBooks.id)} height="32px" width="32px" style={{cursor:"pointer"}}/>
                  </span>

                </td>
                </tr>
      )}
      <tr key={parentBooks.id}>
      <td style={{"textAlign":"center"}}>{++counter}</td>
      <td style={{"textAlign":"center"}}>{parentBooks.title}</td>
      <td style={{"textAlign":"center"}}>{parentBooks.edition}</td>
      <td style={{"textAlign":"center"}}>{parentBooks.author}</td>
      <td style={{"textAlign":"center"}}>{parentBooks.category}</td>
      <td style={{"textAlign":"center"}}>{parentBooks.publisher}</td>
      <td style={{"textAlign":"center"}}>{parentBooks.language}</td>
      <td style={{"textAlign":"center"}}>1</td>
      <td style={{"textAlign":"center"}}>

      <span style={{"paddingLeft":"10px"}}>
      <img src={print} height="32px" onClick={()=>printSingleBarcode(parentBooks.id)} width="32px" style={{cursor:"pointer"}}/>
      </span>


      </td>
      </tr>

      </tbody>
      </table>




    </div>
    </React.Fragment>
  );
  }


export default ChildBookDetails;
