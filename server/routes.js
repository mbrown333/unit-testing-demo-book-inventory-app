'use strict';

module.exports = function(app) {
    var basePath = '/api';
    var BookController = require('./controllers/booksController');

    // Book Controller Routes
    app.get(basePath + '/books', BookController.getBookList);
    app.get(basePath + '/book/:id', BookController.getBook);
    app.post(basePath + '/book', BookController.addBook);
    app.put(basePath + '/book/:id', BookController.updateBook);
    app.delete(basePath + '/book/:id', BookController.deleteBook);
};