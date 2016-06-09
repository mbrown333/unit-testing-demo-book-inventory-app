(function(angular, moment) {
    angular.module('book-inventory-app.filters')
        .filter('formatLongDate', function() {
        return function(input) {
            var output;

            if (!input) return '';

            return moment(new Date(input)).format('MMMM DD, YYYY');
        };
    });
})(angular, moment);