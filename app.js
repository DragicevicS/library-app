const myLibrary = [];

// constructor for 'Book' object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// manually adding few books
function addBookToLibrary() {
  myLibrary.push(...arguments);
  console.log(myLibrary);
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 296, 'not read');
const got = new Book('A Game of Thrones', 'George R.R. Martin', 245, 'read');
const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 233, 'not read');

addBookToLibrary(hobbit, got, harryPotter);

// using loop to list all the books in the 'myLibrary' array
const tableBody = document.querySelector('tbody');

for (let i=0; i < myLibrary.length; i++) {
  tableBody.innerHTML += 
  `
  <tr>
    <td>${myLibrary[i].title}</td>
    <td>${myLibrary[i].author}</td>
    <td>${myLibrary[i].pages}</td>
    <td class="read">${myLibrary[i].read}</td>
    <td>
      <button class="remove">X</button>
      <button class="toggle">Toggle read</button>
    </td>
  </tr>
  `;
};

// removing table row button
function removeRow(e) {
  if (!e.target.classList.contains("remove")) return;
  e.target.closest('tr').remove();
}

tableBody.addEventListener('click', removeRow);

// toggle read button
// needs to be implemented



tableBody.addEventListener('click', toggleRead);

// toggle form visibility 
const toggleForm = document.querySelector('#toggleForm');
const form = document.querySelector('#addBookForm')
toggleForm.addEventListener('click', () => {
  if (form.style.display == 'none') {
    form.style.display = 'grid';
    toggleForm.textContent = 'Hide form';
  } else {
    form.style.display = 'none';
    toggleForm.textContent = 'Add new book';
  };
})

// adding new 'book' to the 'myLibrary' array
function addNewBook(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.querySelector('input[name="read"]:checked').value;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  console.log(read);
  console.log(newBook.read);
  tableBody.innerHTML +=
  `
  <tr>
    <td>${newBook.title}</td>
    <td>${newBook.author}</td>
    <td>${newBook.pages}</td>
    <td class="read">${newBook.read}</td>
    <td>
      <button class="remove">X</button>
      <button class="toggle">Toggle read</button>
    </td>
  </tr>
  `;
  form.style.display = 'none';
  toggleForm.textContent = 'Add new book';
};

form.addEventListener('submit', addNewBook);




