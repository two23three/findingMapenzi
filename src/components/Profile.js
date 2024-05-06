import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  // State that has user profile info
  const [profileData, setProfileData] = useState({
    username: '',
    age: '',
    gender: '',
    bio: '',
    password: '',
  });

  // State to track whether the user is signing up or logging in
  const [isSigningUp, setIsSigningUp] = useState(false);

  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to track login credentials
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
  });

  // Fetch user profile data from local storage upon component mount
  useEffect(() => {
    const storedProfileData = localStorage.getItem('profileData');
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    }
  }, []);

  // Handle form input changes for login
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve profile data from local storage
    const storedProfileData = JSON.parse(localStorage.getItem('profileData'));

    // Check if username and password match stored profile data
    if (
      storedProfileData &&
      storedProfileData.username === loginCredentials.username &&
      storedProfileData.password === loginCredentials.password
    ) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  // Handle form input changes for sign-up
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle sign-up submission
  const handleSignUp = (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in profileData) {
      if (profileData[key] === '') {
        alert('Please fill in all fields.');
        return; // Exit the function without setting submitted state
      }
    }

    // Check if the age is below 18
    if (profileData.age < 18) {
      alert('You must be 18 years or older to sign up.');
      return; // Exit the function without setting submitted state
    }

    // Save profile data to local storage
    localStorage.setItem('profileData', JSON.stringify(profileData));

    // Set signing up status to false and log the user in
    setIsSigningUp(false);
    setIsLoggedIn(true);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {!isLoggedIn ? (
        isSigningUp ? (
          <form className="profile-form" onSubmit={handleSignUp}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Bio:
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
              />
            </label>
            <button className='submit' type='submit'>
              Sign Up
            </button>
          </form>
        ) : (
          <div>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={loginCredentials.username}
                onChange={handleLoginInputChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={loginCredentials.password}
                onChange={handleLoginInputChange}
              />
            </label>
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => setIsSigningUp(true)}>Sign Up</button>
          </div>
        )
      ) : (
        <div className="profile-details">
          <h3>Profile Details:</h3>
          <p>Name: {profileData.username}</p>
          <p>Age: {profileData.age}</p>
          <p>Gender: {profileData.gender}</p>
          <p>Bio: {profileData.bio}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
