'use strict';

describe('Controller - Add Book', function() {

    var addBookControler;
    var booksServiceMock;
    var validateServiceMock;
    var $state;
    var $q;

    beforeEach(function() {
        module('ui.router.state');
        module('book-inventory-app');
        module('book-inventory-app.add');

        booksServiceMock = jasmine.createSpyObj('BooksService', ['createBook']);
        validateServiceMock = jasmine.createSpyObj('ValidateDateService', ['isValidDate']);

        inject(function($controller, _$state_, _$q_) {
            $state = _$state_;
            $q = _$q_;

            addBookControler = $controller('AddBookController', {
                $state: _$state_,
                BooksService: booksServiceMock,
                ValidateDateService: validateServiceMock
            });

            spyOn($state, 'go');
        });
    });

    it('should display an error message if all of the fields are not completed', function() {
        expect(addBookControler.showFieldsRequiredError).toBe(false);
        addBookControler.saveBook();
        expect(addBookControler.showFieldsRequiredError).toBe(true);
    });

    it('should display an error message if the publication date entered is not a valid date', function() {
        expect(addBookControler.showPublicationDateError).toBe(false);
        validateServiceMock.isValidDate.and.returnValue(false);
        addBookControler.saveBook();
        expect(addBookControler.showPublicationDateError).toBe(true);
    });

    it('should call createBook on the BooksService if validation is successful', function() {
        var mockBook = {
            title: 'Test',
            author: 'Test Author',
            publisher: 'Test Publisher',
            publicationDate: '1/1/2016',
            description: 'Test Description'
        };

        var deferred = $q.defer();
        booksServiceMock.createBook.and.returnValue(deferred.promise)
        validateServiceMock.isValidDate.and.returnValue(true);

        addBookControler.book = mockBook;
        addBookControler.saveBook();

        expect(booksServiceMock.createBook).toHaveBeenCalled();
        expect(booksServiceMock.createBook).toHaveBeenCalledWith(mockBook);
    });

    it('should return to the list view on cancel', function() {
        addBookControler.cancelSave();
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('books');
    });
});