import React from 'react';

function UserDataDisplay({ userData }) {
  return (
    <div className="user-data-display">
      <h2>User Data Display</h2>
      <p>Username: {userData.username}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Email: {userData.email}</p>
      {/* Additional user data fields can be displayed here */}
    </div>
  );
}

export default UserDataDisplay;
