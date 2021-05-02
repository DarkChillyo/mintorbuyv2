import React, { Component } from "react";
import "../App.css";
import Form from "./Form";
import MintOrBuy from './MintOrBuy'
class App1 extends Component {
  state = {
    fields: {
        amount: 0
    }
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Form onChange={fields => this.onChange(fields)} />
        
        <MintOrBuy formData={this.state.fields.amount} />
      </div>
    );
  }
}

export default App1;