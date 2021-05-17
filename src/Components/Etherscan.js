import React, {useState, useEffect} from 'react';
import '../App.css';
import MintOrBuy from './MintOrBuy'
import Form from './Form'

class Etherscan extends React.Component {
    
    state = {
        geckodata: [],
        fields: {amount: 0 }
    }
    componentDidMount() {

    fetch("https://https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xd46df541148932690b81092f600f35208afd4325&apikey=WJPF939PZUT1I27NQSKZKXHTIDH5EKTQC1")
    .then((response) => response.json())
    .then(data => {
        this.setState({ geckodata: data.result });
        console.log(data)
    });
    }

    onChange = updatedValue => {
        this.setState({
          fields: {
            ...this.state.fields,
            ...updatedValue
          }
        });
      };

   render() {

    return(
    <div>
    <Form onChange={fields => this.onChange(fields)}/>
    <MintOrBuy 
        formData ={this.state.fields.amount}
        geckoData = {(this.state.geckodata/1000000000000000000).toFixed(2)}  />
    </div>
    )
}
}

export default Etherscan