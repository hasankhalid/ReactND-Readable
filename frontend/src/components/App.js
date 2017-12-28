import React, { Component } from 'react';
import Header from './header.js'
import Posts from './Posts.js'
import NewPostForm from './NewPostForm.js'
import NewCommentForm from './NewCommentForm'
import {Switch, Route, withRouter, Router} from 'react-router-dom'
import PostDetail from './PostDetail.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact path ="/" component={Posts}/>
          <Route exact path ="/:category" component={Posts}/>
          <Route path="/:category/:postId" component={PostDetail}/>
        </Switch>
        <Route exact path ="/new" component={NewPostForm}/>
        <Route exact path ="/edit" component={NewPostForm}/>
        <Route exact path ="/newComment" component={NewCommentForm}/>
        <Route exact path ="/editComment" component={NewCommentForm}/>
      </div>
    );
  }
}

export default App;
