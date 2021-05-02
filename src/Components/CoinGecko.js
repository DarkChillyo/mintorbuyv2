import React, {useState, useEffect} from 'react';
import '../App.css';
import MintOrBuy from './MintOrBuy'
import Form from './Form'

class Gecko extends React.Component {
    
    state = {
        geckodata: [],
        fields: {amount: 0 }
    }
    
    componentDidMount() {
        fetch('https://api.coingecko.com/api/v3/coins/ethereum/contract/0xd46df541148932690b81092f600f35208afd4325')
        .then((response) => response.json())
        .then(data => {
            this.setState({ geckodata: data.market_data.total_supply });
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
        
        return (
            <div>
            
            <ul>
              
              <Form onChange={fields => this.onChange(fields)}/>
              <MintOrBuy 
              formData ={this.state.fields.amount}
              geckoData = {this.state.geckodata}  />
               
                
            </ul>
            </div>
        )
    }
}
   
export default Gecko;