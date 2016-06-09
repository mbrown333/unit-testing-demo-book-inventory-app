(function(angular, moment) {
    angular.module('book-inventory-app.filters')
        .filter('formatShortDate', function() {
        return function(input) {
            var output;

            if (!input) return '';

            return moment(new Date(input)).format('MM/DD/YYYY');
        };
    });
})(angular, moment);