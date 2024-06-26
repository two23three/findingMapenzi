import React, { useState, useEffect } from 'react';
import './Profile.css';
import NavBar from './NavBar';
import { firestore } from '../components/firebase';
import { doc, collection, setDoc ,serverTimestamp} from "firebase/firestore";

import { Link } from 'react-router-dom';
function Profile() {
  // State that has user profile info
  const [profileData, setProfileData] = useState({});

  // State to track whether the user is signing up or logging in
  const [isSigningUp, setIsSigningUp] = useState(false);

  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to track login credentials
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
  });
  const saveDataToFirebase = async (userData) => {
    try {
      userData.timestamp = serverTimestamp(); // Add timestamp to user data
      const docRef = await setDoc(
        doc(collection(firestore, "userProfiles"), userData.username),
        userData
      );
      console.log("User profile data saved to Firebase successfully!", docRef.id);
    } catch (error) {
      console.error("Error saving user profile data to Firebase:", error);
    }
  };

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


  const handleSignUp = async (e) => {
    e.preventDefault();


    for (const key in profileData) {
      if (profileData[key] === '') {
        alert('Please fill in all fields.');
        return;
      }
    }

    if (profileData.age < 18) {
      alert('You must be 18 years or older to sign up.');
      return;
    }

    const existingUserData = JSON.parse(localStorage.getItem('userProfiles')) || [];
    const newUserProfile = { ...profileData };
    const newUserProfiles = [...existingUserData, newUserProfile];
    localStorage.setItem('userProfiles', JSON.stringify(newUserProfiles));

    setIsSigningUp(false);
    setIsLoggedIn(true);
    await saveDataToFirebase(newUserProfile);
  };

  

  return (
    <div>
      { isLoggedIn &&<NavBar/>}
    <div className="profile-container">
      {!isLoggedIn ? (
        isSigningUp ? (
            <form className="profile-form" onSubmit={handleSignUp}>
            <label className='inputbox'>Username
              <input
              placeholder="What's your Name?"
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>Age
              <input
              placeholder='Enter your Age'
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleInputChange}
                required // Ensure the field is required
              />
            </label>
            <label>
              Gender
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                required // Ensure the field is required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label className='inputbox'>
              Password
              <input
              placeholder='Enter a strong password'
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
                required // Ensure the field is required
              />
            </label>
            <label className='inputbox'>
              Bio
              <textarea
              placeholder='Tell us a little about yourself'
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                required // Ensure the field is required
              />
            </label>
            <button className="submit" type="submit">
              Sign Up
            </button>
          </form>
          
        ) : (
          <div className='login'>
            <label>
              <input
              placeholder='Username'
                type="text"
                name="username"
                value={loginCredentials.username}
                onChange={handleLoginInputChange}
              />
            </label>
            <label>
              <input
              placeholder='Enter Password'
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
        <div className="profile-details-container">
  <h3 className="profile-details-title">KARIBU!!!</h3>
  <p className="welcome-message animated">
              Welcome to FindingMapenzi {profileData.username}! We're thrilled to have you. Please take a moment to fill out
              your preferences in the LoveSurvey below.This is only to help us enhance your experience here!
            </p>  
            <li>
          <Link to="/LoveSurvey">LoveForm</Link>
           </li>
    <div className="profile-detail">
      <span className="detail-label">Age:</span>
      <span className="detail-value">{profileData.age}</span>
    </div>
    <div className="profile-detail">
      <span className="detail-label">Gender:</span>
      <span className="detail-value">{profileData.gender}</span>
    </div>
    <div className="profile-detail">
      <span className="detail-label">Bio:</span>
      <span className="detail-value">{profileData.bio}</span>
    </div>
  </div>
  <button className="logout" onClick={() => setIsLoggedIn(false)}>Logout</button>
</div>


        
      )}
    
    </div>

     </div>

  );
}
export default Profile;
