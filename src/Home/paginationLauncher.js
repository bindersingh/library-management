import React from "react";
import Pagination from '../Home/Pagination';
// import { Button } from 'react-desktop/windows';
import 'bootstrap/dist/css/bootstrap.css';
// import styled from 'styled-components';
import print from '../print.png';
import deleted from '../deleted.png';
import upload from '../upload.png';
import view from '../view.png';
const PaginationLauncher = ({books,onChangePage,pageOfItems,tempSize,updateRecord,printRecord,deleteRecord,tempPageNumber,delValue,viewRecord}) =>
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
      return(
        <div>
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
    {pageOfItems.map((book,i) =>

                <tr key={book.id}>
                <td style={{"textAlign":"center"}}>{++tempSize}</td>
                <td style={{"textAlign":"center"}}>{book.title}</td>
                <td style={{"textAlign":"center"}}>{book.edition}</td>
                <td style={{"textAlign":"center"}}>{book.author}</td>
                <td style={{"textAlign":"center"}}>{book.category}</td>
                <td style={{"textAlign":"center"}}>{book.publisher}</td>
                <td style={{"textAlign":"center"}}>{book.language}</td>
                <td style={{"textAlign":"center"}}>{book.quantity}</td>
                <td style={{"textAlign":"center"}}>
                <span style={{"paddingLeft":"10px"}}>
                <img src={upload} alt="upload" onClick={()=>updateRecord(book.id)} height="32px" width="32px" style={{cursor:"pointer"}}/>
                </span>
                <span style={{"paddingLeft":"10px"}}>
                <img src={print} alt="print" onClick={()=>printRecord(book.id)} height="32px" width="32px" style={{cursor:"pointer"}}/>
                </span>
                <span style={{"paddingLeft":"10px"}}>
                  <img src={deleted} alt="delete" onClick={()=>deleteRecord(book.id)} height="32px" width="32px" style={{cursor:"pointer"}}/>
                  </span>
                  <span style={{"paddingLeft":"10px"}}>
                    <img src={view} alt="view" onClick={()=>viewRecord(book.id)} height="32px" width="32px" style={{cursor:"pointer"}}/>
                  </span>
                </td>
                </tr>
      )}

      </tbody>
      </table>

    <Pagination items={books} pagenumber={tempPageNumber} delValue={delValue} onChangePage={onChangePage} />


    </div>
  );
  }


export default PaginationLauncher;
