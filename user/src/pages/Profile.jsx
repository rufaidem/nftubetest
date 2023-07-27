import React from "react";

const Profile = ({ userData }) => {
  return (
    <div>
      <h2>Profile Page</h2>
      {userData ? (
        <>
          <p>Username: {userData.username}</p>
          <p>Ethereum Address: {userData.ethereumAddress}</p>
        </>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;

