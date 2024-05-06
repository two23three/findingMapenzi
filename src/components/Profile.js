import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  // State that has user profile info
  const [profileData, setProfileData] = useState({
    username: '',
    age: '',
    gender: '',
    bio: '',
  });

  // State to track whether the form has been submitted
  const [submitted, setSubmitted] = useState(false);

  // Fetch user profile data from backend upon component mount
  useEffect(() => {
    // Fetch user profile data here and update state
    // Example: fetchProfileData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle gender selection changes
  const handleGenderChange = (e) => {
    setProfileData({
      ...profileData,
      gender: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the age is below 18
    if (profileData.age < 18) {
      alert('You must be 18 years or older to sign up.');
      return; // Exit the function without setting submitted state
    }
    // Age is valid, proceed with submission
    setSubmitted(true);
    // Here you can submit the profileData to the backend
    // Example: submitProfileData(profileData);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {!submitted ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Name:
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
              onChange={handleGenderChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
        ></path>
      </svg>
    </div>
  </div>
  <span>Submit</span>
</button>
        </form>
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
