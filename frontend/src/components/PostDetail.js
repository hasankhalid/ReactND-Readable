import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPostbyID, deletePost, votePost} from '../actions/posts.js'
import {getComments, deleteComment, voteComment} from '../actions/comments.js'
import {ListGroup, ListGroupItem, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import Moment from 'react-moment';
import NewCommentForm from './NewCommentForm.js'
import IoAndroidDelete from 'react-icons/lib/io/android-delete'
import FaEdit from 'react-icons/lib/fa/edit'
import { Redirect } from 'react-router-dom';

class PostDetail extends Component {
  state = {
    redirect: false,
    deleted: false
  }

  componentDidMount() {
    const id = this.props.match.params.postId;
    this.props.getPostbyID(id);
    this.props.getComments(id);
  }

  handleDeleteComment = (comment) => {
    this.props.deleteComment(comment)
  }

  handleDelete = (post) => {
    this.props.deletePost(post.id)
    this.setState({ redirect: true });
  }


  updateVote = (id, vote) => {
    this.props.votePost(id, vote);
  }

  updateVoteComment = (id, vote) => {
    this.props.voteComment(id, vote);
  }

  componentWillReceiveProps(nextProps){
  if (nextProps.posts !== this.props.posts) {
      const id = this.props.match.params.postId;
      this.props.getPostbyID(id);
      this.props.getComments(id);
    }
  if (nextProps.posts.deleted == true){
      this.handleDeletion();
    }
  }

  handleDeletion(){
    this.setState({
      deleted: true
    })
  }

  render (){
    const {posts} = this.props
    const {comments} = this.props
    if (this.state.redirect) {
      return <Redirect to={'/'}/>;
    }

    if (this.state.deleted) {
      return <h2>"404, Element Not Found"</h2>
    }

    return (
      <div className="container">
        <div>
          <ListGroup>
          <div className="post">
            <li className="list-group-item">
            <Grid>
              <Row className="show-grid">
                <Col xs={4} md={2}>
                  <FaAngleUp size={30} onClick={() => this.updateVote(posts.id, "upVote")}/>
                  <h2>{posts.voteScore}</h2>
                  <FaAngleDown size={30} onClick={() => this.updateVote(posts.id, "downVote")}/>
                </Col>
                <Col xs={8} md={10}>
                  <h3>{posts.title}</h3>
                    <p>
                      Category: {posts.category} |
                      <Moment format="YYYY/MM/DD">{posts.timestamp}</Moment>
                    </p>
                    <p>Author: {posts.author}</p>
                    <p>Post: {posts.body}</p>
                    <IoAndroidDelete onClick = {() => this.handleDelete(posts)} size={20}></IoAndroidDelete>
                    <Link to={{ pathname: '/edit', state: { post: posts} }}>
                      <FaEdit size={20}></FaEdit>
                    </Link>
                </Col>
              </Row>
            </Grid>
            </li>
          </div>
        </ListGroup>

        <ListGroup>
          <div className="post">
            <li
              className="list-group-item"
            >
            <Grid>
              <Col xs={12} md={10}>
                <Link to={{ pathname: '/newComment', state: { postID: posts.id, postcateg: posts.category, action: "new"} }}>
                  <Button>"Add Comment"</Button>
                </Link>
              </Col>
            </Grid>
          </li>
          </div>
        </ListGroup>
        <h2>{comments.length + " " + "Comments"}</h2>
        {comments.length > 0 && comments.map((comment, key) => (
          <ListGroup key={key}>
            <div className="post">
              <li className="list-group-item">
              <Grid>
                <Row className="show-grid">
                  <Col xs={4} md={2}>
                    <FaAngleUp size={30} onClick={() => this.updateVoteComment(comment.id, "upVote")}/>
                    <h2>{comment.voteScore}</h2>
                    <FaAngleDown size={30} onClick={() => this.updateVoteComment(comment.id, "downVote")}/>
                  </Col>
                  <Col xs={8} md={10}>
                    <p>Posted by {comment.author} on <Moment format="YYYY/MM/DD">{comment.timestamp}</Moment>
                    </p>
                    <p>Comment: {comment.body}</p>
                    <IoAndroidDelete onClick={() => this.handleDeleteComment(comment)} size={20}></IoAndroidDelete>
                    <Link to={{ pathname: '/editComment', state: { comment: comment, postcateg: posts.category, action: "edit"} }}>
                      <FaEdit size={20}></FaEdit>
                    </Link>
                  </Col>
                </Row>
              </Grid>
              </li>
            </div>
          </ListGroup>
        ))}
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({comments, posts}) => ({
  comments,
  posts
})

const mapDispatchToProps = dispatch => ({
  getPostbyID: (id) => dispatch(getPostbyID(id)),
  getComments: (id) => dispatch(getComments(id)),
  deleteComment: (id) => dispatch(deleteComment(id)),
  deletePost: id => dispatch(deletePost(id)),
  votePost: (id,option) => dispatch(votePost(id,option)),
  voteComment: (id,option) => dispatch(voteComment(id,option))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
