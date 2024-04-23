const { Book } = require('../models/Book');


const getBooksList = (request, response) => {
 
    const userId = request.session.userId;

    const books = Book.getAll();

    response.render("books", { title: "Books", userId, books });
};

const getBookDetails = (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;
    const book = Book.getAll().find(book => book.id === parseInt(id));
    const didUserBorrowTheBook = User.findBorrowedBookById(userId, parseInt(id));
    res.render('book-details', { title: book.title, book, didUserBorrowTheBook });
};

const postBookBorrow = (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;
    const book = Book.getAll().find(book => book.id === parseInt(id));
    const user = User.getAll().find(user => user.id === userId);
    if (!book || !user) {
        res.redirect('/');
        return;
    }
    if (book.available) {
        book.borrow();
        user.borrowBook(book);
        res.redirect('/books/borrow/success');
    } else {
        res.redirect('/');
    }
};

const getBookBorrowSuccess = (req, res) => {
    res.render('success', { title: 'Success', message: 'Book borrowed successfully' });
};

const postBookReturn = (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;
    const book = Book.getAll().find(book => book.id === parseInt(id));
    const user = User.getAll().find(user => user.id === userId);
    if (!book || !user) {
        res.redirect('/');
        return;
    }
    if (!book.available) {
        book.returnBook();
        user.returnBook(id);
        res.redirect('/books/return/success');
    } else {
        res.redirect('/');
    }
};

const getBookReturnSuccess = (req, res) => {
    res.render('success', { title: 'Success', message: 'Book returned successfully' });
};

module.exports = { 
    getBooksList,
    getBookDetails,
    postBookBorrow,
    getBookBorrowSuccess,
    postBookReturn,
    getBookReturnSuccess
};
