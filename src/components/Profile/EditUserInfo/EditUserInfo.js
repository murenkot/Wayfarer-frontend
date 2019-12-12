import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../../../firebase';
import Button from 'react-bootstrap/Button';

import './EditUserInfo.css';

class EditUserInfo extends Component {

    state = {
        username: '',
        email: '',
        photo: '',
        currentCity: '',
        storageref: firebase.storage().ref(),
    }

    componentDidMount() {
        this.setState({ 
            username: this.props.profile.username,
            email: this.props.profile.email,
            photo: this.props.profile.photo,
            currentCity: this.props.profile.currentCity,
        })
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    saveChanges = (event) => {
        const userId = localStorage.getItem('uid');
        event.preventDefault();
        let body = {
            username: this.state.username,
            email: this.state.email,
            photo: this.state.photo,
            currentCity: this.state.currentCity,
        }
        axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, body, {
            withCredentials: true,
        })
            .then((res)=>{
                this.props.updateState(body);
            })
            .catch((err)=>console.log(err));
    };

    fileSelectedHandler = (photo) => {
        this.setState({
            selectedFile: photo[0]
        }, function() {
            this.state.storageref.child(`/images/user-${localStorage.getItem('uid')}`).put(this.state.selectedFile, {contentType: 'image/jpeg'}).then(snap => {
                snap.ref.getDownloadURL().then(url => {
                    this.setState( {
                    photo: url,
                    });
                })
            })
        })
    }

    render () {

        return (
        <div className="user-details">
            {/* <h1>User details</h1> */}
            <form onSubmit={this.props.saveChanges}>
                <div className="avatar-container">

                <img id="avatar" src={this.props.profile.photo} alt="avatar"></img>

                </div>
                <input id="add-file" type="file" onChange={ (e) => this.fileSelectedHandler(e.target.files) } />
                <div className="form-group prof-info">
                    <label htmlFor="username">Username</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" name="username" value={this.state.username} />
                </div>
                <div className="form-group prof-info">
                    <label htmlFor="email">Email</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="email" name="email" value={this.state.email} />
                </div>
                <div className="form-group prof-info">
                    <label htmlFor="currentCity">Current City</label>
                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" name="currentCity" value={this.state.currentCity} />
                </div>
                
                {/* <button name="save-profile" onClick={this.saveChanges}>Save</button> */}
                <Button id="save" name="save-profile" onClick={this.saveChanges} variant="outline-secondary">Save</Button>

            </form>

        </div>
        )
    }
}

export default EditUserInfo;