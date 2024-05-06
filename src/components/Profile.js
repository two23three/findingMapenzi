import React, { useState, useEffect } from 'react';

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
    setSubmitted(true);
    // Here you can submit the profileData to the backend
    // Example: submitProfileData(profileData);
  };

  return (
    <div>
      <h2>Profile</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
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
              <option value="male">Male</option>
              <option value="female">Female</option>
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
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
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
