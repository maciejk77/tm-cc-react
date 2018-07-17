import React, { Component } from 'react';
import data from './data/data.json';

class CardChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: data.cards,
      name: '',
      status: '',
      income: 0
    }
    this.handle_income_change = this.handle_income_change.bind(this);
    this.handle_name_change = this.handle_name_change.bind(this);
    this.handle_status_change = this.handle_status_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
  }


  handle_income_change(event) {
    // it is assumed that credit limit per customer is equal to 10% of income
    this.setState({ income: event.target.value });
  }

  handle_name_change(event) {
    this.setState({ name: event.target.value });
  }

  handle_status_change(event) {
    this.setState({ status: event.target.value });
  }

  handle_submit(event) {
    event.preventDefault();
    console.log(this.state);
    this.setState({name: '', status: '', income: 0});
  }

  render() {
    return (
      <form onSubmit={this.handle_submit}>
        <label>Name</label>
        <input 
          type="text" 
          name="name"
          value={this.state.name} 
          onChange={this.handle_name_change} 
        />

        <label>Income</label>
        <input 
          type="text" 
          name="income"
          value={this.state.income}
          onChange={this.handle_income_change} 
        />

        <label>Status</label>
        <input 
          type="text" 
          name="status"
          value={this.state.status} 
          onChange={this.handle_status_change}
        />
        <button type="submit">CHECK</button>
      </form>   
    )
  }
}

export default CardChecker;