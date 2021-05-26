const cardsContainer = document.getElementsByClassName("cards-container")[0];

myLibrary = [];

function Book(title, pages, status) {
  this.title = title;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, pages, status) {
  let newbook = new Book(title, pages, status);
  myLibrary.push(newbook);
}

function showBookData(arr) {
  for (let i = 0; i < arr.length; i++) {
    cardsContainer.appendChild(
      createCard(arr[i].title, arr[i].pages, arr[i].status)
    );
  }
}

function createCard(title, pages, status) {
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

  card.append(bookTitle);
  card.append(bookPages);
  card.append(bookStatus);

  return card;
}

addBookToLibrary("Title test 1", "100", "Yes");
addBookToLibrary("Title test 2", "100", "No");
addBookToLibrary("Title test 3", "100", "No");
addBookToLibrary("Title test 4", "100", "Yes");
addBookToLibrary("Title test 5", "100", "No");
addBookToLibrary("Title test 6", "100", "No");

showBookData(myLibrary);
