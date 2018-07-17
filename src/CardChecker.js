import React, { Component } from 'react';
import data from './data/data.json';

class CardChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: data.cards,
      name: '',
      status: '',
      income: 0,
      cards_collection: []
    }
    this.handle_income_change = this.handle_income_change.bind(this);
    this.handle_name_change = this.handle_name_change.bind(this);
    this.handle_status_change = this.handle_status_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
    this.is_for_student = this.is_for_student.bind(this);
    this.is_for_all = this.is_for_all.bind(this);
    this.is_for_set_income = this.is_for_set_income.bind(this);
    this.fetch_student_cards_data = this.fetch_student_cards_data.bind(this);
    this.fetch_for_all_cards_data = this.fetch_for_all_cards_data.bind(this);
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

  is_for_student() {
    return this.state.status === 'Student'
  }

  is_for_all() {
    // return this.state.status === 'All'
    return true;
  }

  is_for_set_income() {
    return this.state.status >= this.state.income
  }

  fetch_student_cards_data() {
    return this.state.cards.filter(card => card.status === "Student");
    //console.log('student card data => ', student_card)
    //for(let obj in student_card) { console.log(obj.apr) } 
  }

  fetch_for_all_cards_data() {
    return this.state.cards.filter(card => card.status === "All");
    //console.log('student card data => ', student_card)
    //for(let obj in student_card) { console.log(obj.apr) } 
  }

  fetch_for_income_cards_data() {
    return this.state.cards.filter(card => this.state.income >= card.status);
    //console.log('student card data => ', student_card)
    //for(let obj in student_card) { console.log(obj.apr) } 
  }

  handle_submit(event) {
    event.preventDefault();

    let collection = [];

    if(this.is_for_student()) {
      const cards_data = this.fetch_student_cards_data();
      //console.log('is for student ===> ', cards_data);  

      collection = collection.concat(cards_data);
      console.log('collection ===> ', collection);
    } 

    if(this.is_for_all()) {
      const cards_data = this.fetch_for_all_cards_data();
      //console.log('is for for all ===> ', cards_data);  

      collection = collection.concat(cards_data);
      console.log('collection ===> ', collection);
    } 

    if(this.is_for_set_income()) {
      const cards_data = this.fetch_for_income_cards_data();
      //console.log('is for for income ===> ', cards_data);  

      collection = collection.concat(cards_data);
      console.log('collection ===> ', collection);
    } 

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