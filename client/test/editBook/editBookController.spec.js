'use strict';

describe('Controller - Edit Book Controller', function() {

    var editBookController;
    var booksServiceMock;
    var stateParamsMock;
    var $rootScope;
    var $state;
    var $q;
    var mockBook;

    beforeEach(function() {

        module('ui.router.state');
        module('book-inventory-app.edit');

        booksServiceMock = jasmine.createSpyObj('BooksService', ['getBook', 'saveBook']);
        stateParamsMock = { id: '12345' };
        mockBook = { 
            title: 'title', 
            author: 'author', 
            publisher: 'publisher', 
            publicationDate: '1/1/2016',
            pageLength: 355,
            description: 'description'
        };

        inject(function($controller, _$rootScope_, _$state_, _$q_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $q = _$q_;

            var deferred = $q.defer();
            booksServiceMock.getBook.and.returnValue(deferred.promise);
            deferred.resolve(mockBook);

            editBookController = $controller('EditBookController', {
                $state: $state,
                $stateParams: stateParamsMock,
                BooksService: booksServiceMock
            });

            spyOn($state, 'go');
        });
    });

    it('should populate book data from the book service on init', function() {
        expect(booksServiceMock.getBook).toHaveBeenCalled();
        expect(booksServiceMock.getBook).toHaveBeenCalledWith(stateParamsMock.id);

        expect(editBookController.book.title).toBeFalsy();
        expect(editBookController.book.author).toBeFalsy();
        expect(editBookController.book.publisher).toBeFalsy();

        $rootScope.$apply();

        expect(editBookController.book.title).toBe('title');
        expect(editBookController.book.author).toBe('author');
        expect(editBookController.book.publisher).toBe('publisher');
    })

    it('should call the book service to save the book object', function() {
        $rootScope.$apply();
        var deferred = $q.defer();
        booksServiceMock.saveBook.and.returnValue(deferred.promise);
        deferred.resolve(true);

        expect(booksServiceMock.saveBook).not.toHaveBeenCalled();
        editBookController.saveBook();

        expect(booksServiceMock.saveBook).toHaveBeenCalled();
        expect(booksServiceMock.saveBook).toHaveBeenCalledWith(editBookController.book, editBookController.bookId);
    })

    it('should return to the book list', function() {
        editBookController.cancelSave();
        expect($state.go).toHaveBeenCalledWith('books')
    })
});