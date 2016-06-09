(function(angular) {
    BooksController.$inject = ['BooksService', '$state'];

    function BooksController(BooksService, $state) {
        var self = this;

        function onListReturn(data) {
            self.booksList = data;
        };

        function loadBooks() {
            BooksService.getBooks()
                .then(onListReturn);
        };

        self.selectBook = function(book) {
            self.selectedBook = book;
        };

        self.editBook = function(id) {
            $state.go('editBook', { id: id });
        };

        self.addBook = function() {
            $state.go('addBook');
        };

        self.deleteBook = function(id) {
            BooksService.deleteBook(id)
                .then(function(success) {
                    if (success)
                        loadBooks();
                });
        };

        self.closeDetails = function() {
            self.selectedBook = null;
        };

        // Init controller
        loadBooks();
    }

    angular.module('book-inventory-app.books')
        .controller('BooksController', BooksController);
})(angular);