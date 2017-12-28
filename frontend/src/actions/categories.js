import * as APIReadable from '../utils/ApiSetup.js';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'

export const fetchCategories = () => {
  return {
    type: FETCH_CATEGORIES
  }
}

export const receiveCategories = categories => {
  return {
    type: RECIEVE_CATEGORIES,
    categories
  }
}

export const requestCategories = () => {
  return dispatch => {
    dispatch(fetchCategories());
    return APIReadable.fetchCategories()
      .then(categoriesResult => dispatch(receiveCategories(categoriesResult)))

  }
}
