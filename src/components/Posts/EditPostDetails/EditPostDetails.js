import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

class EditPostDetails extends Component {

  state = {
    title: '',
    content: '',
    photo: '',
    city: "", // ID #
    cities: [],
  };

  handleCitySelect = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveChanges = (event) => {
    event.preventDefault();
    const postId = this.props.post._id;
    let body = {
      city: this.state.city,
      title: this.state.title,
      content: this.state.content,
      photo: this.state.photo,
    };
    console.log(postId);
    axios.put(`${process.env.REACT_APP_API_URL}/posts/${postId}`, body, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        this.props.handleEditPostFormOpen();
      })
      .catch((err)=>console.log(err));
  };

  componentDidMount() {
    this.setState({
      city: this.props.post.city._id,
      title: this.props.post.title,
      content: this.props.post.content,
      photo: this.props.post.photo,
    });
    axios.get(`${process.env.REACT_APP_API_URL}/cities`)
      .then((res) => {
        const cities = res.data.data.map(city => {
          return {
            value: city._id, 
            display: city.name
          };
        });
        this.setState({
          cities: [{
            value: '',
            display: 'Select a city'
          }]
          .concat(cities)
        });
      })
      .catch((error) => console.log(error));
  };

  render () {
    return (
      <Modal show={this.props.postFormOpen} onHide={this.props.handleEditPostFormOpen}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.saveChanges} >
            <div className="form-group">
              <label htmlFor="city">City</label>
              <select className="form-control form-control-lg" name="city" onChange={this.handleCitySelect} value={this.state.city}>
                {this.state.cities.map((city) => <option key={city.value} value={city.value}>{city.display}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo URL</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="photo" name="photo" value={this.state.photo} />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="title" name="title" value={this.state.title} />
            </div>
            <div className="form-group">
              <label htmlFor="content">How was your trip?</label>
              <textarea onChange={this.handleChange} className="form-control form-control-lg" type="text" id="content" name="content" value={this.state.content} />
            </div>
            <button className="btn btn-primary float-right" type="submit">Post</button>
          </form>
        </Modal.Body>
      </Modal>
    );
  };
};

export default EditPostDetails;