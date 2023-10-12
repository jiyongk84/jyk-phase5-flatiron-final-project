import React, { useState, useEffect } from 'react';

function BookFlight(props) {
  const { flights, removeFromCart } = props;
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    
    fetchUserId();
  }, []);

  useEffect(() => {
    
    const cartTotal = flights.reduce((sum, cartItem) => sum + cartItem.price, 0);
    setTotal(cartTotal);
  }, [flights]);

  // Function to fetch the user ID
  const fetchUserId = async () => {
    try {
      const response = await fetch('/api/users/profile');
      if (response.ok) {
        const data = await response.json();
        setUserId(data.user_id);
        console.log(data.user_id)
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  // Function to generate an order number
  function generateOrderNumber() {
    const timestamp = Date.now();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${timestamp}-${randomDigits}`;
  }

  const handleSubmit = async () => {
    if (flights.length === 0) {
      alert('Cart is empty. Add flights to the cart before submitting.');
      return;
    }

    try {
      setSubmitting(true);

      const bookings = flights.map((cartItem) => ({
        user_id: userId, 
        flight_id: cartItem.name, 
        order_number: generateOrderNumber(),
        order_status: 0
      }));
      console.log(bookings)
      
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookings),
      });

      if (bookingResponse.ok) {
        alert('Booking successfully submitted!');
        
      } else {
        const errorData = await bookingResponse.json();
        console.error('Error submitting booking:', errorData);
        alert('An error occurred while submitting the booking.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the booking.');
    } finally {
      setSubmitting(false);
    }
  }

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

      <div className="cart-total">
        <p>Total: ${total.toFixed(2)}</p>
      </div>

      <div className="cart-count">
        <p>Total Items: {flights.length}</p>
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}

export default BookFlight;
