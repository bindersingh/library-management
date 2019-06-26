import React, { Component } from 'react';
import { TextInput } from 'react-desktop/windows';

class Demo extends Component {
  static defaultProps = {
    color: '#cc7f29',
    theme: 'light'
  };

  handleChange = e => console.log(e.target.value);

  constructor(props){
    super(props);
    this.state = {
      fields : {
        'one': 'some text',
        'two': 'some more text',
      }
    };
    this._handleChange = this._handleChange.bind(this);
  }


  // generic handle change function
  _handleChange(ev) {
    // create clone of fields object using ES6 spread operator
    let fields = {this.state.fields};
    // update specified key in the fields object using the input's name attribute
    fields[ev.target.name] = ev.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <TextInput
        ref="input"
        theme={this.props.theme}
        color={this.props.color}
        background
        label="My Input"
        placeholder="My Input"
        onChange={this._handleChange}
      />
    );
  }
}
export default Demo;
