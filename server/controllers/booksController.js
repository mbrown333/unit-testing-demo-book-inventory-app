'use strict';

var Book = require('../models/book');

var BookController = {};

BookController.getBookList = function(req, res) {
    Book.find({}, function(err, books) {
        res.json(books);
    });
};

BookController.getBook = function(req, res) {
    Book.findOne({ _id: req.params.id }, function(err, book) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.json(book);
        }
    });
};

BookController.addBook = function(req, res) {
    var book = new Book({
        title: req.body.title,
        author: req.body.author,
        length: req.body.length,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        description: req.body.description
    });

    book.save(function(err) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

BookController.updateBook = function(req, res) {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function(err, book) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

BookController.deleteBook = function(req, res) {
    Book.find({ _id: req.params.id }).remove(function(err, removed) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

module.exports = BookController;