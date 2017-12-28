export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

const sortByDate = (list) => {
  return list.sort(
    (a, b) => a.timestamp < b.timestamp
  )
}

const sortByVotes = (list) => {
  return list.sort((a, b) => b.voteScore > a.voteScore)
}

export const sort = (list, sortby) => {
  if (sortby == "votes"){
    sortByVotes(list);
  }
  else if (sortby == "date"){
    sortByDate(list);
  }
  else {
    return list;
  }
}
