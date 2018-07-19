import React, { Component } from 'react';
import Card from './Card.js';
import './styles/CardList.css';
import cn from 'classnames';

class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total_credit: 0,
    }
    this.add_credit = this.add_credit.bind(this);
    this.remove_credit = this.remove_credit.bind(this);
  }

    // adding a credit amount to the total per customer
  add_credit(amount) {
    this.setState({ total_credit: this.state.total_credit + amount })
  }

  // substracting a credit amount from the total per customer
  remove_credit(amount) {
    this.setState({ total_credit: this.state.total_credit - amount })
  }

  render_cards() {
    const { available_cards } = this.props;
    if(!available_cards) { return null }

    return available_cards.map(card => 
      <div key={card.name}>
        <Card 
          card={card}
          add_credit={this.add_credit}
          remove_credit={this.remove_credit}
        />
      </div>
    )
  }

  render() {  
    return (
    <div className="card-list">
      { this.state.total_credit
        ? <div className="card-list__label">Total Sum of the Credit Selected: £{this.state.total_credit}</div>
        : <div className="card-list__label--nonactive"> &nbsp; </div>
      }
      <div className="card-list__group">{this.render_cards()}</div>
    </div>
    )
  }
}

export default CardList;