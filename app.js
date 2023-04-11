const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary() {
  myLibrary.push(...arguments);
  console.log(myLibrary);
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 296, 'not read');

const got = new Book('A Game of Thrones', 'George R.R. Martin', 245, 'read');

const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 233, 'not read');

addBookToLibrary(hobbit, got, harryPotter);

function showBooks() {
  for (let i=0; i < myLibrary.length; i++) {
    const tableBody = document.querySelector('tbody');
    const tableRow = document.createElement('tr');
    const tableCell0 = tableRow.insertCell(0);
    const tableCell1 = tableRow.insertCell(1);
    const tableCell2 = tableRow.insertCell(2);
    const tableCell3 = tableRow.insertCell(3);
    const tableCell4 = tableRow.insertCell(4);
    tableBody.appendChild(tableRow);
    tableCell0.textContent = i+1;
    tableCell1.textContent = myLibrary[i].title;
    tableCell2.textContent = myLibrary[i].author;
    tableCell3.textContent = myLibrary[i].pages;
    tableCell4.textContent = myLibrary[i].read;
  }
};

showBooks()