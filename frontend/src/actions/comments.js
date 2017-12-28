import * as APIReadable from '../utils/ApiSetup.js';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'

export const fetchComments = () => {
  return {
    type: FETCH_COMMENTS
  }
}

export const receiveComments = (comments) => {
  return {
    type: RECIEVE_COMMENTS,
    comments
  }
}

export const getComments = (postID) => {
  return dispatch => {
    dispatch(fetchComments());
    return APIReadable.fetchCommentsbyPostID(postID)
      .then(comments => dispatch(receiveComments(comments)))
  }
}

export const deleteComment = (comment) => {
  return dispatch => {
    return APIReadable.deleteComment(comment.id)
      .then(post => APIReadable.fetchCommentsbyPostID(comment.parentId))
      .then(comments => dispatch(receiveComments(comments)))
  }
}

export const addComment = (comment) => {
  return dispatch => {
    return APIReadable.addComment(comment)
  }
}

export const editComment = (comment) => {
  return dispatch => {
    return APIReadable.editComment(comment)
  }
}

export const voteComment = (id, option) => {
  return dispatch => {
    return APIReadable.voteComment(id,option)
      .then(result => APIReadable.fetchCommentsbyPostID(result))
      .then(comments => dispatch(receiveComments(comments)))
  }
}
