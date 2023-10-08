import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Access from './Access.js'; // Import the UserAccess component

function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false); // State to control the visibility of the Sign Up component

  useEffect(() => {
    // Fetch user profile data when logged in
    if (loggedIn) {
      fetch('/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Add your authentication token here if needed
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user profile data');
          }
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loggedIn]);

  const handleSignIn = (user) => {
    setLoggedIn(true);
    setUsername(user);
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setUsername('');
    setUserData(null);
  };

  return (
    <div className="profile">
      {!loggedIn ? (
        <div>
          <Access onSignIn={handleSignIn} onSignUp={() => setShowSignUp(true)} /> {/* Use the UserAccess component */}
          {showSignUp && (
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link> {/* Link to the Sign Up route */}
            </p>
          )}
        </div>
      ) : (
        <div>
          <h2>Profile</h2>
          <p>Welcome, {username}!</p>
          {userData && (
            <div>
              <h3>User Profile</h3>
              <p>Username: {userData.username}</p>
              <p>First Name: {userData.firstName}</p>
              <p>Last Name: {userData.lastName}</p>
              <p>Email: {userData.email}</p>
              {/* Additional profile data can be displayed here */}
            </div>
          )}
          <button type="button" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
