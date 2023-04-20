const table = document.querySelector('.table');
const tableBody = document.querySelector('tbody');

class Library { // create Library class
  constructor(element) {
    this.elementList = element; // select element for displaying the list
    this.bookList = [ // array of list items (objects)
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

  static createListItem(book) { // adding a table row for the list item
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

  update() { // removing every row, then adding again (refresh)
    while (this.elementList.firstChild) {
      this.elementList.removeChild(this.elementList.firstChild);
    };
     
    for (let i=0; i < this.bookList.length; i++) {
      this.elementList.appendChild(Library.createListItem(this.bookList[i]));
      const index = document.querySelectorAll('.index');
      const remove = document.querySelectorAll('.remove');
      const toggle = document.querySelectorAll('.toggle');
      index[i].textContent = i+1;
      remove[i].classList.add(index[i].textContent); // adding a number to the class for later use in removeBook() function
      toggle[i].classList.add(index[i].textContent); // adding a number to the class for later use in toggleRead() function
    };
  }

  add(title, author, pages, read){ // creating a book object and adding it to the bookList array
    const book = {
      title,
      author,
      pages,
      read
    };
    this.bookList.push(book);
    this.update();
  }

  remove(index) { // removing the book object from the array
    this.bookList.splice(index, 1);
    this.update();
  }

  changeRead(index) { // toggle read status for display and also the book object
    this.bookList[index].read = this.bookList[index].read === 'read' ? 'not read' : 'read';
    this.update();
  }
};

const tableList = new Library(tableBody); // using the table body as the list display

const form = document.querySelector('#addBookForm');

function addNewBook(e) { // getting values from the form 
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

function removeBook(e) { // removing rows from display and also from the array using button id
  if (!e.target.classList.contains('remove')) return;
  tableList.remove(e.target.classList[1]-1);
};

tableBody.addEventListener('click', removeBook);

const toggleForm = document.querySelector('#toggleForm');
toggleForm.addEventListener('click', () => { // toggle display showing form or the table
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

function toggleRead(e) { // changing read status on table display
    if (!e.target.classList.contains('toggle')) return;
    tableList.changeRead(e.target.classList[1]-1);
};
tableBody.addEventListener('click', toggleRead);