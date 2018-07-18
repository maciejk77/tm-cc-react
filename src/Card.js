import React, { Component } from 'react';

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
      <div>
        <div>{apr}</div>
        <div>{balance_mths}</div>
        <div>{credit_avail}</div>
        <div>{name}</div>
        <div>{purchase_mths}</div>
        <div>{status}</div>
        { this.state.to_add 
          ? <button onClick={() => this.handle_add(credit_avail)}>ADD</button> 
          : <button onClick={() => this.handle_remove(credit_avail)}>REMOVE</button> 
        }
        <div>------------</div>
      </div>
    )
  }
}

export default Card;