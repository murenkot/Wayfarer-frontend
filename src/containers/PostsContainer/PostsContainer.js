import React, {Component} from 'react';
import axios from 'axios';

import Posts from '../../components/Posts/Posts';

class PostsContainer extends Component {
  state = {
    posts: [],
  };

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/all`, {
      withCredentials: true,
    })
    .then(res => {
      let filteredPosts = res.data.data.filter((post) => post.author._id === this.props.currentUser);
      this.setState({
        posts: filteredPosts.sort((a, b) => (a.postDate < b.postDate) ? 1 : -1)
      })
    })
    .catch(err => console.log(err));
  };

  render () {
    return (
      <div className="posts-container">
        <Posts posts={this.state.posts}/>
      </div>
    );
  };
};

export default PostsContainer;