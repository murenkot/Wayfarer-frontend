import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import './Navbar.css';

import './Navbar.css';

import logo from './logo.png';

class Navbar extends React.Component {
  state = {
    loginModalOpen: false,
    signupModalOpen: false,
  };

  // Source for modal handling: https://stackoverflow.com/questions/56960664/how-to-make-popup-modal-appear-when-clicking-a-link
  handleLoginModalOpen = () => {
    this.setState((prevState) => {
      return {
        loginModalOpen: !prevState.loginModalOpen
      }
    });
  };

  handleSignupModalOpen = () => {
    this.setState((prevState) => {
      return {
        signupModalOpen: !prevState.signupModalOpen
      }
    });
  };

  handleProfileRedirect = () => {
    const userId = localStorage.getItem('uid');
    this.props.history.push(`/users/${userId}`);
  };

  handleCitiesRedirect = () => {
    this.props.history.push(`/cities`);
  };

  render () {
    return (
      <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <span>Wayfarer</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto">
          {!this.props.currentUser ?
          <>
            <li className="nav-item">
              <button type="button" className="btn btn-outline-light nav-link" onClick={this.handleLoginModalOpen}>Log in<span className="sr-only">(current)</span></button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-outline-light nav-link nav-link" onClick={this.handleSignupModalOpen}>Sign up</button>
            </li>
            </> : <>
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleCitiesRedirect}>Cities</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.handleProfileRedirect}>Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.props.logout}>Logout</a>
            </li>
            </>
          }
          </ul>
          <form className="form-inline my-2 my-md-0">
            <input className="form-control" type="text" placeholder="Search" />
          </form>
        </div>
      </nav>
      <Login loginModalOpen={this.state.loginModalOpen} handleLoginModalOpen={this.handleLoginModalOpen} setCurrentUser={this.props.setCurrentUser} />
      <Signup signupModalOpen={this.state.signupModalOpen} handleSignupModalOpen={this.handleSignupModalOpen} setCurrentUser={this.props.setCurrentUser} />
      </>
    );
  };
};

export default withRouter(Navbar);