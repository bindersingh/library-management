import React from 'react';
import BooksDetails from '../Home/booksdetails';
import 'bootstrap/dist/css/bootstrap.css';

const BooksList = ({books,length}) =><table className="table table-bordered table-hover" style={{"fontSize":"14px"}}>
<thead>
<tr>

<th>Title</th>
<th>Edition</th>
<th>Author</th>
<th>Category</th>
<th>Publisher</th>
<th>Language</th>
<th>Quantity</th>
<th>UBN</th>

</tr>
</thead>

<tbody>
  {books.map((books) => <BooksDetails
    key={books.id}
    {...books}
    length={length}
  />)}
  </tbody>
</table>

;



export default BooksList;
