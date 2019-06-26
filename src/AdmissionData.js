
export function AdmissionData(totalList,token)
{

  let formData = new FormData();    //formdata object
  formData.append('totalList', totalList);   //append the values with key, value pair
  formData.append('token', token);
  // console.log(formData);


  return new Promise((resolve,reject)=>{
    fetch("http://apitest.com/api/api_data",{
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
        //console.log("Errors");
        alert("Internet connection Lost");
        x();
    })
  });
}
function x()
{
  console.log("x is called");
}
