
const baseUrl = "http://localhost:3000/books";

const fetchBooks = () => fetch(baseUrl).then(resp => resp.json());

const appendBook = (book) => {
    const bookList = document.querySelector("#list");
    const liEl = document.createElement("li");
    liEl.innerText = book.title;
    liEl.addEventListener("click", () => {
        showBookInfo(book);
    } )
    bookList.appendChild(liEl);
} 

const showBookInfo = (book) => {
    const showPanel = document.querySelector("#show-panel");
        showPanel.innerHTML = `<img src="${book.img_url}">
                                <h2>${book.title}</h2>
                                <p>${book.description}</p>
                                <h3>Users that liked this:</h3>`
        const ulEl = document.createElement("ul");
        book.users.forEach((user) =>{
            const liEl = document.createElement("li");
            liEl.innerText = user.username
            ulEl.appendChild(liEl);
        })
        showPanel.appendChild(ulEl);
        showPanel.appendChild(makeLikeBtn(book));
}

const makeLikeBtn = (book) => {
    const btn = document.createElement("button");
    const user = {id: 1, username: "pouros"}
    if(hasAlreadyLiked(book.users, user)){
        btn.innerText = "Unlike";
    } else {
        btn.innerText = "Like";
    }
    btn.addEventListener("click", () => {
        if(hasAlreadyLiked(book.users, user)){
            book.users.splice(hasAlreadyLiked(book.users, user),1);
        } else{
            book.users.push(user);
        }
        updateBook(book);
    })
    return btn;
}

const hasAlreadyLiked = (users, liker) => {
    let state = false;
    let count = 0;
    users.forEach((user) => {
        if(user.id === liker.id){
            state = count;
        }
        count++;
    });
    return state;
}

const updateBook = (book) => {
    fetch(`${baseUrl}/${book.id}`, {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({"users" : book.users})
    }).then(resp => showBookInfo(book));
}

const appendBooks = (books) => {
    document.querySelector("#list").innerHTML = "";
    books.forEach(appendBook)
};

const showBooks = () => fetchBooks().then(appendBooks);

showBooks();


