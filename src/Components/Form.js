import React from "react";

export default class Form extends React.Component {
  state = {
    amount: "",
   
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
      amount: "",
     
    });
    this.props.onChange({
      amount: "",
      
    });
  };

  render() {
    return (
      <form>
        <input
          name="amount"
          placeholder="Amount to Mint/Buy"
          value={this.state.amount}
          onChange={e => this.change(e)}
        />
                
      </form>
    );
  }
}