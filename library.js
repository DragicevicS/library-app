const table = document.querySelector('.table');
const tableBody = document.querySelector('tbody');

class Library {
  constructor(element) {
    this.elementList = element;
    this.bookList = [
      {
      title: 'The Hobbit', 
      author: 'J.R.R. Tolkien',
      pages: 296,
      read: 'not read'
    },
    {
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      pages: 296,
      read: 'read'
    },
    {
      title: 'Harry Potter', 
      author:  'J.K. Rowling',
      pages: 233,
      read: 'not read'
    }
    ];
  }

  createNewBook(title, author, pages, read) {
    const book = {
      title,
      author,
      pages,
      read
    };
    return this.bookList.push(book);
  }

  static createListItem(book) {
     const tr = document.createElement('tr');
     tr.innerHTML += 
    `
    <td class="index"></td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td class="read">${book.read}</td>
    <td>
      <button class="remove">X</button>
      <button class="toggle">Toggle read</button>
    </td>
    `;
    return tr;
  }

  update() {
    while (this.elementList.firstChild) {
      this.elementList.removeChild(this.elementList.firstChild);
    };
    
    
    for (let i=0; i < this.bookList.length; i++) {
      this.elementList.appendChild(Library.createListItem(this.bookList[i]));
      const index = document.querySelectorAll('.index');
      const remove = document.querySelectorAll('.remove');
      index[i].textContent = i+1;
      remove[i].setAttribute('id', index[i].textContent);
    };
  }

  add(title, author, pages, read){
    const book = {
      title,
      author,
      pages,
      read
    };
    this.bookList.push(book);
    this.update();
  }

  remove(index) {
    this.bookList.splice(index, 1);
    this.update();
  }
}

const tableList = new Library(tableBody);

const form = document.querySelector('#addBookForm');

function addNewBook(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.querySelector('input[name="read"]:checked').value;

  tableList.add(title, author, pages, read);

  form.style.display = 'none';
  table.style.display = 'block';
  toggleForm.textContent = 'Add new book';
};

form.addEventListener('submit', addNewBook);

function removeBook(e) {
  if (!e.target.classList.contains('remove')) return;
  tableList.remove(e.target.id-1);
}

tableBody.addEventListener('click', removeBook);

const toggleForm = document.querySelector('#toggleForm');
toggleForm.addEventListener('click', () => {
  if (form.style.display == 'none') {
    table.style.display = 'none';
    form.style.display = 'grid';
    toggleForm.textContent = 'Hide form';
  } else {
    table.style.display = 'block';
    form.style.display = 'none';
    toggleForm.textContent = 'Add new book';
  };
});

tableList.update();