(function(angular) {
    function BooksService($http) {
        return {
            getBooks: function() {
                return $http.get('/api/books')
                    .then(function(response) {
                        return response.data;
                    });
            },

            getBook: function(id) {
                return $http.get('/api/book/' + id)
                    .then(function(response) {
                        return response.data;
                    });
            },

            createBook: function(book) {
                return $http.post('/api/book/', book);
            },

            saveBook: function(book, bookId) {
                return $http.put('/api/book/' + bookId, book)
                    .then(function(response) {
                        return true;
                    });
            },

            deleteBook: function(id) {
                return $http.delete('/api/book/' + id)
                    .then(function(response) {
                        return true;
                    });
            }
        };
    }

    angular.module('book-inventory-app.books')
        .factory('BooksService', BooksService);
})(angular);