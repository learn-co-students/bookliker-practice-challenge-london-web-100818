const books_list=document.querySelector('#list')
const book_detail=document.querySelector('#show-panel')
url='http://localhost:3000/books'

document.addEventListener("DOMContentLoaded", function() {
  getBooks()
});

function getBooks(){
  fetch(url)
  .then(res=>res.json())
  .then(json=>addBooks(json))
}

function addBook(book){
   let li=document.createElement('li')
  li.innerHTML=`<h3>${book.title}</h3>`
  books_list.appendChild(li)
  li.addEventListener('click',()=>showDetails(book))
}

function addBooks(books){
  for(book of books){
    addBook(book)
  }
}

function showDetails(book){
deleteBooks()
let span=document.createElement("span")
span.innerHTML=`<img src=${book.img_url}><br> <p>${book.description}</p><br><h4>This books is liked by: </h4> <br> ${users(book)}`
span.className="book-details"
book_detail.appendChild(span)
let button=document.createElement('button')
let button2=document.createElement('button')

span.appendChild(button)
span.appendChild(button2)
button.innerText="Like"
button2.innerText="Unike"

button.addEventListener("click",()=>{like(book)})
button2.addEventListener("click",()=>{unlike(book)})

}

function deleteBooks(){
  let spans=document.querySelectorAll('.book-details')
  for(element of spans){
    element.remove()

  }

}

const users = (book) =>{
  userString=""
  for(element of book.users){
     userString+=`${element.username} <br><br>`

  }
  return userString
}

const match = function(element) {

  return element.id === 1;
};

function like(book) {
  let userMe= {
    "id": 1,
    "username": "pouros"
  }
  if(book.users.some(match)){
    alert("You already liked this book")
  }else{
    book.users.push(userMe)
  }
  updateLike(book)

}

function unlike(book){
  if(book.users.some(match)){
    debugger
    book.users=book.users.filter(user =>user.id !== 1)
  }
  else{
  alert("You never liked this book")
  }
  updateLike(book)

}


function updateLike(book){
  let new_book={
    "title": book.title,
    "description": book.description,
    "img_url": book.img_url,
    "users": book.users
  }
  console.log(new_book)
  fetch(`${url}/${book.id}`,{
    method: "PATCH",
    headers: {"content-type":"application/json"},
    body: JSON.stringify(new_book)
  }).then(resp=> resp.json())
    .then(json=> showDetails(json))
}
