(function(angular) {
    angular.module('book-inventory-app.filters')
        .filter('formatName', function() {
        return function(input) {
            var output;

            if (!input) return '';

            return input.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    });
})(angular);