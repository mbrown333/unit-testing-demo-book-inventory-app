(function(angular) {

    AddBookController.$inject = ['$state', 'BooksService', 'ValidateDateService'];

    function AddBookController($state, BooksService, ValidateDateService) {
        var vm = this;

        vm.book = {};
        vm.showPublicationDateError = false;
        vm.showFieldsRequiredError = false;
        vm.hasSubmittedForm = false;

        function returnToBookList() {
            $state.go('books');
        }

        function validateInput() {
            var valid = true;

            vm.showPublicationDateError = false;
            vm.showFieldsRequiredError = false;

            if (!ValidateDateService.isValidDate(vm.book.publicationDate) ) {
                valid = false;
                vm.showPublicationDateError = true;
            }

            if (!vm.book.title 
                || !vm.book.author 
                || !vm.book.publisher 
                || !vm.book.publicationDate 
                || !vm.book.publicationDate 
                || !vm.book.description) {

                valid = false;
                vm.showFieldsRequiredError = true;
            }

            return valid;
        }

        vm.saveBook = function() {
            vm.hasSubmittedForm = true;

            if (validateInput()) {
                BooksService.createBook(vm.book)
                    .then(function(success) {
                        if (success) returnToBookList();
                    });
            }
        };

        vm.cancelSave = function() {
            returnToBookList();
        };
    }

    angular.module('book-inventory-app.add')
        .controller('AddBookController', AddBookController);
})(angular);