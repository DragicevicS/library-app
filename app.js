const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(t, a, p, r) {
  const newBook = new Book (t, a, p, r);
  myLibrary.push(newBook);
}