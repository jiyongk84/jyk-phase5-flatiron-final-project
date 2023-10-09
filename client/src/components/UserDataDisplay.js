import React from 'react';

function UserDataDisplay({ userData }) {
  return (
    <div className="user-data-display">
      <h2>User Data Display</h2>
      <p>Username: {userData.username}</p>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDataDisplay;
