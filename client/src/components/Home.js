import React from 'react';
import SearchFlight from './SearchFlight'; // Import the SearchFlight component

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Flight Booking</h1>

      <SearchFlight />
    </div>
  );
}

export default Home;
