'use strict';

describe('Controller - Books Controller', function() {

    var booksController;
    var booksServiceMock;
    var $rootScope;
    var $state;
    var $q;
    var $timeout;
    var deferredListResponse;
    var mockBookList;

    booksServiceMock = jasmine.createSpyObj('BooksService', ['getBooks', 'deleteBook']);
    mockBookList = [{ id: '1'}, { id: '2' }, { id: '3'}];

    beforeEach(module('ui.router.state'));
    beforeEach(module('book-inventory-app.books'));

    beforeEach(inject(function($controller, _$rootScope_, _$state_, _$q_, _$timeout_) {
        $rootScope = _$rootScope_;
        $state = _$state_;
        $q = _$q_;
        $timeout = _$timeout_;

        deferredListResponse = $q.defer();
        booksServiceMock.getBooks.and.returnValue(deferredListResponse.promise);
        deferredListResponse.resolve(mockBookList);

        booksController = $controller('BooksController', {
            $state: $state,
            BooksService: booksServiceMock
        });

        spyOn($state, 'go');
        
        $rootScope.$apply();
    }));

    it('should load a list of books on init', function() {
        expect(booksController.booksList).toBeDefined();
        expect(booksController.booksList).toBe(mockBookList);
        expect(booksController.booksList.length).toBe(3);
    })

    it('should select a book for the details view', function() {
        expect(booksController.selectedBook).toBeUndefined();

        booksController.selectBook(mockBookList[0]);
        expect(booksController.selectedBook).toBe(mockBookList[0]);

        booksController.selectBook(mockBookList[2]);
        expect(booksController.selectedBook).toBe(mockBookList[2]);
    })

    it('should call the service to delete a book', function() {
        var deferred = $q.defer();
        booksServiceMock.deleteBook.and.returnValue(deferred.promise);

        booksController.deleteBook('2');
        expect(booksServiceMock.deleteBook).toHaveBeenCalledWith('2');
    })

    it('should reload the book list after successfully deleting a book', function() {
        var deferred = $q.defer();
        booksServiceMock.deleteBook.and.returnValue(deferred.promise);

        booksServiceMock.getBooks.calls.reset();
        expect(booksServiceMock.getBooks).not.toHaveBeenCalled();

        booksController.deleteBook('1');
        deferred.resolve(true);
        $rootScope.$apply();
        expect(booksServiceMock.getBooks).toHaveBeenCalled();
    })

});

