import React, { useState } from 'react';

function Home() {
    const [departureCity, setDepartureCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
  
    const handleSearch = () => {
      // Implement your search logic here
      // You can use the state values (departureCity, destinationCity, departureDate, returnDate)
    };
  
    return (
      <div className="home">
        <h2>Book Your Flight</h2>
        <form>
          <div className="form-group">
            <label htmlFor="departureCity">Departure City</label>
            <input
              type="text"
              id="departureCity"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              placeholder="Enter departure city"
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="destinationCity">Destination City</label>
            <input
              type="text"
              id="destinationCity"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              placeholder="Enter destination city"
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
  
          <button type="button" onClick={handleSearch}>Search</button>
        </form>
      </div>
    );
  }
  
  export default Home;