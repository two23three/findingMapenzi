import React, { useState, useEffect } from 'react';
import userData from '../user.json'; // Importing initial user data from JSON file
import './Profile.css';
import NavBar from './NavBar';
import LoveSurvey from './LoveSurvey';
function Profile() {
  // State that has user profile info
  const [profileData, setProfileData] = useState(userData);

  // State to track whether the user is signing up or logging in
  const [isSigningUp, setIsSigningUp] = useState(false);

  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to track login credentials
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
  });

  // Fetch user profiles from local storage upon component mount
  useEffect(() => {
    const storedUserProfiles = localStorage.getItem('userProfiles');
    if (storedUserProfiles) {
      setProfileData(JSON.parse(storedUserProfiles));
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
  
    // Retrieve user profiles from local storage
    const storedUserProfiles = JSON.parse(localStorage.getItem('userProfiles'));
  
    // Find the logged-in user by username and password
    const loggedInUser = storedUserProfiles.find(
      (user) =>
        user.username === loginCredentials.username &&
        user.password === loginCredentials.password
    );
  
    // If the logged-in user is found, update profileData and set isLoggedIn to true
    if (loggedInUser) {
      setProfileData(loggedInUser);
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
  
    // Retrieve existing user data from local storage
    const existingUserData = JSON.parse(localStorage.getItem('userProfiles')) || [];
  
    // Create a new user profile object
    const newUserProfile = { ...profileData };
  
    // Add the new user profile to the existing array
    const newUserProfiles = [...existingUserData, newUserProfile];
  
    // Save the updated array back to local storage
    localStorage.setItem('userProfiles', JSON.stringify(newUserProfiles));
  
    // Optionally, you can also update the state to reflect the logged-in status
    setIsSigningUp(false);
    setIsLoggedIn(true);
  };
  
  
  

  return (
    <div>
      { isLoggedIn &&<NavBar/>}
    <div className="profile-container">
  
     
      <h2>Profile</h2>
      {!isLoggedIn ? (
        isSigningUp ? (
          <form className="profile-form" onSubmit={handleSignUp}>
            <label className='inputbox'>
  Username*:
  <input
    type="text"
    name="username"
    value={profileData.username}
    onChange={handleInputChange}
  />
</label>
<label>
  Age*:
  <input
    type="number"
    name="age"
    value={profileData.age}
    onChange={handleInputChange}
  />
</label>
<label>
  Gender*:
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
<label className='inputbox'>
  Password*:
  <input
    type="password"
    name="password"
    value={profileData.password}
    onChange={handleInputChange}
  />
</label>
<label className='inputbox'>
  Bio*:
  <textarea
    name="bio"
    value={profileData.bio}
    onChange={handleInputChange}
  />
</label>

            <button className="submit" type="submit">
              Sign Up
            </button>
          </form>
        ) : (
          <div className='login'>
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
            <button onClick={handleLogin}
            class="learn-more">
            <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
            </span>
            <span class="button-text">Login</span>
            </button>
            <button onClick={() => setIsSigningUp(true)}
            class="learn-more">
            <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
            </span>
            <span class="button-text">Sign Up</span>
            
            </button>
          </div>
        )
      ) :
       (
       <div>
        <div className="profile-details">
         
          <h3>Profile Details:</h3>
          <p>Name: {profileData.username}</p>
          <p>Age: {profileData.age}</p>
          <p>Gender: {profileData.gender}</p>
          <p>Bio: {profileData.bio}</p>
        </div>
        </div>
        
      )}
    
    </div>
     <div>
     {isLoggedIn&& <LoveSurvey/>}
     </div>
     </div>

  );
}

export default Profile;
