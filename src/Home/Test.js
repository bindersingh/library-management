// import React, { Component } from 'react'
// import BarcodeReader from 'react-barcode-reader'
//
// class Test extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       result: '',
//     }
//
//     this.handleScan = this.handleScan.bind(this)
//   }
//   handleScan(data){
//
//     this.setState({
//       result: data,
//     })
//   }
//   handleError(err){
//     console.error(err)
//   }
//   hand=(evt)=>
//   {
// this.setState({result:evt.target.value});
//   }
//   render(){
//
//     return(
//       <div>
//         <BarcodeReader
//           onError={this.handleError}
//           onScan={this.handleScan}
//           />
//         <p>{this.state.result}</p>
//         <input type="text" onChange={this.hand} style={{'backgroundColor':"white",border:"1px solid black",color:'black'}} value={this.state.result} />
//       </div>
//     )
//   }
// }
// export default Test
