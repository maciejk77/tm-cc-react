import React, { Component } from 'react';
import data from './data/credit_cards_data.json';
import CardList from './CardList.js';
import './styles/CardChecker.css';

class CardChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: data.cards,
      name: '',
      status: '',
      income: '',
      collection: null
    }
    this.handle_submit = this.handle_submit.bind(this);
    this.is_for_student = this.is_for_student.bind(this);
    this.is_for_all = this.is_for_all.bind(this);
    this.is_for_set_income = this.is_for_set_income.bind(this);

    //this.is_fetching_cards_data_with_status = this.is_fetching_cards_data_with_status.bind(this);
    //this.is_fetching_cards_data_by_income = this.is_fetching_cards_data_by_income.bind(this);
  }

  handle_change(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
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
    this.setState({ name: '', status: '', income: '' });
  }

  render() {
    return (
      <div>
        <div className="logo"></div>
        <form onSubmit={this.handle_submit}> 
          <table className="form-group">        
            <tr>
              <td className="label">Name</td>
              <input
                className="input" 
                type="text" 
                name="name"
                value={this.state.name} 
                onChange={this.handle_change.bind(this)}
              />
            </tr>
            <tr>
              <td className="label">Income</td> 
              <input
                className="input" 
                type="text" 
                name="income"
                value={this.state.income}
                onChange={this.handle_change.bind(this)}
              />
            </tr>
            <tr>
              <td className="label">Status</td>      
              <input 
                className="input"
                type="text" 
                name="status"
                value={this.state.status} 
                onChange={this.handle_change.bind(this)}
              />
            </tr>
          </table>  
          <button className="form-button" type="submit">CHECK</button>        
        </form>
        <CardList 
          className="card-list"
          available_cards={this.state.collection} 
        />
      </div>   
    )
  }
}

export default CardChecker;