//BOOK CLASS: REPRESENT INSTANCE OF  A BOOK.
class Book{
    constructor(title, author, id){
        this.title = title;
        this.author = author;
        this.id = id;
    }
}
//USER INTERFACE: HANDLES UI INTERACTION TASKS.
class userInterface{
  static showBooks (){
     const books = Store.fetchBooks();

      books.forEach(book => {userInterface.addNewBookToList(book)});
  }

  static addNewBookToList(book){
      const bookList = document.querySelector('.table-body');
      const tableRow = document.createElement('tr');

      tableRow.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.id}</td>
       <td><a href='#' class='delete' draggable = 'true'>X</a></td>
      `;

      bookList.appendChild(tableRow);

  }
  static clearInputs(){
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-ID').value = '';
}

static removeBook(el){
  if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }  
}

static showALertMessage(message, className){
    const newDiv = document.createElement('div');
    newDiv.className = `alert ${className}`;
    newDiv.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const inputForm = document.querySelector('.booklist-form');
    container.insertBefore(newDiv, inputForm);

    setTimeout(() => {document.querySelector('.alert').remove()}, 1500)
   }

}

//STORE CLASS: HANDLES DATA STORAGE TO LOCAL STORAGE.
class Store {
    static fetchBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }

    static addBooksToLocalStorage(book){
        const books = Store.fetchBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBookFromLocalStorage(id){
        const books = Store.fetchBooks();

        books.forEach((book, index) => {
            if(book.id === id){
                books.splice(index, 1);
            }

        });

        localStorage.setItem('books', JSON.stringify(books));

    }
 }

//EVENT: SHOWS BOOKS.
 document.addEventListener('DOMContentLoaded', userInterface.showBooks);
//EVENT2: ADDS A BOOK.
 document.querySelector('.booklist-form').addEventListener('submit', (e) => {
    //prevent defult action
    e.preventDefault(); 
    // get dom values
     const title = document.querySelector('#book-title').value;
     const author = document.querySelector('#book-author').value;
     const id = document.querySelector('#book-ID').value;
      
     //create an instance of a book using the Book class.
     const book = new Book(title, author, id);

     //add the book to the DOM.
     userInterface.addNewBookToList(book); 
     Store.addBooksToLocalStorage(book);
     userInterface.showALertMessage(`'${title}' has sucessfully added to the booklist.`, 'success')
     userInterface.clearInputs();
 });
//EVENT3: REMOVES A BOOK.
document.querySelector('.table-body').addEventListener('click', (e) => {
    userInterface.removeBook(e.target);
    Store.deleteBookFromLocalStorage(
        e.target.parentElement.previousElementSibling.textContent
        );

        const bookTitle = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    userInterface.showALertMessage(`'${bookTitle}' has been removed from the booklist.`, 'removed');
})
 