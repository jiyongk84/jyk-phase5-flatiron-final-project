import React from 'react';
import SearchFlight from './SearchFlight'; // Import the SearchFlight component
import BookFlight from './BookFlight'; // Import the BookFlight component

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Flight Booking</h1>

      {/* Render the SearchFlight component */}
      <SearchFlight />

      {/* Render the BookFlight component */}
      {/* <BookFlight /> */}
    </div>
  );
}

export default Home;
