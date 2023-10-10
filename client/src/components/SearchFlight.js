import React, { useState, useEffect } from 'react';
import BookFlight from './BookFlight';

function SearchFlight() {
  const [airports, setAirports] = useState([]);
  const [loadingAirports, setLoadingAirports] = useState(true);

  const [cityName, setCityName] = useState('');
  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(false);

  const [cart, setCart] = useState([]); // Add cart state

  useEffect(() => {
    // Make a GET request to fetch airport data
    fetch('/api/airports/airportsearch', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to get airport data');
        }
      })
      .then((data) => {
        setAirports(data);
        setLoadingAirports(false);
      })
      .catch((error) => {
        console.error('Error while fetching airport data:', error);
      });
  }, []);

  const handleFlightSearch = (e) => {
    e.preventDefault();

    if (!cityName) {
      alert('Please enter a city name for flight search.');
      return;
    }

    setLoadingFlights(true);

    // Make a POST request to search for flights based on the city name
    fetch('/api/flights/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city: cityName }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to get flight data');
        }
      })
      .then((data) => {
        setFlights(data);
        setLoadingFlights(false);
      })
      .catch((error) => {
        console.error('Error while fetching flight data:', error);
        setLoadingFlights(false);
      });
  };

  // Define the addToCart function to add flights to the cart
  const addToCart = (flight) => {
    // Check if the flight is already in the cart
    if (!cart.some((item) => item.id === flight.id)) {
      // If not, add it to the cart
      setCart([...cart, flight]);
    }
  };

  // Define the removeFromCart function to remove flights from the cart
  const removeFromCart = (flightId) => {
    const updatedCart = cart.filter((item) => item.id !== flightId);
    setCart(updatedCart);
  };

  return (
    <div className="home">
      <h2>Available Airports</h2>
      {loadingAirports ? (
        <p>Loading airport data...</p>
      ) : (
        <div className="airport-table-container">
          <table className="airport-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                {/* Add more table headers if needed */}
              </tr>
            </thead>
            <tbody>
              {airports.map((airport) => (
                <tr key={airport.id}>
                  <td>{airport.id}</td>
                  <td>{airport.name}</td>
                  <td>{airport.location}</td>
                  {/* Add more table data cells if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Search for Flights</h2>
      <form onSubmit={handleFlightSearch}>
        <label>
          City Name:
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loadingFlights ? (
        <p>Loading flight data...</p>
      ) : (
        <div className="flight-table-container">
          <table className="flight-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Airline</th>
                <th>Flight Date</th>
                <th>Departure Time</th>
                <th>Destination Time</th>
                <th>Price</th>
                <th>Departure Airport ID</th>
                <th>Destination Airport ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.name}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.flight_date}</td>
                  <td>{flight.departure_time}</td>
                  <td>{flight.destination_time}</td>
                  <td>{flight.price}</td>
                  <td>{flight.departure_airport_id}</td>
                  <td>{flight.destination_airport_id}</td>
                  <td>
                    <button onClick={() => addToCart(flight)}>Add to Cart</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Conditional rendering of BookFlight */}
      {cart.length > 0 && (
        <BookFlight flights={cart} removeFromCart={removeFromCart} />
      )}
    </div>
  );
}

export default SearchFlight;
