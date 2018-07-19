import React, { Component } from 'react';
import './styles/Card.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to_add: true
    }
  }

  handle_add(credit) {
    this.props.add_credit(credit)
    this.setState({to_add: !this.state.to_add})
  }

  handle_remove(credit) {
    this.props.remove_credit(credit)
    this.setState({to_add: !this.state.to_add})
  }

  render() {
    const { name, status, apr, balance_mths, purchase_mths, credit_avail } = this.props.card;
    return (
      <div className="card">
        <div className="card__item">APR: {apr}%</div>
        <div className="card__item">Balance: {balance_mths} months</div>
        <div className="card__item">Credit available: £{credit_avail}</div>
        <div className="card__item">Card name: {name}</div>
        <div className="card__item">Purchase: {purchase_mths} months</div>
        <div className="card__item">Status: {typeof(status) === "number" && '£'}{status}</div>
        { this.state.to_add 
          ? <button className="card__button" onClick={() => this.handle_add(credit_avail)}>ADD</button> 
          : <button className="card__button card__button--remove" onClick={() => this.handle_remove(credit_avail)}>REMOVE</button> 
        }
      </div>
    )
  }
}

export default Card;