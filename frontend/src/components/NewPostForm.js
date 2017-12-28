import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Form, FormGroup, Col, Button, MenuItem, DropdownButton, FormControl, ControlLabel, Checkbox} from 'react-bootstrap'
import {requestCategories} from '../actions/categories.js'
import { capitalize } from '../utils/helpers.js'
import {getPostbyID} from '../actions/posts.js'
import { v4 } from 'uuid';
import * as APIReadable from '../utils/ApiSetup.js'
import { Redirect } from 'react-router-dom';
import {editPost,addPost} from '../actions/posts.js'

class NewPostForm extends Component {


  state = {
    author: '',
    title: '',
    body: '',
    category: '',
    redirect: false
  }

  componentDidMount() {
    this.props.requestCategories();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location.state) {
      this.setState({
        author: this.props.location.state.post.author,
        title: this.props.location.state.post.title,
        body: this.props.location.state.post.body,
        category: this.props.location.state.post.category,
        finished: false
      });
    }
    else {
      this.setState({
        author: '',
        title: '',
        body: '',
        category: 'react',
        finished: '',
      });
    }
  }

  submitForm (e) {
    e.preventDefault;
    if (this.props.location.state){
      const updatedPost = {
        ...this.props.location.state.post,
        timestamp: Date.now(),
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category
      };
      this.props.editPost(updatedPost);
      this.setState({ redirect: true });
    }
    else {
      const newPost = {
        id: v4(),
        author: this.state.author,
        body: this.state.body,
        title: this.state.title,
        category: this.state.category
      };
      this.props.addPost(newPost);
      this.setState({ redirect: true });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSelect = event => {
  }

  render() {
    const { categories } = this.props
    console.log(this.state)

    if (this.state.redirect) {
      return <Redirect to={'/'}/>;
    }
    return(
      <Form horizontal onSubmit={event => this.submitForm(event)}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col xs={9}>
            <FormControl value={this.state.title} type="text" placeholder="Title" onChange={this.handleChange('title')}  />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalBody">
          <Col componentClass={ControlLabel} sm={2}>
            Body
          </Col>
          <Col xs={9}>
            <FormControl value={this.state.body} componentClass="textarea" type="text" placeholder="Body" onChange={this.handleChange('body')} />
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
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <select id="lang" onChange={this.handleChange('category')} value={this.state.category}>
              {categories.length > 0 && categories.map((category, key) => (
                <option key={key} value={category.name}>{category.name}</option>
              ))}
            </select>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.redirect} bsStyle="primary" type="submit">
              Post
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = ({categories}) => ({
  categories
})

const mapDispatchToProps = dispatch => ({
  requestCategories: () => dispatch(requestCategories()),
  editPost: post => dispatch(editPost(post)),
  addPost: post => dispatch(addPost(post))
})



export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
