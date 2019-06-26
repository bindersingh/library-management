import React from 'react';


const BooksDetails = ({length,title,edition,author,category,publisher,language,quantity,ubn}) => <tr>

          
          <td>
              <span>{title}</span>
          </td>
          <td>
              <span>{edition}</span>
          </td>
          <td>
              <span>{author}</span>
          </td>
          <td>
              <span>{category}</span>
          </td>
          <td>
              <span>{publisher}</span>
          </td>
          <td>
              <span>{language}</span>
          </td>
          <td>
              <span>{quantity}</span>
          </td>
          <td>
              <span>{ubn}</span>
          </td>

          </tr>;


export default BooksDetails;
