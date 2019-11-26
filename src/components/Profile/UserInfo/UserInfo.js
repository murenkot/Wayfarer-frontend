import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserInfo.css';

const UserInfo = (props) => {

    return (
      <div className="user-details">
        <div className="avatar-container">
          <img id="avatar" src={props.profile.photo} alt="avatar"></img>
        </div>
        <h3>{props.profile.username}</h3>
        <p>email: {props.profile.email}</p>
        <p>Current city: {props.profile.currentCity}</p>
        <Button id="edit" name="edit-profile" onClick={props.editMode} variant="outline-secondary">Edit</Button>
      </div>
    )
  }

export default UserInfo;