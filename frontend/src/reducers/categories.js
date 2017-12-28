import {
  FETCH_CATEGORIES,
  RECIEVE_CATEGORIES
} from '../actions/categories.js'

const categories = (state={}, action) => {
  const { categories } = action;
  switch (action.type) {
    case RECIEVE_CATEGORIES:
      return categories

    default:
      return state;
  }
}

export default categories;
