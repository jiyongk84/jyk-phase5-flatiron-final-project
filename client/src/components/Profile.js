import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserAccess from './UserAccess.js';

function Profile() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({
    user_id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: ''
  });
  const [bookings, setBookings] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
      fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

      // Fetch user's bookings
      fetch('/api/bookings/0', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user bookings');
          }
        })
        .then((data) => {
          setBookings(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loggedIn]);

  const handleSignIn = (user) => {
    setLoggedIn(true);
    setUsername(user.username);
    localStorage.setItem('isLoggedIn', 'true');
    history.push('/profile');
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setUsername('');
    setUserData({
      user_id: '',
      username: '',
      first_name: '',
      last_name: '',
      email: ''
    });
    setBookings([]); // Clear the bookings data
    localStorage.setItem('isLoggedIn', 'false');
  };

  const handleSignUp = async () => {
    console.log('handleSignUp called');
  };

  return (
    <div className="profile">
      {!loggedIn ? (
        <div>
          <UserAccess onSignIn={handleSignIn} onSignUp={handleSignUp} />
          {showSignUp && (
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          )}
        </div>
      ) : (
        <div>
          <p className="welcome-text">Welcome, <span className="username-text">{userData.username}</span>!</p>
          {userData.user_id && (
            <div className='profile-data'>
              <h3>Profile</h3>
              <p>Username: {userData.username}</p>
              <p>First Name: {userData.first_name}</p>
              <p>Last Name: {userData.last_name}</p>
              <p>Email: {userData.email}</p>
            </div>
          )}

          {bookings.length > 0 && (
            <div className='orders'>
              <h3>Orders</h3>
              <ul>
                {bookings.map((booking) => (
                  <li key={booking.order_number}>
                    Order Number: {booking.order_number}
                    Flight ID: {booking.flight_id}
                    Order Status: {booking.order_status}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="button" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
