class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
}

const myLibrary = [];

const bookContainer = document.querySelector(".book-container");
const blankCard = document.querySelector(".blank-card");
blankCard.remove();
blankCard.classList.remove("blank-card");
const dialogButton = document.querySelector(".dialog-button");
const dialog = document.querySelector("dialog");
const titleInput = document.querySelector("input[name=\"title\"]");
const authorInput = document.querySelector("input[name=\"author\"]");
const pagesInput = document.querySelector("input[name=\"pages\"]");
const readInput = document.querySelector("input[name=\"read\"]");
const cancelButton = document.querySelector(".cancel-button");
const addButton = document.querySelector(".add-button");

dialogButton.addEventListener("click", () => {
    dialog.showModal();
});

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(new Book(titleInput.value, authorInput.value, pagesInput.value, !readInput.checked, (myLibrary.length > 0 ? myLibrary[myLibrary.length - 1].id + 1 : 0)));
    dialog.close();
});

cancelButton.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("close", () => {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = 0;
    readInput.checked = false;
});

function createNewCard(book) {
    let newCard = blankCard.cloneNode(true);
    newCard.querySelector(".book-title").textContent = book.title;
    newCard.querySelector(".book-author").textContent = book.author;
    newCard.querySelector(".book-pages").textContent = book.pages;
    newCard.querySelector(".book-read").textContent = (book.read ? "Not read yet" : "Read");
    newCard.querySelector(".remove-button").addEventListener("click", () => {
        newCard.remove();
        myLibrary.find((libraryBook, i) => {
            if (book.id = libraryBook.id) {
                myLibrary.splice(i, 1);
                return;
            }
        });
    });
    let readStatusButton = newCard.querySelector(".read-status-button");
    readStatusButton.textContent = (book.read ? "Read" : "Unread");
    readStatusButton.addEventListener("click", () => {
        book.read = !book.read;
        readStatusButton.textContent = (book.read ? "Read" : "Unread");
        newCard.querySelector(".book-read").textContent = (book.read ? "Not read yet" : "Read");
    });
    return newCard;
}

function displayBook(book) {
    bookContainer.append(createNewCard(book));
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBook(book);
}

function displayBooks() {
    for (let book of myLibrary) {
        displayBook(book);
    }
}

displayBooks();
