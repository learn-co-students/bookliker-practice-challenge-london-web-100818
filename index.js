// ***RENDER***
const sidePanelList = document.querySelector('#list')
const showPanelDiv = document.querySelector('#show-panel')

state = {
  "books": [],
  "users": [],
  "currentUser": {
    "id": 1,
    "username": "pouros"
  }
}

const storeUser = user => {
  state.users.push(user)
}

const storeUsers = users => {
  users.forEach(storeUser)
}

const storeBook = book => {
  state.books.push(book)
}

const storeBooks = books => {
  books.forEach(storeBook)
}

const renderSidePanelList = book => {
  const bookListEl = document.createElement('li')
  bookListEl.innerText = book.title
  sidePanelList.appendChild(bookListEl)

  bookListEl.addEventListener('click', () => renderBookCard(book))
}

const renderBookCard = book => {
  const bookCardDiv = document.createElement('div')
  bookCardDiv.innerHTML = `
    <h2>${book.title}</h2>
    <img src=${book.img_url} alt="Cover of ${book.title}" />
    <p>${book.description}</p>
    <button id="like-book-btn">Like <3</button>
    <h3>Users Who Like This Book:</h3>
    <ul id="users-like-list">
    </ul>
  `
  showPanelDiv.innerHTML = ''
  showPanelDiv.appendChild(bookCardDiv)

  const usersLikeList = bookCardDiv.querySelector('#users-like-list')
  book.users.forEach(user => {
    const userListEl = document.createElement('li')
    userListEl.innerText = user.username
    usersLikeList.appendChild(userListEl)
  })

  clickAndLikeBook(bookCardDiv, book)
}

const clickAndLikeBook = (el, book) => {
  const likeBtn = el.querySelector('#like-book-btn')
  likeBtn.addEventListener('click', () => updateUserLikeList(el, book))
}

const updateUserLikeList = (el, bookToUpdate) => {
  let updateUsers = {}
  let userInArray = false
  bookToUpdate.users.forEach(user => {
    if(user.id === state.currentUser.id){
      userInArray = true
    }
  });

  if (userInArray)  {
    let updatedUserList = bookToUpdate.users.filter(user => user.id !== state.currentUser.id)
    updateUsers = {
      "users": updatedUserList
    }
  } else {
    updateUsers = {
      "users": [...bookToUpdate.users, state.currentUser]
    }
  }

  updateBook(bookToUpdate, updateUsers)
    .then(updatedBook => {
      // UPDATE STATE NEEDED
      const usersLikeList = el.querySelector('#users-like-list')
      usersLikeList.innerHTML = ''
      updatedBook.users.forEach(user => {
        const userListEl = document.createElement('li')
        userListEl.innerText = user.username
        usersLikeList.appendChild(userListEl)
      })
    })
  }

const updateSidePanelList = () => {
  sidePanelList.innerHTML = ''
  state.books.forEach(renderSidePanelList)
}

getUsers()
  .then(storeUsers)

getBooks()
  .then(books => {
    storeBooks(books)
    updateSidePanelList()
  })
