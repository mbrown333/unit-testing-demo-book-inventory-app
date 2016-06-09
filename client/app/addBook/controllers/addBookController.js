(function(angular) {

    AddBookController.$inject = ['$state', 'BooksService'];

    function AddBookController($state, BooksService) {
        var self = this;

        self.book = {};

        function returnToBookList() {
            $state.go('books');
        }

        self.saveBook = function() {
            BooksService.createBook(self.book);
            returnToBookList();
        };

        self.cancelSave = function() {
            returnToBookList();
        };
    }

    angular.module('book-inventory-app.add')
        .controller('AddBookController', AddBookController);
})(angular);