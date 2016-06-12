'use strict';

describe('Services - Books Services', function() {

    var booksService;
    var $httpBackend;

    beforeEach(module('book-inventory-app.books'));
    beforeEach(inject(function(BooksService, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        booksService = BooksService;

        $httpBackend.verifyNoOutstandingRequest();
    }));

    afterEach(function() {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    })

    it('should make a GET call to retrieve a list of books', function() {
        $httpBackend.expectGET('/api/books').respond(200, []);
        booksService.getBooks();
    })

    it('should make a GET call to retrieve a single book object', function() {
        $httpBackend.expectGET('/api/book/9').respond(200, {});
        booksService.getBook('9');
    });

    it('should make a POST call to create a new book', function() {
        var mockBook = { id: '111' };
        $httpBackend.expectPOST('/api/book/').respond(200, true);
        booksService.createBook(mockBook);
    });

    it ('should make a PUT call to update an existing book object', function() {
        var mockBook = { id: '999' };
        $httpBackend.expectPUT('/api/book/999', mockBook).respond(200, true);
        booksService.saveBook(mockBook, mockBook.id);
    });

    it('should make a DELETE call to remove a book object', function() {
        $httpBackend.expectDELETE('/api/book/123').respond(200, true);
        booksService.deleteBook('123');
    });
});