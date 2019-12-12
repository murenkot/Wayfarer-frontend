import React, {Component} from 'react';
import axios from 'axios';
import Comments from '../../components/Comments/Comments';
import './CommentsContainer.css';

class CommentsContainer extends Component {
  state = {
    comments: [],
    content: "",
    post: this.props.postId,
  };

  fetchAllComments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/comments`, {
      withCredentials: true,
    })
    .then((res) => {
      const comments = res.data.data;
      const filteredComments = comments.filter((comment) => comment.post._id === this.props.postId);
      this.setState({
        comments: filteredComments.sort((a, b) => (a.commentDate < b.commentDate) ? 1 : -1),
        content: "",
      })
    })
    .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchAllComments();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCommentSubmit = () => {
    // instead of another axios post you can also just setstate to push new comment into state
    axios.post(`${process.env.REACT_APP_API_URL}/comments`, this.state,  {
      withCredentials: true,
    })
    .then((res) => {
      this.fetchAllComments();
    });
  }

  render() {
    // Comments panel snippet source: https://www.bootdey.com/snippets/view/Simple-Comment-panel#preview
    return (
      <div className="row bootstrap snippets">
        <div className="col-md col-md-offset-2 col-sm-12">
          <div className="comment-wrapper">
            <div className="panel panel-info">
              <div className="panel-heading">
                Comments
              </div>
              <div className="panel-body">
                <textarea value={this.state.content} onChange={this.handleChange} name="content" className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                <br />
                <button type="button" className="btn btn-info pull-right" onClick={this.handleCommentSubmit}>Post</button>
                <div className="clearfix"></div>
                <hr />
                {this.state.comments.length ?
                <>
                <Comments comments={this.state.comments} />
                </> : <>
                No comments yet
                </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default CommentsContainer;