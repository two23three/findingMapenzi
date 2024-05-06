import React from 'react';
import ReactDOM from 'react-dom';

function Profile(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.bio}</p>
        </div>
    )




}

export default Profile;