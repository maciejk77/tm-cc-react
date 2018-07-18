import React, { Component } from 'react';
import data from './data/credit_cards_data.json';
import CardList from './CardList.js';

class CardChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: data.cards,
      name: '',
      status: '',
      income: 0,
      collection: null
    }
    this.handle_income_change = this.handle_income_change.bind(this);
    this.handle_name_change = this.handle_name_change.bind(this);
    this.handle_status_change = this.handle_status_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);

    this.is_for_student = this.is_for_student.bind(this);
    this.is_for_all = this.is_for_all.bind(this);
    this.is_for_set_income = this.is_for_set_income.bind(this);

    //this.is_fetching_cards_data_with_status = this.is_fetching_cards_data_with_status.bind(this);
    //this.is_fetching_cards_data_by_income = this.is_fetching_cards_data_by_income.bind(this);
  }


  handle_income_change(event) {
    this.setState({ income: event.target.value });
  }

  handle_name_change(event) {
    this.setState({ name: event.target.value });
  }

  handle_status_change(event) {
    this.setState({ status: event.target.value });
  }

  is_for_student() {
    // will be available to those with status Student
    return this.state.status.trim().toLowerCase() === 'student';
  }

  is_for_all() {
    // will always be true, card available to all
    return true;
  }

  is_for_set_income() {
    // will be available to those with income greater/equal to status limit e.g. 16k
    return this.state.status >= this.state.income
  }

  is_fetching_cards_data_with_status(keyword) {
    return this.state.cards.filter(card => card.status === keyword);
  }

  is_fetching_cards_data_by_income() {
    return this.state.cards.filter(card => card.status <= this.state.income);
  }

  handle_submit(event) {
    event.preventDefault();

    // the below logic should work if there are multiple cards
    // meeting a given individual criteria e.g. 2 cards with status Student

    let cards_collection = [];

    if(this.is_for_student()) {
      const cards_data = this.is_fetching_cards_data_with_status("Student"); 
      cards_collection = cards_collection.concat(cards_data);
    } 

    if(this.is_for_all()) {
      const cards_data = this.is_fetching_cards_data_with_status("All");
      cards_collection = cards_collection.concat(cards_data);
    } 

    if(this.is_for_set_income()) {
      const cards_data = this.is_fetching_cards_data_by_income();
      cards_collection = cards_collection.concat(cards_data);
    } 

    this.setState({ collection: cards_collection });
    this.setState({ name: '', status: '', income: 0 });
  }

  render() {
    return (
      <div>
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
      <CardList available_cards={this.state.collection} />
      </div>   
    )
  }
}

export default CardChecker;