(function(angular) {
    EditBookController.$inject = ['$state', '$stateParams', 'BooksService'];

    function EditBookController($state, $stateParams, BooksService) {
        var vm = this;

        vm.book = {
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
        vm.saveBook = function() {
            BooksService.saveBook(vm.book, vm.bookId)
                .then(function(success) {
                    if (success) returnToBookList();
                });
        };

        vm.cancelSave = function() {
            returnToBookList();
        };

        // Init Controller
        vm.bookId = $stateParams.id;
        if (!vm.bookId) returnToBookList();

        BooksService.getBook($stateParams.id)
            .then(function(data) {
                vm.book.title = data.title;
                vm.book.author = data.author;
                vm.book.publisher = data.publisher;
                vm.book.publicationDate = data.publicationDate;
                vm.book.pageLength = data.pageLength;
                vm.book.description = data.description;
            });
    }

    angular.module('book-inventory-app.edit')
        .controller('EditBookController', EditBookController);
})(angular);