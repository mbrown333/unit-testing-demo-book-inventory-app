(function(angular) {
    EditBookController.$inject = ['$state', '$stateParams', 'BooksService'];

    function EditBookController($state, $stateParams, BooksService) {
        var self = this;

        self.book = {
            title: '',
            author: '',
            publisher: '',
            publicationDate: '',
            descriptions: ''
        };

        //private methods
        function returnToBookList() {
            $state.go('books');
        }

        //public methods
        self.saveBook = function() {
            BooksService.saveBook(self.book, self.bookId)
                .then(function(success) {
                    if (success) returnToBookList();
                });
        };

        self.cancelSave = function() {
            returnToBookList();
        };

        // Init Controller
        self.bookId = $stateParams.id;
        if (!self.bookId) returnToBookList();

        BooksService.getBook($stateParams.id)
            .then(function(data) {
                self.book.title = data.title;
                self.book.author = data.author;
                self.book.publisher = data.publisher;
                self.book.publicationDate = data.publicationDate;
                self.book.description = data.description;
            });
    }

    angular.module('book-inventory-app.edit')
        .controller('EditBookController', EditBookController);
})(angular);