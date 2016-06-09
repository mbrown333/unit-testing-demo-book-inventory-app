(function(angular) {
    'use strict';
    angular.module('book-inventory-app.main')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('books', {
                    url: '/',
                    templateUrl: 'app/books/views/books.html',
                    controller: 'BooksController as booksVM'
                })
                .state('editBook', {
                    url: '/books/edit/:id',
                    templateUrl: 'app/editBook/views/editBook.html',
                    controller: 'EditBookController as editBookVM'
                })
                .state('addBook', {
                    url: '/books/add',
                    templateUrl: 'app/addBook/views/addBook.html',
                    controller: 'AddBookController as addBookVM'
                });
        }])
        .run(['$state', function($state) {
            $state.go('books');
        }]);
})(angular);