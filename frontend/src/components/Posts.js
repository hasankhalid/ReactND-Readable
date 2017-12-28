import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPosts, deletePost, editPost, votePost, sortPost} from '../actions/posts.js'
import {ListGroup, ListGroupItem, Grid, Row, Col} from 'react-bootstrap';
import Moment from 'react-moment';
import {withRouter} from 'react-router-dom'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaEdit from 'react-icons/lib/fa/edit'
import * as APIReadable from '../utils/ApiSetup.js'
import {Link, Route} from 'react-router-dom'
import NewPostForm from './NewPostForm.js'
import IoAndroidDelete from 'react-icons/lib/io/android-delete'
import {Button, ButtonToolbar} from 'react-bootstrap'
import {sort} from '../utils/helpers.js'

class Posts extends Component {
  state = {
    sortby: '',
    posts: this.props.posts
  }

  //My Sort function works but somehow refreshes to the original layout. the Props get updated and it renders once but is rerendered. What could be an issue.

  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.getPosts(category).then(posts => this.setStatetoPosts(posts.posts))
  }

  updateVote = (id, vote, votescore) => {
    this.props.votePost(id, vote);
  }

  handleDelete = (post) => {
    this.props.deletePost(post.id)
  }

  handleSort = (option) => {
    const category = this.props.match.params.category;
    this.props.getPosts(category).then(posts => this.setStatetoPosts(sort(posts.posts,option)))
    this.setState({
      sortby: option
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const category = nextProps.match.params.category;
      this.props.getPosts(category).then(posts => this.setStatetoPosts(posts.posts))
    }
    if (nextProps.posts !== this.props.posts) {
      const category = this.props.match.params.category;
      this.props.getPosts(category).then(posts => this.setStatetoPosts(sort(posts.posts,this.state.sortby)));
    }
  }

  setStatetoPosts(postsArray) {
    this.setState({
      posts: postsArray
    })
  }

  render () {
    const { posts } = this.props
    return (
      <div className="container">
        <ListGroup>
          {posts.length > 0 && posts.map((post, key) => (
            <div key={key} className="post">
              <li
                className="list-group-item"
                onClick = {() => {}}
              >
              <Grid>
              <Row className="show-grid">
                <Col xs={4} md={2}>
                  <FaAngleUp size={30} onClick={() => this.updateVote(post.id, "upVote", post.voteScore)}/>
                  <h2>{post.voteScore}</h2>
                  <FaAngleDown size={30} onClick={() => this.updateVote(post.id, "downVote", post.voteScore)}/>
                </Col>
                <Col xs={8} md={10}>
                  <Link to={`/${post.category}/${post.id}`}>
                    <h3>{post.title}</h3>
                  </Link>
                  <h4>{post.author}</h4>
                  <p>
                    Category: {post.category} |
                    TimeStamp:  <Moment format="YYYY/MM/DD">
                                  {post.timestamp}
                                </Moment>
                  </p>
                  <p>{post.body}</p>
                  <p><em>Comments: {post.commentCount}</em></p>
                  <IoAndroidDelete onClick = {() => this.handleDelete(post)}size ={20}></IoAndroidDelete>
                  <Link to={{ pathname: '/edit', state: { post: post} }}>
                    <FaEdit size={20}></FaEdit>
                  </Link>
                </Col>
              </Row>
              </Grid>
              </li>
            </div>
          ))}
        </ListGroup>
        <Grid>
          <Row className="show-grid">
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={() => this.handleSort("votes")}>Votes</Button>
              <Button bsStyle="primary" onClick={() => this.handleSort("date")}>Date</Button>
              <Button bsStyle="primary" onClick={() => this.handleSort("none")}>Reset</Button>
            </ButtonToolbar>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({posts}) => ({
  posts,
})

const mapDispatchToProps = dispatch => ({
  getPosts: category => dispatch(getPosts(category)),
  deletePost: id => dispatch(deletePost(id)),
  votePost: (id,option) => dispatch(votePost(id,option)),
  sortPost: (category, option) => dispatch(sortPost(category,option))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
