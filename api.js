url = 'http://localhost:3000'

const getBooks = () =>
  fetch(url + '/books')
    .then(resp => resp.json())

const getUsers = () =>
  fetch(url + '/users')
    .then(resp => resp.json())

const updateBook = (bookToUpdate, attrToUpdate) =>
  fetch(url + '/books/' + bookToUpdate.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(attrToUpdate)
  })
    .then(resp => resp.json())

