import React from 'react';

function BookFlight(props) {
  const { flights, removeFromCart } = props;

  return (
    <div className="flight-booking">
      <h2>Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Airline</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((cartItem) => (
            <tr key={cartItem.id} className="cart-item">
              <td>{cartItem.id}</td>
              <td>{cartItem.name}</td>
              <td>{cartItem.airline}</td>
              <td>${cartItem.price.toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(cartItem.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookFlight;
