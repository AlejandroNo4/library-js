const cardsContainer = document.getElementsByClassName('cards-container')[0];

let myLibrary = [];

function Book(title, pages, status, id) {
  this.title = title;
  this.pages = pages;
  this.status = status;
  this.id = id;
}

function addBookToLibrary() {
  if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  } else {
    myLibrary = [];
  }

  const errorMsg = [];

  const title = document.getElementById('book-title').value;
  const pages = document.getElementById('book-pages').value;
  const status = document.getElementById('book-status').value;
  const id = myLibrary.length + 1;

  if (title === '') {
    errorMsg.push('Title must to be filled');
  }

  if (pages.match(/^[0-9]*$/) === null || pages === '') {
    errorMsg.push('Pages must to be a number');
  }

  if (errorMsg.length > 0) {
    alert(errorMsg.join(', '));
    return;
  }

  const newbook = new Book(title, pages, status, id);
  myLibrary.push(newbook);

  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function deleteData(bookID) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (bookID === myLibrary[i].id) {
      myLibrary.splice(i, 1);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      window.location.reload();
    }
  }
}

function createCard(title, pages, status, id) {
  const card = document.createElement('div');
  card.classList.add('card', 'd-flex');

  const bookTitle = document.createElement('h3');
  bookTitle.innerText = title;
  bookTitle.className = 'book-title-card';

  const bookPages = document.createElement('p');
  bookPages.innerText = `Number of pages: ${pages}`;
  bookPages.className = 'pages-card';

  const bookStatus = document.createElement('p');
  bookStatus.innerText = `Was it already read? ${status}`;
  bookStatus.className = 'status-card';

  const bookID = id;
  const bookButton = document.createElement('button');
  bookButton.innerText = 'Delete';
  bookButton.onclick = () => deleteData(bookID);
  bookButton.className = 'form-btn';

  card.append(bookTitle);
  card.append(bookPages);
  card.append(bookStatus);
  card.append(bookButton);

  return card;
}

function showForm() {
  const form = document.getElementById('new-book-form');
  const btn = document.getElementById('new-book-btn');
  form.style.display = 'block';
  btn.style.display = 'none';
}

function showBookData() {
  if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  } else {
    return;
  }

  for (let i = 0; i < myLibrary.length; i += 1) {
    cardsContainer.appendChild(
      createCard(
        myLibrary[i].title,
        myLibrary[i].pages,
        myLibrary[i].status,
        myLibrary[i].id,
      ),
    );
  }
}

const submitClicked = document.getElementById('submit-button');
submitClicked.addEventListener('click', addBookToLibrary);

const showClicked = document.getElementById('new-book-btn');
showClicked.addEventListener('click', showForm);

showBookData();
