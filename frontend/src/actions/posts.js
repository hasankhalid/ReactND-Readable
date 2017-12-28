import * as APIReadable from '../utils/ApiSetup.js';
import {sort} from '../utils/helpers.js'

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID';
export const RECIEVE_POSTS = 'RECIEVE_POSTS'


export const fetchPosts = () => {
  return {
    type: FETCH_POSTS
  }
}

export const fetchPostbyID = () => {
  return {
    type: FETCH_POST_BY_ID
  }
}

export const receivePosts = (posts) => {
  return {
    type: RECIEVE_POSTS,
    posts
  }
}

export const getPosts = (category) => {
  return dispatch => {
    dispatch(fetchPosts());
    return APIReadable.fetchPosts(category)
      .then(posts => dispatch(receivePosts(posts)))
  }
}

export const getPostbyID = (postID) => {
  return dispatch => {
    dispatch(fetchPostbyID());
    return APIReadable.fetchPostbyID(postID)
      .then(post => dispatch(receivePosts(post)))
  }
}

export const deletePost = (post) => {
  return dispatch => {
    return APIReadable.deletePost(post)
      .then(post => APIReadable.fetchPosts())
      .then(post => dispatch(receivePosts(post)))
  }
}

export const editPost = (post) => {
  return dispatch => {
    return APIReadable.editPost(post)
  }
}

export const addPost = (post) => {
  return dispatch => {
    return APIReadable.addPost(post)
  }
}

export const votePost = (id, option) => {
  return dispatch => {
    return APIReadable.votePost(id, option)
      .then(result => APIReadable.fetchPosts())
      .then(posts => receivePosts(posts))
  }
}

export const sortPost = (category, option) => {
  return dispatch => {
    dispatch(fetchPosts());
    return APIReadable.fetchPosts(category)
      .then(posts => dispatch(receivePosts(posts)))
      .then(result => sort(result.posts,option))
  }
}
