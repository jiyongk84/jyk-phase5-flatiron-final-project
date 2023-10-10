import React, { useState, useEffect } from 'react';

function SearchFlight() {
  const [airports, setAirports] = useState([]);
  const [loadingAirports, setLoadingAirports] = useState(true);

  const [cityName, setCityName] = useState('');
  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(false);

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

  return (
    <div className="home">
      <h2>Available Airports</h2>
      {loadingAirports ? (
        <p>Loading airport data...</p>
      ) : (
        <table>
          {/* Display Airport data */}
        </table>
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
        <div>
          <h3>Flight Search Results</h3>
          <table>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchFlight;