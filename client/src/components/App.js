import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Switch>
          <Route path="/" exact>
            <div>
              <h1>Paradise Airlines</h1>
              <Home />
            </div>
          </Route>
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
