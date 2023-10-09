import React, { useState } from 'react';
import SearchResults from './SearchResults';

function Home() {
    const [departureCity, setDepartureCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [showResults, setShowResults] = useState(false);
  
    const handleSearch = async () => {
      // Prepare the flight search data
      const searchData = {
        departureCity,
        destinationCity,
        departureDate,
        returnDate,
      };
  
      try {
        const response = await fetch('/api/flights/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchData),
        });
  
        if (response.ok) {
          setShowResults(true); 
          // Handle a successful search response, e.g., redirect to the search results page
          // or update the UI with search results.
        } else {
          // Handle the case where the search was not successful, e.g., show an error message.
          console.error('Flight search failed');
        }
      } catch (error) {
        console.error('Error during flight search:', error);
      }
      
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

        {showResults && (
        // Render the SearchResults component when showResults is true
        <SearchResults />
        )}
      </div>
    );
  }
  
  export default Home;