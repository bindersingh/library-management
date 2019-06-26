
export function PostData(userData)
{

   console.log(userData);
  let formData = new FormData();    //formdata object
  formData.append('username', userData.username);   //append the values with key, value pair
  formData.append('password', userData.password);


  return new Promise((resolve,reject)=>{
    fetch("http://apitest.com/api/api_login",{
      method:'POST',
      headers:{
        'Accept':'application/json'
      },
      body:formData
    })
    .then((response) => response.json())
    .then((responseJson) => {
      resolve(responseJson);
    })
    .catch((error) => {
        reject(error);
    })
  });
}
