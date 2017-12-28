import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Form, FormGroup, Col, Button, MenuItem, DropdownButton, FormControl, ControlLabel, Checkbox} from 'react-bootstrap'
import {requestCategories} from '../actions/categories.js'
import { capitalize } from '../utils/helpers.js'
import {getPosts} from '../actions/posts.js'
import {addComment, editComment} from '../actions/comments.js'
import { v4 } from 'uuid';
import * as APIReadable from '../utils/ApiSetup.js'
import { Redirect } from 'react-router-dom';
import '../index.css';


class NewCommentForm extends Component {
  state = {
    author: '',
    body: '',
    category: '',
    parentId: '',
    parentCategory: '',
    redirect: false
  }

  componentDidMount(){
    if (this.props.location.state.action === "edit") {
      this.setState({
        author: this.props.location.state.comment.author,
        body: this.props.location.state.comment.body,
        parentId: this.props.location.state.comment.parentId,
        parentCategory: this.props.location.state.postcateg,
        redirect: false
      });
    }
    else {
      this.setState({
        author: '',
        body: '',
        parentId: this.props.location.state.postID,
        parentCategory: this.props.location.state.postcateg,
        finished: '',
        redirect: false
      });
    }
  }

  submitForm (e) {
    e.preventDefault;
    if (this.props.location.state.action === "edit"){
      const updatedComment = {
        ...this.props.location.state.comment,
        author: this.state.author,
        body: this.state.body
      }
      this.props.editComment(updatedComment);
      this.setState({ redirect: true });
    }
    else {
      const newComment = {
        id: v4(),
        author: this.state.author,
        body: this.state.body,
        parentId: this.props.location.state.postID,
      }
      console.log(this.state)
      this.setState({ redirect: true });
      this.props.addComment(newComment);
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    if (this.state.redirect) {
      console.log("Success")
      return <Redirect to={`/${this.state.parentCategory}/${this.state.parentId}`}/>;
    }

    return(
      <Form horizontal onSubmit={event => this.submitForm(event)}>
        <FormGroup controlId="formHorizontalComment">
          <Col componentClass={ControlLabel} sm={2}>
            Your Comments
          </Col>
          <Col xs={9}>
            <FormControl value={this.state.body} className = "commentInput" type="text" placeholder="Comment" onChange={this.handleChange('body')} />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalAuthor">
          <Col componentClass={ControlLabel} sm={2}>
            Author
          </Col>
          <Col xs={9}>
            <FormControl value={this.state.author} type="text" placeholder="Author" onChange={this.handleChange('author')} />
          </Col>
        </FormGroup>
        <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="submit">
              Post
            </Button>
          </Col>
      </Form>
    );
  }
}

const mapStateToProps = ({posts}) => ({
  posts
})

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  addComment: (comment) => dispatch(addComment(comment)),
  editComment: (comment) => dispatch(editComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentForm);
