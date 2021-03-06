(function(angular) {
    'use strict';
    angular.module('book-inventory-app', [
        'ui.router.state', 
        'book-inventory-app.services',
        'book-inventory-app.books', 
        'book-inventory-app.edit', 
        'book-inventory-app.add',
        'book-inventory-app.filters'
    ]);

    angular.module('book-inventory-app.services', []);
    angular.module('book-inventory-app.books', []);
    angular.module('book-inventory-app.edit', []);
    angular.module('book-inventory-app.add', []);
    angular.module('book-inventory-app.filters', []);
})(angular);