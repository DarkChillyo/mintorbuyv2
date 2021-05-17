import React, { Component } from "react";
import "../App.css";
import Form from "./Form";
import MintOrBuy from './MintOrBuy'
import Gecko from './CoinGecko'
import Etherscan from './Etherscan'
import {fetchBSCData} from './Covalent'


class App1 extends Component {
  state = {
    fields: {
        amount: 0,
        geckoData:0
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
        
        <Etherscan />
        {fetchBSCData}
      </div>
    );
  }
}

export default App1;