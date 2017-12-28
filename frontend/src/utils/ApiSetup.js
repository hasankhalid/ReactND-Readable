const url = 'http://localhost:3001';

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

//Following methods are Category based

export const fetchCategories = () =>
  fetch(`${url}/categories`, {headers})
  .then(result => result.json())
  .then(result => result.categories)


//Following methods are about posts

export const fetchPosts = category => {
  const link = category ? `${url}/${category}/posts` : `${url}/posts`
  return fetch(link, {headers})
  .then(result => result.json())
  .then(result => result)
}

export const fetchPostbyID = (id) =>
 fetch(`${url}/posts/${id}`, {headers})
  .then(result => result.json())
  .then(result => result)

export const addPost = (post) => {
  const postData = {
    ...post,
    timestamp: Date.now()
  }
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData)
  }).then(result => result.json())
  .then(result => console.log(result))
}

export const deletePost = (id) =>
  fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
});

export const editPost = (post) => {
  const postData = {
    ...post,
    timestamp: Date.now()
  }

  fetch(`${url}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers
    },
    body: JSON.stringify(postData)
  }).then(result => result.json())
  .then(result => result)
}

export const votePost = (id, vote) =>
  fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      option: vote
    })
  }).then(result => result.json())
  .then(result => result)


//Following methods are about Comments

export const fetchCommentbyID = (id) =>
  fetch(`${url}/comments/${id}`, {headers})
  .then(result => result.json())
  .then(result => result)

export const fetchCommentsbyPostID = (id) =>
  fetch(`${url}/posts/${id}/comments`, {headers})
  .then(result => result.json())
  .then(result => result)

export const editComment = (comment) => {
  const commentData = {
    ...comment,
    timestamp: Date.now()
  }

  fetch(`${url}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers
    },
    body: JSON.stringify(commentData)
  }).then(result => result.json())
  .then(result => result)
}

export const deleteComment = (id) =>
  fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  }).then(results => results.json())
  .then(result => result)

export const voteComment = (id, vote) =>
  fetch(`${url}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify({
      option: vote
    })
  }).then(result => result.json())
  .then(result => result)

export const addComment = (comment) => {
  const commentData = {
    ...comment,
    timestamp: Date.now()
  }
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify(commentData)
  }).then(result => result.json())
  .then(result => result)
}
