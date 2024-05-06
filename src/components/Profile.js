import React, { useState, useEffect } from 'react';

function Profile() {
  //State that has user profile info
  const [profileData, setProfileData] = useState({
    username: '',
    age: '',
    gender: '',
    bio: '',
  });

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated profile data to backend for storage
    // Example: updateProfileData(profileData);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
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
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
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
    </div>
  );
}

export default Profile;
