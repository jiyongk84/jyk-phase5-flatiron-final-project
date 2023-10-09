import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import SearchResults from './SearchResults';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Switch>
          <Route path="/" exact component={() => (
            <div>
              <h1>Paradise Airlines</h1>
              <Home onSearch={setSearchResults} /> {/* Pass setSearchResults function */}
            </div>
          )} />
          <Route path="/profile" component={Profile} />
          <Route path="/search-results" component={() => (
            <SearchResults searchResults={searchResults} /> // Pass searchResults as a prop
          )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
