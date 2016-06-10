(function(angular) {
    BooksController.$inject = ['BooksService', '$state'];

    function BooksController(BooksService, $state) {
        var vm = this;

        function onListReturn(data) {
            vm.booksList = data;
        };

        function loadBooks() {
            BooksService.getBooks()
                .then(onListReturn);
        };

        vm.selectBook = function(book) {
            vm.selectedBook = book;
        };

        vm.editBook = function(id) {
            $state.go('editBook', { id: id });
        };

        vm.addBook = function() {
            $state.go('addBook');
        };

        vm.deleteBook = function(id) {
            BooksService.deleteBook(id)
                .then(function(success) {
                    if (success)
                        loadBooks();
                });
        };

        vm.closeDetails = function() {
            vm.selectedBook = null;
        };

        // Init controller
        loadBooks();
    }

    angular.module('book-inventory-app.books')
        .controller('BooksController', BooksController);
})(angular);