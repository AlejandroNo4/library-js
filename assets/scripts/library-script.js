const cardsContainer = document.getElementsByClassName("cards-container")[0];

function showForm(){
  let form = document.getElementById("new-book-form");
  let btn = document.getElementById("new-book-btn")
  form.style.display = "block";
  btn.style.display = "none";
}

let myLibrary = [];

function Book(title, pages, status, id) {
  this.title = title;
  this.pages = pages;
  this.status = status;
  this.id = id;
}

function addBookToLibrary() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

  const title = document.getElementById("book-title").value;
  const pages = document.getElementById("book-pages").value;
  const status = document.getElementById("book-status").value;
  const id = myLibrary.length;

  let newbook = new Book(title, pages, status, id);
  myLibrary.push(newbook);

  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function showBookData() {
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    alert("There is no data.. add a book");
  }
  console.log(myLibrary);
  for (let i = 0; i < myLibrary.length; i++) {
    cardsContainer.appendChild(
      createCard(
        myLibrary[i].title,
        myLibrary[i].pages,
        myLibrary[i].status,
        myLibrary[i].id
      )
    );
  }
}

function deleteData(bookID) {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  for (let i = 0; i < myLibrary.length; i++) {
    if (bookID === myLibrary[i].id) {
      myLibrary.splice(i, 1);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      location.reload();
    }
  }
}

function createCard(title, pages, status, id) {
  const card = document.createElement("div");
  card.classList.add("card", "d-flex");

  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;
  bookTitle.className = "book-title-card";

  const bookPages = document.createElement("p");
  bookPages.innerText = `Number of pages: ${pages}`;
  bookPages.className = "pages-card";

  const bookStatus = document.createElement("p");
  bookStatus.innerText = `Was it already read? ${status}`;
  bookStatus.className = "status-card";

  const bookID = id;
  const bookButton = document.createElement("button");
  bookButton.innerText = `Delete`;
  bookButton.onclick = function () {
    deleteData(bookID);
    return false;
  };
  bookButton.className = "form-btn";

  card.append(bookTitle);
  card.append(bookPages);
  card.append(bookStatus);
  card.append(bookButton);

  return card;
}

showBookData();
