import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function UserAccess({ onSignIn, onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const history = useHistory();

  const handleSignIn = async () => {
    if (!username || !password) {
      setInputError(true);
      return;
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        onSignIn(username);
      } else {
        setInputError(true);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setInputError(true);
    }
  };

  const handleSignUp = async () => {
    if (!username || !password || !firstName || !lastName || !email) {
      setInputError(true);
      return;
    }
  
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          first_name: firstName, 
          last_name: lastName,   
          email: email,
        }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        setIsRegistered(true);
        history.push('/profile', { userData });
      } else {
        setInputError(true);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setInputError(true);
    }
  };
  

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsRegistered(false);
        setIsSignIn(true);
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setInputError(false);
        history.push('/signin');
      } else {
        console.error('Error signing out:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="user-access">
      {isSignIn ? (
        <div>
          <h2>Sign In</h2>
          {inputError && <p className="error">Please fill in all fields or check your credentials</p>}
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="button" onClick={handleSignIn}>Sign In</button>
          </form>
          <p>Don't have an account? <button onClick={() => setIsSignIn(false)}>Sign Up</button></p>
        </div>
      ) : (
        <div>
          {!isRegistered ? (
            <div>
              <h2>Sign Up</h2>
              {inputError && <p className="error">Please fill in all fields</p>}
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button type="button" onClick={handleSignUp}>Sign Up</button>
              </form>
            </div>
          ) : (
            <div>
              <p>Registration successful! You can now sign in.</p>
              <button onClick={() => setIsSignIn(true)}>Sign In</button>
            </div>
          )}
          {isRegistered && (
            <div>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserAccess;
