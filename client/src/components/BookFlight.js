import React, { useState } from 'react';

function BookFlight(props) {
  const { flights, removeFromCart } = props;

  return (
    <div className="flight-booking">
      <h2>Cart</h2>
      <div className="cart-list">
        {flights.map((cartItem) => (
          <div key={cartItem.id} className="cart-item">
            <p>ID: {cartItem.id}</p>
            <p>Name: {cartItem.name}</p>
            <p>Airline: {cartItem.airline}</p>
            <p>Price: ${cartItem.price.toFixed(2)}</p>
            <button onClick={() => removeFromCart(cartItem.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookFlight;
