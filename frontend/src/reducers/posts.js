import {
  FETCH_POSTS,
  RECIEVE_POSTS
} from '../actions/posts.js'

const posts = (state={}, action) => {
  const { posts } = action;
  switch (action.type) {
    case RECIEVE_POSTS:
      return posts

    default:
      return state
  }
}

export default posts;
