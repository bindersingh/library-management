import React from 'react';
import Name from './user';

const UserList = ({users,handleDeleteTodo,handleUpdate,handleUpdateName,updatname,handleUpdateClass,updateclass}) => <table style={{"borderWidth":"1px", 'backgroundColor':"#000000", 'borderStyle':'solid','color':'#008000'}}>
<thead>
<tr>

<td>ID</td>
<td>NAME</td>
<td>CLASS</td>
<td>DELETE</td>
<td>UPDATE</td>
</tr>
</thead>

<tbody>
  {users.map((users) => <Name
    key={users.id}
    {...users}
    handleDeleteTodo={handleDeleteTodo}
    handleUpdate={handleUpdate}
    handleUpdateName={handleUpdateName}
    handleUpdateClass={handleUpdateClass}
  />)}
  </tbody>
</table>;
export default UserList;
