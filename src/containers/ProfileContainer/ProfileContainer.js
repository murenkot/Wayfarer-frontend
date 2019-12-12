import React, {Component} from 'react';
import axios from 'axios';

import UserInfo from '../../components/Profile/UserInfo/UserInfo'
import EditUserInfo from '../../components/Profile/EditUserInfo/EditUserInfo'
import PostsContainer from '../PostsContainer/PostsContainer';
import firebase from '../../firebase';

import './ProfileContainer.css'

class ProfileContainer extends Component {
  state = {
    profile: {},
    selectedFile: null,
    storageref: firebase.storage().ref(),
    edit: false, 
  };

  componentDidMount() {
    const userId = localStorage.getItem('uid');
    axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      withCredentials: true,
    })
      .then(res => {
        this.setState({
          profile: res.data.data,
        });
      })
      .catch(err => console.log(err));
  };

  fileSelectedHandler = (photo) => {
    this.setState({
      selectedFile: photo[0]
    }, function() {
      this.state.storageref.child(`/images/user-${localStorage.getItem('uid')}`).put(this.state.selectedFile, {contentType: 'image/jpeg'}).then(snap => {
        snap.ref.getDownloadURL().then(url => {
          this.setState({profile: {
            photo: url,
          }});
        });
      });
    });
  };

  editMode = () => {
    this.setState({edit: true})
  };

  updateState = (updatedProfile) => {
    this.setState({profile: updatedProfile});
    this.setState({edit: false});
  };

  render() {
    return (
      <div>
        <h1>Welcome, {this.state.profile.username}</h1>
        <div className="row">
          <div className="col-md-4">
            {this.state.edit 
              ?  
                <EditUserInfo 
                  profile={this.state.profile} 
                  fileSelectedHandler={this.fileSelectedHandler} 
                  updateState={this.updateState} 
                /> 
              : 
                <UserInfo 
                  profile={this.state.profile} 
                  fileSelectedHandler={this.fileSelectedHandler} 
                  saveChanges={this.saveChanges} 
                  editMode={this.editMode}
                />}
          </div>
          <div className="col-md-8">
            <PostsContainer currentUser={this.props.currentUser}/>
          </div>
        </div>
      </div>
    );
  };
};

export default ProfileContainer;