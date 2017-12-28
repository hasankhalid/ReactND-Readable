import {
  FETCH_COMMENTS,
  RECIEVE_COMMENTS
} from '../actions/comments.js'

const comments = (state={}, action) => {
  const { comments } = action;
  switch (action.type) {
    case RECIEVE_COMMENTS:
      return comments
    default:
      return state
  }
}

export default comments; 
